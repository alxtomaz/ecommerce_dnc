var con = require("../../config/mysql");

const cadastro_vendas = {
    createVendas: (req, res ) => {

        console.log("conexão estabelecida com a tabela vendas");
        const {data_venda, cliente_id} = req.body;
        console.log(req.body);

        var sql = 'INSERT INTO vendas (data_venda, cliente_id) values (?,?)';
        con.query(sql, [data_venda, cliente_id], (err, result) => {
            if (err) {
                res.status(400).send('Venda não foi cadastrada')
            } else {
                res.status(200).send('Venda cadastrada com sucesso')
            }
        })
    }
} 

module.exports = cadastro_vendas;