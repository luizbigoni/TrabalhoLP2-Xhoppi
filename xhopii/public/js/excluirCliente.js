document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.btn-excluir-cliente');

    botoes.forEach(botao => {
        botao.addEventListener('click', async () => {
            const id = botao.dataset.id;

            const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
            if (!confirmacao) return;

            try {
                const resposta = await fetch(`/clientes/${id}`, {
                    method: 'DELETE'
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Cliente excluído com sucesso!");
                    window.location.reload();
                } else {
                    alert(resultado.message || "Erro ao excluir cliente.");
                }

            } catch (erro) {
                console.error("Erro:", erro);
                alert("Erro de comunicação com o servidor.");
            }
        });
    });
});