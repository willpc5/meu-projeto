const form = document.querySelector('#form');
const nome = document.querySelector('#nome');
const mensagem = document.querySelector('#mensagem');
const resultado = document.querySelector('#resultado');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nomeUsuario = nome.value.trim();
    const mensagemDigitada = mensagem.value.trim();

    if (nomeUsuario === '' || mensagemDigitada === '') {
        resultado.textContent = 'Por favor, preencha ambos os campos.';
        resultado.classList.remove('text-green-600');
        resultado.classList.add('text-red-600');
        return;
    }

    resultado.innerHTML = `Formulário enviado com sucesso!<br>
                           Nome: ${nomeUsuario}<br>
                           Mensagem: ${mensagemDigitada}`;
    resultado.classList.remove('text-red-600');
    resultado.classList.add('text-green-600');
                           
});

form.addEventListener('reset', function() {
    resultado.textContent = '';

    resultado.classList.remove('text-green-600', 'text-red-600');
})