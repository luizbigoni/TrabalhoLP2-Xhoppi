import express from "express";
import path from 'path';
import __dirname from '../utils/pathUtils.js';
import ClienteController from '../controllers/ClienteController.js';
import FuncionarioController from "../controllers/FuncionarioController.js";
import ProdutoController from '../controllers/ProdutoController.js';
//import CupomController from '../controllers/CupomController.js';
//import FuncionarioController from '../controllers/FuncionarioController.js';
//import ProdutoController from '../controllers/FuncionarioController.js';

const router = express.Router();

// Rota raiz - serve a página home
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

//Rotas de Cliente:
router.get('/clientes/cadastrar', ClienteController.renderCreateCliente); 
router.get('/clientes-list', ClienteController.renderAllCliente);

router.get('/clientesBusca', ClienteController.getAllCliente);
router.post('/clientesCreate', ClienteController.createCliente);
router.get('/clientes/:id', ClienteController.getClienteById); 
router.put('/clientes/:id', ClienteController.updateCliente);
router.delete('/clientes/:id', ClienteController.deleteCliente);

/*
//Rotas de Cupom:
router.get('/cupons', CupomController.getAllCupom);
router.get('/cupons/:id', CupomController.getCupomById);
router.post('/cupons', CupomController.createCupom);
router.put('/cupons/:id', CupomController.updateCupom);
router.delete('/cupons/:id', CupomController.deleteCupom)

router.get('/cupons-create', CupomController.renderCreateCupom);
router.get('/cupons-list', CupomController.renderAllCupom);
*/

//Rotas de Funcionário:
router.get('/funcionario/cadastrar', FuncionarioController.renderCreateFuncionario); 
router.get('/funcionarios-list', FuncionarioController.renderAllFuncionarios);

router.get('/funcionariosBusca', FuncionarioController.getAllFuncionarios);

router.post('/funcionario/cadastrar', FuncionarioController.createFuncionario); 

router.get('/funcionarios/:id', FuncionarioController.getFuncionarioById);

router.put('/funcionarios/:id', FuncionarioController.updateFuncionario); 
router.delete('/funcionarios/:id', FuncionarioController.deleteFuncionario);

//Rotas de Produto
router.get('/produto/cadastrar', ProdutoController.renderCreateProduto); 
router.get('/produtos-list', ProdutoController.renderAllProduto);

router.get('/produtosBusca', ProdutoController.getAllProdutos);
router.post('/produto/cadastrar', ProdutoController.createProduto); 
router.get('/produtos/:id', ProdutoController.getProdutoById);
router.put('/produtos/:id', ProdutoController.updateProduto); 
router.delete('/produtos/:id', ProdutoController.deleteProduto);
export default router;