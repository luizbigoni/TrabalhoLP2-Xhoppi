import ProdutoModel from './ProdutoSchema.js'; // Não esqueça o .js no final!

class Produto {
    #nome;
    #fabricante;
    #descricao;
    #valor;
    #quantidade;
    #foto;

    constructor(nome, fabricante, descricao, valor, quantidade, foto) {
        this.#nome = nome;
        this.#fabricante = fabricante;
        this.#descricao = descricao;
        this.#valor = valor;
        this.#quantidade = quantidade;
        this.#foto = foto;
    }
    
    async save() {
        const novoProduto = new ProdutoModel({
            nome: this.#nome,
            fabricante: this.#fabricante,
            descricao: this.#descricao,
            valor: this.#valor,
            quantidade: this.#quantidade,
            foto: this.#foto
        });
        return await novoProduto.save();
    }

    static async findAll() {
        return await ProdutoModel.find();
    }

    static async findById(id) {
        return await ProdutoModel.findById(id);
    }

    static async update(id, dadosAtualizados) {
        return await ProdutoModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    }

    static async delete(id) {
        return await ProdutoModel.findByIdAndDelete(id);
    }
}

export default Produto;