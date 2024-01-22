var con = require("../../config/mysql");

const cadastro_vd_pdt = {
  createVenda_produto: (req, res) => {
    console.log("conexão estabelecida com createVenda_produto");
    const produtos = req.body.produtos;
    const { data_venda, cliente_id } = req.body;
    var sqlVenda = "INSERT INTO vendas (data_venda, cliente_id) values (?,?)";
    var sqlProduto =
      "INSERT INTO vendas_produtos (produto_id, venda_id, quantidade) values (?,?,?)";
    // cadastro de venda na tabela vendas
    var sqlEstoque ="SELECT SUM(e.quantidade) as total FROM estoque e WHERE e.produto_id = ?";

    con.query(sqlVenda, [data_venda, cliente_id], (err, result) => {
      if (err) {
        res.status(400).send("Erro ao cadastrar a venda");
      } else {
        const venda_id = result.insertId;
        // console.log(req.body);
        // cadastro de produtos na tabela vendas_produtos
        // ele mapeia o array de produtos e retorna um array de promisses, onde se uma promisse for rejeitada, ele retorna um erro
        const promises = produtos.map((produto) => {
          return new Promise((resolve, reject) => {
            con.query(sqlEstoque, produto.produto_id, (err, result) => {
              if (err) {
                reject(err);
              } else if (!result[0]) {
                reject(
                  new Error(
                    "nenhuma entrada de estoque no produto" + produto.produto_id
                  )
                );
              } else {
                  console.log(result[0].total);
                  console.log(produto.quantidade);
                if(result[0].total < Number(produto.quantidade)) {
                  reject(new Error('Não tem a quantidade em estoque'))
                } else {
                  console.log('passou');
                  con.query(sqlProduto, [produto.produto_id, venda_id, produto.quantidade], (err, result) => {
                    if(err) {
                      res.status(400).send('Não foi possivel cadastrar o produto');
                      console.log('Não foi possivel cadastrar o produto');
                    } else {
                      resolve(result)
                    }
                  })
                }
              } 
            });
          });
        });
        // ele analisa se a const promisses foi resolvida ou rejeitada, e retorna o status da requisição
        Promise.all(promises)
          .then((result) =>
            res
              .status(200)
              .send("Todos os produtos foram cadastrados com sucesso")
          )
          .catch((err) =>
            res.status(400).send("erro ao cadastrar venda_produto")
          );
      }
    });
  },
};

module.exports = cadastro_vd_pdt;
