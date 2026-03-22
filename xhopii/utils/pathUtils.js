import express from "express";
import path from 'path';
import __dirname from '../utils/pathUtils.js';
import ClienteController from '../controllers/ClienteController.js';
import CupomController from '../controllers/CupomController.js';
//import FuncionarioController from '../controllers/FuncionarioController.js';
//import ProdutoController from '../controllers/FuncionarioController.js';

const router = express.Router();

// Rota raiz - serve a página home
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

//Rotas de Cliente:
router.get('/clientes', ClienteController.getAllCliente);
router.get('/clientes/:id', ClienteController.getClienteById);
router.post('/clientes', ClienteController.createCliente);
router.put('/clientes/:id', ClienteController.updateCliente);
router.delete('/clientes/:id', ClienteController.deleteCliente)

router.post('/clientes/cadastrar', ClienteController.renderCreateCliente);
router.get('/clientes-list', ClienteController.renderAllCliente);


//Rotas de Cupom:
router.get('/cupons', CupomController.getAllCupom);
router.get('/cupons/:id', CupomController.getCupomById);
router.post('/cupons', CupomController.createCupom);
router.put('/cupons/:id', CupomController.updateCupom);
router.delete('/cupons/:id', CupomController.deleteCupom)

router.get('/cupom/cadastrar', CupomController.renderCreateCupom);
router.get('/cupons-list', CupomController.renderAllCupom);





export default router;