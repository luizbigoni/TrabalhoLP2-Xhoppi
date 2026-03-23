document.getElementById("form-editar").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const formData = new FormData();
    formData.append("nome", document.getElementById("nome").value);
    formData.append("fabricante", document.getElementById("fabricante").value);
    formData.append("descricao", document.getElementById("descricao").value);
    formData.append("valor", document.getElementById("valor").value);
    formData.append("quantidade", document.getElementById("quantidade").value);

    const foto = document.getElementById("foto").files[0];
    if (foto) {
        formData.append("foto", foto);
    }

    await fetch(`/produtos/${id}`, {
        method: "PUT",
        body: formData
    });

    alert("Produto atualizado!");
    window.location.href = "/produtos-list";
});