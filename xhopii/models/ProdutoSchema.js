import mongoose from 'mongoose';

const ProdutoSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        fabricante: { type: String, required: true },
        descricao: { type: String, required: true },
        valor: { type: Number, required: true },
        quantidade: { type: Number, required: true },
        foto: { type: String, required: true } 
    },
    {
        timestamps: true
    }
);

const ProdutoModel = mongoose.model('Produto', ProdutoSchema);

export default ProdutoModel;