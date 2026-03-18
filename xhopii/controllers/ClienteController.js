import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Cliente from '../models/Cliente.js';

class ClienteController{
    static async getAllCliente(req, res){ //tras todos os clientes
        try{
            const clientes = await Cliente.findAll();
            res.json(clientes);
        }catch(error){
            console.error('Erro ao carregar os clientes:', error);
            res.status(500).json({message: 'Erro interno ao buscar clientes'})
        }
    }

    static async getClienteById(req, res){ //tras apenas um cliente
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
            const {nome, sobrenome, CPF, dataNascimento, telefone, email, senha, inputFoto} = req.body;
            const clienteExistente = await  Cliente.findByCPF(CPF);

            if(clienteExistente){
                return res.status(400).json({message: 'Cliente ja cadastrado com esse CPF!'});
            }
            else{
                const novoCliente = new Cliente(nome, sobrenome, CPF, dataNascimento, telefone, email, senha, inputFoto);
                await novoCliente.save();
                res.status(201).json(novoCliente);
            }
        }catch(error){
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).send('Erro interno ao salvar cliente');
        }
    }

    static async updateCliente(req,res){ //atualizar um cliente 
        try{
            const {id} = req.params;
            const dadosAtualizados = req.body;
            const clienteAtualizado = await Cliente.update(id, dadosAtualizados);

            if(!clienteAtualizado){
                return res.status(404).json({message: 'Cliente não encontrado para atualização'});
            }
            res.json({message: 'Cliente atualizado com sucesso!', cliente: clienteAtualizado});
        }catch(error){
            console.error('Erro ao atualizar cliente', error);
            res.status(500).json({ message: 'Erro interno ao atualizar cliente'});
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
}

export default ClienteController;