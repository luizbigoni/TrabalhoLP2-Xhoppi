import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Cliente from '../models/Cliente.js';

import jwt from 'jsonwebtoken';
const SEGREDO_JWT = 'uma_senha_super_secreta_para_o_projeto_xhopii';

class ClienteController{
    //METODO DE LOGIN - JWT
    static async realizarLogin(req, res) {
        try {
            // Pega o email e senha vindos do form HTML
            const { inputEmailLog, inputSenhaLog } = req.body;

            // Busca o cliente pelo email. 
            // ATENÇÃO: Você precisa ter um método findByEmail criado no seu model Cliente.js
            const cliente = await Cliente.findByEmail(inputEmailLog); 

            // Verifica se achou um cliente e se a senha que ele digitou é igual à do banco
            if (!cliente || cliente.senha.toString() !== inputSenhaLog) {
                // Ele "recarrega" a página de login, mas agora mandando a frase de erro!
                return res.render('login', { erro: 'E-mail ou senha inválidos!' }); 
            }

            // Gera o Token JWT contendo o email e alguma identificação (como o CPF)
            const token = jwt.sign({ CPF: cliente.CPF, email: cliente.email }, SEGREDO_JWT, {
                expiresIn: '1h' // O token será válido por 1 hora
            });

            // Cria um Cookie chamado 'token' no navegador do usuário e salva o JWT dentro dele
            res.cookie('token', token, { httpOnly: true });
            
            // Redireciona o usuário para a página home com sucesso
            res.redirect('/'); 

        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).send('Erro interno do servidor.');
        }
    }

    static async realizarLogout(req, res) {
        res.clearCookie('token');
        res.redirect('/login');
    }

    static async processarRecuperacao(req, res) {
        try {
            const { emailRecuperacao } = req.body;
            const cliente = await Cliente.findByEmail(emailRecuperacao);

            if (!cliente) {
                return res.render('senha-recuperada', { 
                    erro: true, 
                    mensagem: 'E-mail não encontrado no sistema.' 
                });
            }

            return res.render('senha-recuperada', { 
                erro: false, 
                senha: cliente.senha 
            });

        } catch (error) {
            console.error('Erro na recuperação de senha:', error);
            res.status(500).send('Erro interno do servidor.');
        }
    }
    //====================================================================


    static async getAllCliente(req, res){ //tras todos os clientes
        try{
            const clientes = await Cliente.findAll();
            res.json(clientes);
        }catch(error){
            console.error('Erro ao carregar os clientes:', error);
            res.status(500).json({message: 'Erro interno ao buscar clientes'})
        }
    }

    static async getClienteById(req, res){ //traz apenas um cliente
        try{
            const {id} = req.params;
            const clienteExistente = await Cliente.findById(id);

            if(!clienteExistente){
                return res.status(404).json({message: 'Cliente não encontrado!'});
            }
            res.json(clienteExistente);
        }catch(error){
            console.error('Erro ao carregar cliente', error);
            res.status(500).json({message: 'Erro interno ao buscar cliente'})
        }
    }

    static async createCliente(req,res){ //cria um cliente novo
        try{
            console.log(req.body)
            const {nome, sobrenome, CPF, dataNascimento, telefone, email, senha} = req.body;
            const inputFoto = req.file ? req.file.filename : 'avatar-padrao.png';
            const clienteExistente = await  Cliente.findByCPF(CPF);

            if(clienteExistente){
                return res.status(400).json({message: 'Cliente ja cadastrado com esse CPF!'});
            }
            else{
                const novoCliente = new Cliente(nome, sobrenome, CPF, dataNascimento, telefone, email, senha, inputFoto);
                await novoCliente.save();
                res.redirect('/clientes-list');
            }
        }catch(error){
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).send('Erro interno ao salvar cliente');
        }
    }

    static async updateCliente(req, res) {
    try {
        const { id } = req.params;

        const dadosAtualizados = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            CPF: req.body.CPF,
            dataNascimento: req.body.dataNascimento,
            telefone: req.body.telefone,
            email: req.body.email
        };

        // Só atualiza senha se foi digitada
        if (req.body.senha && req.body.senha.trim() !== "") {
            dadosAtualizados.senha = req.body.senha;
        }

        // Só atualiza foto se enviou nova
        if (req.file) {
            dadosAtualizados.inputFoto = req.file.filename;
        }

        await Cliente.update(id, dadosAtualizados);

        res.json({ message: "Cliente atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({ message: "Erro interno" });
    }
}

    static async deleteCliente(req,res){ //excluir um cliente
        try{
            const {id} = req.params;
            const clienteExcluido = await Cliente.delete(id);

            if(!clienteExcluido){
                return res.status(404).json({message: 'Cliente não encontrado para exclusão'});
            }
            res.json({message: 'Cliente excluido com sucesso!', cliente: clienteExcluido});
        }catch(error){
            console.error('Erro ao excluir cliente', error);
            res.status(500).json({ message: 'Erro interno ao excluir cliente'});
        }
    }


    //Implementação dos Renders das Páginas WEB
    static async renderCreateCliente(req,res){ //render da pagina web - cadastro de cliente novo
        try{
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-cliente.html'));
        }catch (error){
            console.error('Erro ao carregar a pagina:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllCliente(req,res){ //render da pagina web - visualizar clientes
        try{
            const clientes = await Cliente.findAll();
            res.render('visualizar-cliente', {clientes: clientes});
        }catch (error){
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderEditCliente(req, res) { //render da pagina web - visualizar pagina de editar cliente
        try {
            const { id } = req.params;
            const clienteExistente = await Cliente.findById(id); 

            if (!clienteExistente) {
                return res.status(404).send('Cliente não encontrado!');
            }

            res.render('editar-cliente', { cliente: clienteExistente });
        } catch (error) {
            console.error('Erro ao carregar a página de edição de cliente:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderLogin(req, res){ //render da pagina web - visualizar pagina de login
        try{
            res.render('login', { erro: null });
        }catch (error){
            console.error('Erro ao carregar a pagina de login:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderHome(req, res){ //render da pagina web - visualizar pagina home
        try{
            res.sendFile(path.join(__dirname, 'views', 'home.html'));
        }catch (error){
            console.error('Erro ao carregar a pagina home:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderRecuperarSenha(req, res) { //render da pagina web - visualizar pagina de recuperação de senha
        try {
            res.sendFile(path.join(__dirname, 'views', 'recuperar-senha.html'));
        } catch (error) {
            console.error('Erro ao carregar a página de recuperação:', error);
            res.status(500).send('Erro interno');
        }
    }
}



export default ClienteController;