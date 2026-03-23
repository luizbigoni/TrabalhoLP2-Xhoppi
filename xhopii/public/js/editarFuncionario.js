document.getElementById("btn-salvar-func").addEventListener("click", async () => {

    const form = document.getElementById("form-editar-func");
    const id = form.dataset.id;

    const formData = new FormData(form);

    await fetch(`/funcionarios/${id}`, {
        method: "PUT",
        body: formData
    });

    alert("Funcionário atualizado com sucesso!");
    window.location.href = "/funcionarios-list";
});