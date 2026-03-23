import express from "express";
import path from 'path';
import __dirname from '../utils/pathUtils.js';
import ClienteController from '../controllers/ClienteController.js';
import FuncionarioController from "../controllers/FuncionarioController.js";
import ProdutoController from '../controllers/ProdutoController.js';
import CupomController from "../controllers/CupomController.js";
import multer from 'multer';
//import CupomController from '../controllers/CupomController.js';
//import FuncionarioController from '../controllers/FuncionarioController.js';
//import ProdutoController from '../controllers/FuncionarioController.js';

// Configuração de onde o multer vai salvar as fotos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ele vai salvar dentro da sua pasta assets/img
        cb(null, path.join(__dirname, 'assets', 'img')); 
    },
    filename: function (req, file, cb) {
        // Coloca a data atual na frente do nome para não ter fotos com nomes iguais
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// Rota raiz - serve a página home
router.get('/', async (req, res) => {
    try {
        const produtos = await ProdutoController.getAllProdutosHome();
        res.render('home', { produtos });
    } catch (error) {
        console.error(error);
        res.send('Erro ao carregar home');
    }
});

//Rotas de Cliente:
router.get('/clientes/cadastrar', ClienteController.renderCreateCliente); 
router.get('/clientes-list', ClienteController.renderAllCliente);

router.get('/clientes', ClienteController.getAllCliente);
router.post('/clientes-create', upload.single('inputFoto'), ClienteController.createCliente);
router.get('/clientes/editar/:id', ClienteController.renderEditCliente);
router.get('/clientes/:id', ClienteController.getClienteById); 
router.put("/clientes/:id", upload.single("fotoPerfil"), ClienteController.updateCliente);
router.delete('/clientes/:id', ClienteController.deleteCliente);


//Rotas de Cupom:
router.get('/cupons', CupomController.getAllCupom);
router.get('/cupons/:id', CupomController.getCupomById);
router.post('/cupons', CupomController.createCupom);
router.get('/cupons/editar/:id', CupomController.renderEditCupom);
router.put('/cupons/:id', CupomController.updateCupom);
router.delete('/cupons/:id', CupomController.deleteCupom)

router.get('/cupom/cadastrar', CupomController.renderCreateCupom);
router.get('/cupons-list', CupomController.renderAllCupom);

router.post('/cupons/aplicar', CupomController.aplicarCupom);


//Rotas de Funcionário:
router.get('/funcionario/cadastrar', FuncionarioController.renderCreateFuncionario); 
router.get('/funcionarios-list', FuncionarioController.renderAllFuncionarios);

router.get('/funcionariosBusca', FuncionarioController.getAllFuncionarios);

router.post('/funcionario/cadastrar', upload.single('fotoPerfil'), FuncionarioController.createFuncionario);

router.get('/funcionarios/editar/:id', FuncionarioController.renderEditFuncionario);

router.get('/funcionarios/:id', FuncionarioController.getFuncionarioById);


router.put("/funcionarios/:id", upload.single("fotoPerfil"), FuncionarioController.updateFuncionario); 
router.delete('/funcionarios/:id', FuncionarioController.deleteFuncionario);

//Rotas de Produto
router.get('/produto/cadastrar', ProdutoController.renderCreateProduto); 
router.get('/produtos-list', ProdutoController.renderAllProduto);

router.get('/produtosBusca', ProdutoController.getAllProdutos);
router.post('/produto/cadastrar', upload.single('foto'), ProdutoController.createProduto);

router.get('/produtos/editar/:id', ProdutoController.renderEditProduto);

router.get('/produtos/:id', ProdutoController.getProdutoById);
router.put("/produtos/:id", upload.single("foto"), ProdutoController.updateProduto);
router.delete('/produtos/:id', ProdutoController.deleteProduto);

export default router;