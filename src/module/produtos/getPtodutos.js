var con = require("../../config/mysql");

const getProdutos = {
  getProdutos: (req, res) => {
    sql = `SELECT
            e.produto_id as id,
            p.nome as produto,
            p.descricao,
            sum(e.quantidade),
            p.preco,
            sum(e.quantidade * p.preco) as total
            from ecommerce_dnc.estoque e 
            inner join ecommerce_dnc.produtos p on p.id = e.produto_id
            group by e.produto_id;
            `;

    con.query(sql, (err, result) => {
      if (err) {
        res.status(400).send("Erro ao consultar os produtos");
      } else {
        res.status(200).json(result);
      }
    });
  },
};

module.exports = getProdutos;
