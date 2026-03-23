import mongoose from 'mongoose';

const FuncionarioSchema=new mongoose.Schema(
    {
        nome: {type:String,required:true},
        sobrenome: {type:String,required:true},
        cpf: {type:String,required:true, unique: true},
        dataNascimento: {type:String,required:true},
        telefone: {type:String,required:true},
        cargo: {type:String,required:true},
        salario: {type:String,required:true},
        email: {type:String,required:true, unique:true},
        senha: {type:String,required:true},
        fotoPerfil: {type:String,required:true},
    },
    {
        timestamps:true,
    }
);

const FuncionarioModel=mongoose.model('Funcionario', FuncionarioSchema);

export default FuncionarioModel;