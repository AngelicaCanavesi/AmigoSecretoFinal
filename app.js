let nomes = [];
let sorteados = [];
let amigosSecretos = {};

function adicionar() {
    const nomeAmigo = document.getElementById('nome-amigo').value.trim();
    if (nomeAmigo === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }
    if (nomes.includes(nomeAmigo)) {
        alert('Este nome já foi adicionado.');
        return;
    }
    nomes.push(nomeAmigo);
    document.getElementById('nome-amigo').value = '';
    atualizarListaNomes();
}

function atualizarListaNomes() {
    const listaNomes = document.getElementById('lista-nomes');
    console.log(nomes);

    listaNomes.innerHTML = '';
    nomes.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        listaNomes.appendChild(li);
    });
}

function embaralharLista(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sortear() {
    if (nomes.length < 2) {
        alert('Adicione ao menos dois nomes antes de sortear!');
        return;
    }

    sorteados = [...nomes];
    embaralharLista(sorteados);

    for (let i = 0; i < nomes.length; i++) {
        if (nomes[i] === sorteados[i]) {
            if (i === nomes.length - 1) {
                [sorteados[i], sorteados[0]] = [sorteados[0], sorteados[i]];
            } else {
                [sorteados[i], sorteados[i + 1]] = [sorteados[i + 1], sorteados[i]];
            }
        }
    }

    amigosSecretos = {};
    for (let i = 0; i < nomes.length; i++) {
        amigosSecretos[nomes[i]] = sorteados[i];
    }

    alert('Sorteio realizado com sucesso! Digite seu nome e clique em "Ver meu amigo secreto".');
}

function verAmigoSecreto() {
    const nome = document.getElementById('nome-participante').value.trim();
    if (nome === '') {
        alert('Por favor, digite seu nome.');
        return;
    }
    exibirAmigoSecretoIndividual(nome);
}

function exibirAmigoSecretoIndividual(nome) {
    if (amigosSecretos[nome]) {
        document.getElementById('amigo-secreto-individual').textContent = `Seu amigo secreto é: ${amigosSecretos[nome]}`;
    } else {
        alert("Nome não encontrado ou sorteio não realizado.");
    }
}

function proximoParticipante() {
    document.getElementById('amigo-secreto-individual').textContent = '';
    document.getElementById('nome-participante').value = '';
}

function reiniciar() {
    nomes = [];
    sorteados = [];
    amigosSecretos = {};
    document.getElementById('amigo-secreto-individual').textContent = '';
    atualizarListaNomes();
}