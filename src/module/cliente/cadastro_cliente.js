var con = require("../../config/mysql");

const cadastro_cliente = {
  createCliente: (req, res) => {
    console.log('createCliente foi chamada');
    const {nome, email, endereco, telefone } = req.body;

    console.log(req.body);

    var sql ="INSERT INTO clientes (nome, email, endereco, telefone) values (?, ?, ?, ?)";
    con.query(sql, [nome, email, endereco, telefone], (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send("Erro ao cadastrar cliente" + err.message);
      } else {
        res.status(200).send("Cliente cadastrado com sucesso");
      }
    });
  },
};

module.exports = cadastro_cliente;
