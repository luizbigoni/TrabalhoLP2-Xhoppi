import CupomModel from "./CupomSchema.js";

class Cupom{
    #codigo
    #descricao
    #porcentagem

    constructor(codigo, descricao, porcentagem){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#porcentagem=porcentagem;
    }

    async save(){
        const novoCupom = new CupomModel({
            codigo: this.#codigo,
            descricao: this.#descricao,
            porcentagem: this.#porcentagem
        });
        return await novoCupom.save();
    }

    static async findAll(){
        return await CupomModel.find();
    }

   static async findByCodigo(codigo){
        return await CupomModel.findOne({ codigo: codigo }); 
    }
    static async findById(id){
        return await CupomModel.findById(id);
    }

    static async update(id, dadosAtualizados){
        return await CupomModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    }

    static async delete(id){
        return await CupomModel.findByIdAndDelete(id);
    }

}

export default Cupom;