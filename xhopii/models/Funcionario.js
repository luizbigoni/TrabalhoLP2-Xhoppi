import FuncionarioModel from "./FuncionaroSchema";

class Funcionario{
    #nome;
    #sobrenome;
    #cpf;
    #dataNascimento;
    #telefone;
    #cargo;
    #salario;
    #email;
    #senha;
    #fotoPerfil;

    constructor(nome,sobrenome,cpf,dataNascimento,telefone,cargo,salario,email,senha,fotoPerfil){
        this.#nome=nome;
        this.#sobrenome=sobrenome;
        this.#cpf=cpf;
        this.#dataNascimento=dataNascimento;
        this.#telefone=telefone;
        this.#cargo=cargo;
        this.#salario=salario;
        this.#email=email;
        this.#senha=senha;
        this.#fotoPerfil=fotoPerfil;
    }

    async save(){
        const novoFuncionario=new Funcionario({
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            cpf: this.#cpf,
            dataNascimento: this.#dataNascimento,
            telefone: this.#telefone,
            cargo: this.#cargo,
            salario: this.#salario,
            email: this.#email,
            senha: this.#senha,
            fotoPerfil: this.#fotoPerfil,
        });
        return await novoFuncionario.save();
    }

    static async findAll(){
        return await FuncionarioModel.find();
    }

    static async findById(id){
        return await FuncionarioModel.findById(id);
    }

    static async delete(id){
        return await FuncionarioModel.findByIdAndDelete(id);
    }

    static async update(id, dadosAtualizados){
        return await FuncionarioModel.findByIdAndUpdate(id, dadosAtualizados, { new: true }); 
    }

}
export default Funcionario;