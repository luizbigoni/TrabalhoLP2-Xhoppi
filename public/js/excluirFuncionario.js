document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.btn-excluir-func, .btn-excluir-funcionario');

    botoes.forEach(botao => {
        botao.addEventListener('click', async () => {
            const id = botao.dataset.id;

            const confirmacao = confirm("Tem certeza que deseja excluir este funcionário?");
            
            if (!confirmacao) return;

            try {
                const resposta = await fetch(`/funcionarios/${id}`, {
                    method: 'DELETE'
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Funcionário excluído com sucesso!");
                    window.location.reload();
                } else {
                    alert(resultado.message || "Erro ao excluir funcionário.");
                }

            } catch (erro) {
                console.error("Erro:", erro);
                alert("Erro de comunicação com o servidor.");
            }
        });
    });
});