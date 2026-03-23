import ClienteModel from './ClienteSchema.js'

class Cliente{
    #nome
    #sobrenome
    #CPF
    #dataNascimento
    #telefone
    #email
    #senha
    #inputFoto

    constructor(nome, sobrenome, CPF, dataNascimento, telefone, email, senha, inputFoto){
        this.#nome=nome;
        this.#sobrenome=sobrenome;
        this.#CPF=CPF;
        this.#dataNascimento=dataNascimento;
        this.#telefone=telefone;
        this.#email=email;
        this.#senha=senha;
        this.#inputFoto=inputFoto;
    }

    async save(){
        const novoCliente = new ClienteModel({
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            CPF: this.#CPF,
            dataNascimento: this.#dataNascimento,
            telefone: this.#telefone,
            email: this.#email,
            senha: this.#senha,
            inputFoto: this.#inputFoto
        });

        return await novoCliente.save();
    }

    static async findAll(){
        return await ClienteModel.find();
    }

    static async findByCPF(CPF){
        return await ClienteModel.findOne({CPF : CPF});
    }

    static async findByEmail(email){
        return await ClienteModel.findOne({ email: email });
    }

    static async findById(id){
        return await ClienteModel.findById(id);
    }

    static async update(id, dadosAtualizados){
        return await ClienteModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    }

    static async delete(id){
        return await ClienteModel.findByIdAndDelete(id);
    }
}

export default Cliente;