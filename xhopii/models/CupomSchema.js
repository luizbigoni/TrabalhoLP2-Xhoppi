import mongoose from 'mongoose';

const CupomSchema = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        descricao: { type: String, required: true },
        porcentagem: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const CupomModel = mongoose.model('Cupom', CupomSchema);

export default CupomModel;