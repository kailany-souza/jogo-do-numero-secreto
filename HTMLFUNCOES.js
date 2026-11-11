//                               1.0 funcoes/interacao com HTML
// Tipo de Função	            Exemplo de Código	                    Uso
// Sem retorno e sem parâmetro	function saudacao() { ... }	          Execução de bloco de código simples.
// Sem retorno e com parâmetro	function cumprimentar(nome) { ... }	  Execução de bloco de código com argumentos.
// Com retorno e sem parâmetro	function gerarNumeroAleatorio() {...} Cálculo e retorno de um valor específico.
// Com retorno e com parâmetro	function somar(a, b) { ... }	      Cálculo e retorno baseado em argumentos.
// Função anônima	            let saudacao = function() { ... };	  Definição de função sem nome localmente.
// Arrow function	            let quadrado = x => x * x;	          Definição concisa de funções curtas.



// let titulo = document.querySelector (`h1`); // interagindo com o html - linha 22 - h1 (titulo, parte principal)
// titulo.innerHTML = `jogo do numero secreto`;

// let paragrafo = document.querySelector (`p`);
// paragrafo.innerHTML = `escolha um numero entre 1 e 10`;

// declarando uma funcao para evitar repeticao de codigos
let listaDeNumerosSorteados = [];

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(
        texto, 'Brazilian Portuguese Female',
        { rate: 1.2 }
    );
};

function exibirMensagemInicial () {
    exibirTextoNaTela (`h1`, `jogo do numero secreto`);
    exibirTextoNaTela (`p`, `escolha um numero entre 1 e 100`); // criado essa funcao para reduzir o codigo na linha 73
}

exibirMensagemInicial ();

// chamando a funcao
// exibirTextoNaTela (`h1`, `jogo do numero secreto`);
// exibirTextoNaTela (`p`, `escolha um numero entre 1 e 10`);

// funcoes com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt (Math.random () * 10 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length
    if (quantidadeDeElementosNaLista == 10) {
        listaDeNumerosSorteados = []
    }
    if (listaDeNumerosSorteados.includes (numeroEscolhido)) {
        return gerarNumeroAleatorio ();
    } else {
        listaDeNumerosSorteados.push (numeroEscolhido);
        console.log (listaDeNumerosSorteados);
        return numeroEscolhido;
    }
};

function limparCampo () {
    chute = document.querySelector (`input`); // nao seleciona o value pois nao quero o valor nesse momento
    chute.value = ''; // retorna uma string vazia, limpa o campo 
};

let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function verificarChute () {
    let chute = document.querySelector (`input`).value;
    //console.log (chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela (`h1`, `acertou!`);
        
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        
        exibirTextoNaTela (`p`, `${mensagemTentativas}`);

        document.getElementById (`reiniciar`).removeAttribute (`disabled`); // button onclick="" id="reiniciar" class="container__botao" disabled>Novo jogo</button>

    } else{
        if ( chute > numeroSecreto) {
            exibirTextoNaTela (`p`, `o numero secreto e menor que o chute`)
        } else {
            exibirTextoNaTela (`p`, `o numero secreto e maior que o chute`);            
        }
        tentativas++
        limparCampo ();
    } 
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio ();
    limparCampo ();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById (`reiniciar`).setAttribute (`disabled`, true);
}