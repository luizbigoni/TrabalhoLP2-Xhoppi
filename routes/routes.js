import express from "express";
import path from 'path';
import __dirname from '../utils/pathUtils.js';
import ClienteController from '../controllers/ClienteController.js';
import FuncionarioController from "../controllers/FuncionarioController.js";
import ProdutoController from '../controllers/ProdutoController.js';
import CupomController from "../controllers/CupomController.js";
import multer from 'multer';

// IMPORTANTE: Importe o middleware aqui no topo (ajuste o caminho se necessário)
import { authMiddleware } from '../middlewares/middlewares.js'; 


// Configuração de onde o multer vai salvar as fotos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'assets', 'img')); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// ==========================================
// ROTAS PÚBLICAS (Qualquer um pode acessar)
// ==========================================

// Autenticação e Recuperação
router.get('/login', ClienteController.renderLogin);
router.post('/login', ClienteController.realizarLogin);
router.get('/logout', ClienteController.realizarLogout);
router.get('/recuperar-senha', ClienteController.renderRecuperarSenha);
router.post('/recuperar-senha', ClienteController.processarRecuperacao);

// Cadastro de Cliente (Tem que ser público para novos usuários entrarem)
router.get('/clientes/cadastrar', ClienteController.renderCreateCliente); 
router.post('/clientes-create', upload.single('inputFoto'), ClienteController.createCliente);


// ==========================================
// ROTAS PROTEGIDAS (Precisam do authMiddleware)
// ==========================================

// Rota raiz - serve a página home apenas para logados
router.get('/', authMiddleware, async (req, res) => {
    try {
        const produtos = await ProdutoController.getAllProdutosHome();
        res.render('home', { produtos });
    } catch (error) {
        console.error(error);
        res.send('Erro ao carregar home');
    }
});

// Rotas de Cliente (Listagem, edição e exclusão)
router.get('/clientes-list', authMiddleware, ClienteController.renderAllCliente);
router.get('/clientes', authMiddleware, ClienteController.getAllCliente);
router.get('/clientes/editar/:id', authMiddleware, ClienteController.renderEditCliente);
router.get('/clientes/:id', authMiddleware, ClienteController.getClienteById); 
router.put("/clientes/:id", authMiddleware, upload.single("fotoPerfil"), ClienteController.updateCliente);
router.delete('/clientes/:id', authMiddleware, ClienteController.deleteCliente);

// Rotas de Cupom
router.get('/cupons', authMiddleware, CupomController.getAllCupom);
router.get('/cupons/:id', authMiddleware, CupomController.getCupomById);
router.post('/cupons', authMiddleware, CupomController.createCupom);
router.get('/cupons/editar/:id', authMiddleware, CupomController.renderEditCupom);
router.put('/cupons/:id', authMiddleware, CupomController.updateCupom);
router.delete('/cupons/:id', authMiddleware, CupomController.deleteCupom)
router.get('/cupom/cadastrar', authMiddleware, CupomController.renderCreateCupom);
router.get('/cupons-list', authMiddleware, CupomController.renderAllCupom);
router.post('/cupons/aplicar', authMiddleware, CupomController.aplicarCupom);

// Rotas de Funcionário
router.get('/funcionario/cadastrar', authMiddleware, FuncionarioController.renderCreateFuncionario); 
router.get('/funcionarios-list', authMiddleware, FuncionarioController.renderAllFuncionarios);
router.get('/funcionariosBusca', authMiddleware, FuncionarioController.getAllFuncionarios);
router.post('/funcionario/cadastrar', authMiddleware, upload.single('fotoPerfil'), FuncionarioController.createFuncionario);
router.get('/funcionarios/editar/:id', authMiddleware, FuncionarioController.renderEditFuncionario);
router.get('/funcionarios/:id', authMiddleware, FuncionarioController.getFuncionarioById);
router.put("/funcionarios/:id", authMiddleware, upload.single("fotoPerfil"), FuncionarioController.updateFuncionario); 
router.delete('/funcionarios/:id', authMiddleware, FuncionarioController.deleteFuncionario);

// Rotas de Produto
router.get('/produto/cadastrar', authMiddleware, ProdutoController.renderCreateProduto); 
router.get('/produtos-list', authMiddleware, ProdutoController.renderAllProduto);
router.get('/produtosBusca', authMiddleware, ProdutoController.getAllProdutos);
router.post('/produto/cadastrar', authMiddleware, upload.single('foto'), ProdutoController.createProduto);
router.get('/produtos/editar/:id', authMiddleware, ProdutoController.renderEditProduto);
router.get('/produtos/:id', authMiddleware, ProdutoController.getProdutoById);
router.put("/produtos/:id", authMiddleware, upload.single("foto"), ProdutoController.updateProduto);
router.delete('/produtos/:id', authMiddleware, ProdutoController.deleteProduto);

export default router;