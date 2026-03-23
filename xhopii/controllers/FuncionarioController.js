import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Funcionario from '../models/Funcionario.js';

class FuncionarioController{
    static async getAllFuncionarios(req,res){
        try{
            const funcionarios=await Funcionario.findAll();
            res.json(funcionarios);
        }catch(error){
            console.error('Erro ao carregar os funcionarios:', error);
            res.status(500).json({message: 'Erro interno ao buscar funcionarios'})
        }
    }

    static async getFuncionarioById(req,res){
        try{
            const {id}=req.params;
            const funcionarioExistente=await Funcionario.findById(id);

            if(!funcionarioExistente){
                return res.status(404).json({ message: 'Funcionario não encontrado'});
            }
            res.json(funcionarioExistente);
        }catch(error){
            console.error('Erro ao carregar o funcionario:', error);
            res.status(500).json({message: 'Erro interno ao buscar o funcionario'})
        }
    }

    static async createFuncionario(req,res){
        try{
            const {nome,sobrenome,cpf,dataNascimento,telefone,cargo,salario,email,senha,fotoPerfil}=req.body;
            const funcionarioExistente=await Funcionario.findByCpf(cpf);

            if(funcionarioExistente){
                return res.status(400).json({message: 'Funcionario ja cadastrado com esse CPF!'});
            }
             else{
                const novoFuncionario = new Funcionario(nome,sobrenome,cpf,dataNascimento,telefone,cargo,salario,email,senha,fotoPerfil);
                await novoFuncionario.save();
                res.redirect('/funcionarios-list');
                //res.status(201).json(novoFuncionario);
            }
        }catch(error){
            console.error('Erro ao cadastrar funcionario', error);
            res.status(500).send('Erro interno ao salvar funcionario');
        }
    }
    static async updateFuncionario(req,res){
        try{
            const {id} = req.params;
            const dadosAtualizados = req.body;
            const funcionarioAtualizado = await Funcionario.update(id, dadosAtualizados);

            if(!funcionarioAtualizado){
                return res.status(404).json({message: 'Funcionario não encontrado para atualização'});
            }
            res.json({message: 'Funcionario atualizado com sucesso!', funcionario: funcionarioAtualizado});
        }catch(error){
            console.error('Erro ao atualizar funcionario', error);
            res.status(500).json({ message: 'Erro interno ao atualizar funcionario'});
        }
    }
    static async deleteFuncionario(req,res){
        try{
            const {id} = req.params;
            const funcionarioExcluido = await Funcionario.delete(id);

            if(!funcionarioExcluido){
                return res.status(404).json({message: 'Funcionario não encontrado para exclusão'});
            }
            res.json({message: 'Funcionario excluido com sucesso!', funcionario: funcionarioExcluido});
        }catch(error){
            console.error('Erro ao excluir funcionario', error);
            res.status(500).json({ message: 'Erro interno ao excluir funcionario'});
        }
    }
    static async renderCreateFuncionario(req,res){
        try{
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-funcionario.html'));
        }catch (error){
            console.error('Erro ao carregar a pagina:', error);
            res.status(500).send('Erro interno');
        }
    }
    static async renderAllFuncionarios(req,res){
        try{
            const funcionarios = await Funcionario.findAll();
            res.render('visualizar-funcionario', {funcionarios: funcionarios});
        }catch (error){
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }









}

export default FuncionarioController;