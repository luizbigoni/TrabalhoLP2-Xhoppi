import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        sobrenome: { type: String, required: true },
        CPF: { type: String, required: true },
        dataNascimento: { type: String, required: true },
        telefone: { type: String, required: true },
        email: { type: String, required: true },
        senha: { type: Number, required: true },
        inputFoto: { type: String, required: true } //Armazenar o caminho/URL do arquivo
    },
    {
        timestamps: true
    }
);

const ClienteModel = mongoose.model('Cliente', ClienteSchema);

export default ClienteModel;