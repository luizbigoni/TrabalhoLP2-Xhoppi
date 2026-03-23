document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.btn-excluir-cupom, .btn-excluir');

    botoes.forEach(botao => {
        botao.addEventListener('click', async () => {
            const id = botao.dataset.id;

            const confirmacao = confirm("Tem certeza que deseja excluir este cupom?");
            if (!confirmacao) return;

            try {
                const resposta = await fetch(`/cupons/${id}`, {
                    method: 'DELETE'
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Cupom excluído com sucesso!");
                    window.location.reload();
                } else {
                    alert(resultado.message || "Erro ao excluir cupom.");
                }

            } catch (erro) {
                console.error("Erro:", erro);
                alert("Erro de comunicação com o servidor.");
            }
        });
    });
});