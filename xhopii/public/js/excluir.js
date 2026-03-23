document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', async () => {
        const id = btn.dataset.id;

        const confirmacao = confirm("Tem certeza que deseja excluir este produto da loja?");
        
        if (confirmacao) {
            try {
                const resposta = await fetch(`/produtos/${id}`, {
                    method: 'DELETE'
                });

                if (resposta.ok) {
                    alert("Produto excluído com sucesso!");
                    window.location.reload();
                } else {
                    const erro = await resposta.json();
                    alert(erro.message || "Erro ao excluir o produto.");
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Erro de comunicação com o servidor.");
            }
        }
    });
});