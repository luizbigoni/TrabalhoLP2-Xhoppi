import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Cupom from '../models/Cupom.js';

class CupomController{
    static async getAllCupom(req, res){ //tras todos os cupons
        try{
            const cupons = await Cupom.findAll();
            res.json(cupons);
        }catch(error){
            console.error('Erro ao carregar os cupons:', error);
            res.status(500).json({message: 'Erro interno ao buscar cupons'})
        }
    }

    static async getCupomById(req, res){ //tras apenas um cupom
        try{
            const {id} = req.params;
            const cupomExistente = await Cupom.findById(id);

            if(!cupomExistente){
                return res.status(404).json({message: 'Cupom não encontrado!'});
            }
            res.json(cupomExistente);
        }catch(error){
            console.error('Erro ao carregar Cupom', error);
            res.status(500).json({message: 'Erro interno ao buscar cupom'})
        }
    }

    static async createCupom(req,res){ //cria um cupom novo
        try{
            const {codigo, descricao, porcentagem} = req.body;
            const cupomExistente = await  Cupom.findByCodigo(codigo);

            if(cupomExistente){
                return res.status(400).json({message: 'Cupom ja cadastrado com esse codigo!'});
            }
            else{
                const novoCupom = new Cupom(codigo, descricao, porcentagem);
                await novoCupom.save();
                //res.status(201).json(novoCupom);
                res.redirect('/cupons');
                
            }
        }catch(error){
            console.error('Erro ao cadastrar cupom', error);
            res.status(500).send('Erro interno ao salvar cupom');
        }
    }

    static async updateCupom(req,res){ //atualizar um cupom 
        try{
            const {id} = req.params;
            const dadosAtualizados = req.body;
            const cupomAtualizado = await Cupom.update(id, dadosAtualizados);

            if(!cupomAtualizado){
                return res.status(404).json({message: 'Cupom não encontrado para atualização'});
            }
            res.json({message: 'Cupom atualizado com sucesso!', cupom: cupomAtualizado});
        }catch(error){
            console.error('Erro ao atualizar cupom', error);
            res.status(500).json({ message: 'Erro interno ao atualizar cupom'});
        }
    }

    static async deleteCupom(req,res){ //excluir um cupom
        try{
            const {id} = req.params;
            const cupomExcluido = await Cupom.delete(id);

            if(!cupomExcluido){
                return res.status(404).json({message: 'Cupom não encontrado para exclusão'});
            }
            res.json({message: 'Cupom excluido com sucesso!', cupom: cupomExcluido});
        }catch(error){
            console.error('Erro ao excluir cupom', error);
            res.status(500).json({ message: 'Erro interno ao excluir cupom'});
        }
    }



    //Implementação dos Renders das Páginas WEB
    static async renderCreateCupom(req,res){ //render da pagina web - cadastro de cupom novo
        try{
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-cupom.html'));
        }catch (error){
            console.error('Erro ao carregar a pagina:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllCupom(req,res){ //render da pagina web - visualizar cupons
        try{
            const cupons = await Cupom.findAll();
            res.render('visualizar-cupom', { cupons: cupons });
        }catch (error){
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default CupomController;