var con = require("../../config/mysql");

const getClientes = {
  getClientes: (req, res) => {
    sql = `SELECT * FROM clientes c;`;

    con.query(sql, (err, result) => {
      if (err) {
        res.status(400).send("Error ao consultar o banco de dados");
      } else {
        res.status(200).json(result);
      }
    });
  },
};

module.exports = getClientes;
