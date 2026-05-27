const form = document.querySelector('#form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.querySelector('#nome').value;

    console.log(`Olá, ${nome}! Obrigado por entrar em contato. Em breve, responderei sua mensagem.`);
});