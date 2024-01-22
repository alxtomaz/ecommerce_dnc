const express = require('express');
const app = express();
app.use(express.json());
const clienteRouter = require('./src/module/cliente/cadastro_cliente');
const produtoRouter = require('./src/module/produtos/cadastro_produto');
const estoqueRouter = require('./src/module/estoque/cadastro_estoque');
const vendasRouter = require('./src/module/venda/cadastro_vendas');
const vendas_produtosRouter = require('./src/module/venda_produto/cadastro_vd_pdt');
const getVendasProdutosRouter = require('./src/module/venda_produto/getVendasProdutos');
const getVendas_idRouter = require('./src/module/venda_produto/getVendas_Id');
const getProdutosRouter = require('./src/module/produtos/getPtodutos');
const getClientesRouter = require('./src/module/cliente/getClientes');

app.post('/clientes', clienteRouter.createCliente);

app.post('/produtos', produtoRouter.createProduto);

app.post('/estoque', estoqueRouter.createEstoque);

app.post('/vendas', vendasRouter.createVendas);

app.post('/vendapdt', vendas_produtosRouter.createVenda_produto);

app.get('/getvendas', getVendasProdutosRouter.getVendasProdutos);

app.get('/getvendas/:venda_id', getVendas_idRouter.getVendas_id);
 
app.get('/produtos', getProdutosRouter.getProdutos);

app.get('/clientes', getClientesRouter.getClientes);

const port = 8080;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));