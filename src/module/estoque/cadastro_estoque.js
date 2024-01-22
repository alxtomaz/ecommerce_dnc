var con = require("../../config/mysql");

const cadastro_estoque = {
  createEstoque: (req, res) => {
    console.log("conexão com cadastro de estoque estabelecida");

    const estoque = {
      quantidade: req.body.quantidade,
      produto_id: req.body.produto_id,
    };
    console.log(estoque);

    var sql = "INSERT INTO estoque (quantidade, produto_id) values (?,?)";

    con.query(sql, [estoque.quantidade,estoque.produto_id], (err, result) => {
      if (err) {
        res.status(400).send("Estoque não cadastrado", err);
      } else {
        res.status(200).send("Estoque cadastrado com sucesso");
      }
    });
  },
};

module.exports = cadastro_estoque;
