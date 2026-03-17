
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
        this.nome=nome;
        this.sobrenome=sobrenome;
        this.CPF=CPF;
        this.dataNascimento=dataNascimento;
        this.telefone=telefone;
        this.email=email;
        this.senha=senha;
        this.inputFoto=inputFoto;
    }

    async save(){
        const novoCliente = new ClienteModel({
            nome: this.nome,
            sobrenome: this.#sobrenome,
            CPF: this.CPF,
            dataNascimento: this.dataNascimento,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
            this: this.inputFoto
        });

        return await novoCliente.save();
    }
}