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

    static async createFuncionario(req,res){}
    static async updateFuncionario(req,res){}
    static async deleteFuncionario(req,res){}
    static async renderCreateFuncionario(req,res){}
    static async renderAllFuncionarios(req,res){}









}