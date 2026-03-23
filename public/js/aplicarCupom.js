document.querySelectorAll(".btn-aplicar-cupom").forEach(botao => {
    botao.addEventListener("click", async function () {

        const card = this.closest(".produto-item-grid");

        const input = card.querySelector(".input-cupom");
        const codigo = input.value;

        const valorElemento = card.querySelector(".valor-produto");
        const valorOriginal = parseFloat(valorElemento.dataset.valor);

        const resultado = card.querySelector(".resultado-cupom");

        if (!codigo) {
            resultado.innerText = "Digite um cupom";
            return;
        }

        try {
            const resposta = await fetch(`/cupons?codigo=${codigo}`);
            const cupons = await resposta.json();

            const cupom = cupons.find(c => c.codigo === codigo);

            if (!cupom) {
                resultado.innerText = "Cupom inválido";
                return;
            }

            const desconto = cupom.porcentagem;
            const novoValor = valorOriginal - (valorOriginal * desconto / 100);

            valorElemento.innerText = `R$ ${novoValor.toFixed(2)}`;
            resultado.innerText = `Desconto aplicado (${desconto}% OFF)`;

        } catch (erro) {
            console.error(erro);
            resultado.innerText = "Erro ao aplicar cupom";
        }

    });
});