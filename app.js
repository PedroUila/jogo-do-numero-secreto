let listaDeNumerosSecreto = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 a 10';

function exibirTextoNaTela(tag, texto) {
	let campo = document.querySelector(tag);
	campo.innerHTML = texto;
	responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
	exibirTextoNaTela('h1', 'Jogo do número secreto');
	exibirTextoNaTela('p', `Escolha um número entre 1 a ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
	let chute = document.querySelector('input').value;
	let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
	let mensagemTentativa = `Parabéns, você acertou com ${tentativas} ${palavraTentativa}! `;
	if (chute == numeroSecreto) {
		exibirTextoNaTela('p', mensagemTentativa);
		document.getElementById('reiniciar').removeAttribute('disabled');
	} else {
		if (chute > numeroSecreto) {
			exibirTextoNaTela('p', `Você errou! O número secreto é menor que ${chute}!`);
		} else {
			exibirTextoNaTela('p', `Você errou! O número secreto é maior que ${chute}!`);
		}
		tentativas++;
		limparCampo();
	}

}

function gerarNumeroAleatorio() {
	let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
	let quantidadeDeElementosNaLista = listaDeNumerosSecreto.length;
	if (quantidadeDeElementosNaLista == numeroLimite) {
		listaDeNumerosSecreto = [];
	}
	
	if (listaDeNumerosSecreto.includes(numeroEscolhido)) {
		return gerarNumeroAleatorio()
	} else {
		listaDeNumerosSecreto.push(numeroEscolhido);
		console.log(listaDeNumerosSecreto);
		return numeroEscolhido;
	}
}

function limparCampo() {
	document.querySelector('input').value = '';
}

function reiniciarJogo() {
	numeroSecreto = gerarNumeroAleatorio();
	limparCampo();
	tentativas = 1;
	exibirMensagemInicial();
	document.getElementById('reiniciar').setAttribute('disabled', true);
}