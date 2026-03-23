document.getElementById("btn-salvar-cliente").addEventListener("click", async () => {

    const form = document.getElementById("form-editar-cliente");
    const id = form.dataset.id;

    const formData = new FormData(form);

    await fetch(`/clientes/${id}`, {
        method: "PUT",
        body: formData
    });

    alert("Cliente atualizado com sucesso!");
    window.location.href = "/clientes-list";
});