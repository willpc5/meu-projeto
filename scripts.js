async function chamarApi() {
    const response = await fetch('https://restcountries.com/v3.1/alpha/co');

    const dados = await response.json();

    console.log(dados);
}

chamarApi();

// Testa de API