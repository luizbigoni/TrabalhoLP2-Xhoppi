import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Produto from '../models/Produto.js';

class ProdutoController {
    static async getAllProdutos(req, res) { 
        try {
            const produtos = await Produto.findAll();
            res.json(produtos);
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
            res.status(500).json({ message: 'Erro interno ao buscar produtos' });
        }
    }

    static async getProdutoById(req, res) {
        try {
            const { id } = req.params;
            const produtoExistente = await Produto.findById(id);

            if (!produtoExistente) {
                return res.status(404).json({ message: 'Produto não encontrado!' });
            }
            res.json(produtoExistente);
        } catch (error) {
            console.error('Erro ao carregar o produto', error);
            res.status(500).json({ message: 'Erro interno ao buscar produto' });
        }
    }

    static async createProduto(req, res) {
        try {
            const { nome, fabricante, descricao, valor, quantidade, foto } = req.body;
            const novoProduto = new Produto(nome, fabricante, descricao, valor, quantidade, foto);
            await novoProduto.save();
            res.status(201).json(novoProduto);
        } catch (error) {
            console.error('Erro ao cadastrar produto', error);
            res.status(500).send('Erro interno ao salvar produto');
        }
    }

    static async updateProduto(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;
            const produtoAtualizado = await Produto.update(id, dadosAtualizados);

            if (!produtoAtualizado) {
                return res.status(404).json({ message: 'Produto não encontrado para atualização' });
            }
            res.json({ message: 'Produto atualizado com sucesso!', produto: produtoAtualizado });
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
            res.status(500).json({ message: 'Erro interno ao atualizar produto' });
        }
    }

    static async deleteProduto(req, res) {
        try {
            const { id } = req.params;
            const produtoExcluido = await Produto.delete(id);

            if (!produtoExcluido) {
                return res.status(404).json({ message: 'Produto não encontrado para exclusão' });
            }
            res.json({ message: 'Produto excluído com sucesso!', produto: produtoExcluido });
        } catch (error) {
            console.error('Erro ao excluir produto', error);
            res.status(500).json({ message: 'Erro interno ao excluir produto' });
        }
    }


    static async renderCreateProduto(req, res) {
        try {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-produto.html'));
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllProduto(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.render('ver-produto', { produtos: produtos });
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default ProdutoController;