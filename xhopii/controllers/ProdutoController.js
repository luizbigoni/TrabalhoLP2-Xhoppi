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
            const { nome, fabricante, descricao, valor, quantidade} = req.body;
            const foto = req.file ? req.file.filename : 'padrao.png';
            const novoProduto = new Produto(nome, fabricante, descricao, valor, quantidade, foto);
            await novoProduto.save();
            res.redirect('/produtos-list');
            //res.status(201).json(novoProduto);
        } catch (error) {
            console.error('Erro ao cadastrar produto', error);
            res.status(500).send('Erro interno ao salvar produto');
        }
    }

    static async renderEditProduto(req, res) {
        try {
            const { id } = req.params;
            // Puxa os dados do produto específico do banco de dados
            const produtoExistente = await Produto.findById(id); 

            if (!produtoExistente) {
                return res.status(404).send('Produto não encontrado!');
            }

            // Renderiza o EJS de edição passando os dados para os inputs
            res.render('editar-produto', { produto: produtoExistente });
        } catch (error) {
            console.error('Erro ao carregar a página de edição:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async updateProduto(req, res) {
    try {
        const { id } = req.params;

        const dadosAtualizados = {
            nome: req.body.nome,
            fabricante: req.body.fabricante,
            descricao: req.body.descricao,
            valor: req.body.valor,
            quantidade: req.body.quantidade
        };

        // Se enviou nova foto
        if (req.file) {
            dadosAtualizados.foto = req.file.filename;
        }

        await Produto.update(id, dadosAtualizados);

        res.json({ message: "Produto atualizado com sucesso!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar produto" });
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

    static async getAllProdutosHome() {
    try {
        return await Produto.findAll();
    } catch (error) {
        console.error(error);
        return [];
    }
}

}

export default ProdutoController;