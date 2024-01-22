var con = require("../../config/mysql");

const getVendas_id = {
  getVendas_id: (req, res) => {
    const venda_id = req.params.venda_id;

    var sql = `SELECT
                    c.nome as cliente,
                    v.id,
                    v.data_venda,
                    p.nome as produto,
                    vp.quantidade,
                    p.preco,
                    (vp.quantidade * p.preco) as total
                    FROM vendas v
                    INNER JOIN clientes c ON c.id = v.cliente_id
                    INNER JOIN vendas_produtos vp ON vp.venda_id = v.id
                    INNER JOIN produtos p ON p.id = vp.produto_id
                    WHERE v.id = ?
                 `;

    con.query(sql, [venda_id], (err, result) => {
      if (err) {
        res.status(400).send("Erro ao consultar vendas_produtos");
      } else {
        res.status(200).json(result);
      }
    });
  },
};

module.exports = getVendas_id;
