var con = require("../../config/mysql");

const cadastro_produto = {
  createProduto: (req, res) => {
    console.log("createProduto foi chamada");

    const { nome, preco, descricao, img_url } = req.body;

    console.log(req.body);

    var sql =
      "INSERT INTO produtos (nome, preco, descricao, img_url) values (?,?,?,?)";
    con.query(sql, [nome, preco, descricao, img_url], (err, result) => {
      if (err) {
        res.status(400).send("Erro ao cadastrar o cliente");
      } else {
        res.status(200).send("Produto cadastrado com sucesso");
      }
    });
  },
};

module.exports = cadastro_produto;
