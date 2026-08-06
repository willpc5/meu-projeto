const form = document.getElementById('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const nome = document.getElementById('nome').value;
  const mensagem = document.getElementById('mensagem').value;

  try {
    const response = await fetch('https://meu-projeto-production-799f.up.railway.app/contato', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, mensagem })
    });

    if (response.ok) {
      const resultado = await response.json();
      alert('Mensagem enviada com sucesso!');
      form.reset(); // Limpa o formulário
    } else {
      const erro = await response.json();
      alert(`Erro ao enviar: ${erro.error}`);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Não foi possível conectar ao servidor backend.');
  }
});










/*
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
*/