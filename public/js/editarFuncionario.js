document.getElementById("btn-salvar-func").addEventListener("click", async () => {

    const form = document.getElementById("form-editar-func");
    const id = form.dataset.id;

    // O FormData pega todos os inputs que tem 'name' automaticamente, incluindo a imagem
    const formData = new FormData(form);

    try {
        // Guardamos a resposta do servidor em uma variável
        const resposta = await fetch(`/funcionarios/${id}`, {
            method: "PUT",
            body: formData
        });

        // O .ok verifica se o status foi 200 (Sucesso)
        if (resposta.ok) {
            alert("Funcionário atualizado com sucesso!");
            window.location.href = "/funcionarios-list";
        } else {
            // Se o servidor retornar erro 400 ou 500, cai aqui
            alert("Falha ao atualizar o funcionário. Verifique os dados no terminal.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor.");
    }
});