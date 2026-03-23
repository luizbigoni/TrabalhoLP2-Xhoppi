document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-editar-cupom');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('cupomId').value;

        const dados = {
            codigo: document.getElementById('codigo').value,
            descricao: document.getElementById('descricao').value,
            porcentagem: document.getElementById('porcentagem').value
        };

        try {
            const response = await fetch(`/cupons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const resultado = await response.json();

            if (response.ok) {
                alert('Cupom atualizado com sucesso!');
                window.location.href = '/cupons-list';
            } else {
                alert(resultado.message || 'Erro ao atualizar cupom');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
});