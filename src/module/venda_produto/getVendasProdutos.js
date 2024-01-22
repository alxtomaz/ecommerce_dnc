var con = require('../../config/mysql');

const getVendasProdutos = {
    getVendasProdutos: (req, res) => {
        console.log("conexão estabelecida com getVendasProdutos");

        var sql = `SELECT
                    c.nome as cliente,
                    v.id,
                    v.data_venda,
                    p.nome,
                    vp.quantidade,
                    p.preco,
                    (vp.quantidade * p.preco) as total
                    FROM VENDAS V 
                    INNER JOIN clientes c ON c.id = v.cliente_id
                    INNER JOIN vendas_produtos vp ON vp.venda_id = v.id
                    INNER JOIN produtos p ON p.id = vp.produto_id;
                    `

        con.query(sql, ( err, result) => {
            if(err) {
                res.status(400).send("Erro ao consultas vendas_produtos");
            } else {
                res.status(200).json(result);
            }
        })
    }
}

module.exports = getVendasProdutos;