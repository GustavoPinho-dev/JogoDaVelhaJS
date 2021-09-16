// Essas constantes determinam os jogadores
const player1 = "Homem de Ferro"
const player2 = "Capitão América"

// var que determinará de quem é a vez de jogar
var playTime = player1

// essa variável irá determinar o fim do jogo
var gameOver = false

atualizaMostrador()

inicializarEspacos()

// essa function fica responsável por atualizar o espaço onde mostra de quem é a vez de jogar
function atualizaMostrador() {

    // caso o jogo acabe não será retornado nada
    if (gameOver) { return }

    // a imagem do mostrador será alterada de acordo com quem irá jogar
    if (playTime == player1) {

        var player = document.querySelectorAll("div#mostrador img")[0]
        player.setAttribute("src", "images/homemDeFerro.png")

    } else {

        var player = document.querySelectorAll("div#mostrador img")[0]
        player.setAttribute("src", "images/capitaoAmerica.png")
    }
}

// essa function irá realizar a jogada no tabuleiro
function inicializarEspacos() {

    // essa var armazena todos os espaços do tabuleiro
    var espacos = document.getElementsByClassName("espaco")
    
    // os espaços serão mapeados e receberão uma função para o click
    for (var i = 0; i < espacos.length; i++) {
        
        espacos[i].addEventListener("click", function() {

            if (gameOver) { return }

            // se não estiver ocupado o espaço receberá uma imagem de acordo com o jogador que está jogando
            if(this.getElementsByTagName("img").length == 0) {

                if (playTime == player1) {

                    this.innerHTML = "<img src='images/homemDeFerro.png'>"
                    this.setAttribute("jogada", player1)
                    playTime = player2

                } else {

                    this.innerHTML = "<img src='images/capitaoAmerica.png'>"
                    this.setAttribute("jogada", player2)
                    playTime = player1
                }

                // o mostrador será atualizado e será verificado se o jogo acabou após as jogadas
                atualizaMostrador()
                verificarVencedor()
            }
        })  
    }
}

// essa function irá verificar se há algum vencedor
async function verificarVencedor() {

    // essas variáveis retornam e verificam se o espaço já foi escolhido ou não.
    var a1 = document.getElementById("a1").getAttribute("jogada")
    var a2 = document.getElementById("a2").getAttribute("jogada")
    var a3 = document.getElementById("a3").getAttribute("jogada")

    var b1 = document.getElementById("b1").getAttribute("jogada")
    var b2 = document.getElementById("b2").getAttribute("jogada")
    var b3 = document.getElementById("b3").getAttribute("jogada")

    var c1 = document.getElementById("c1").getAttribute("jogada")
    var c2 = document.getElementById("c2").getAttribute("jogada")
    var c3 = document.getElementById("c3").getAttribute("jogada")

    var vencedor = ""

    // essa lógica é aplicada para verificar se alguém ganhou ou se houve empate
    if ((a1 == b1 && a1 == c1 ) ||(a1 == a2 && a1 == a3 ) ||(a1 == b2 && a1 == c3 ) && a1 != "") {
        
        vencedor = a1

    } else if ((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") ||(b2 == a3 && b2 == c1 && b2 != "")) {
        
        vencedor = b2

    } else if ((c3 == c2 && c3 == c1) ||(c3 == a3 && c3 == b3) && c3 != "") {
        
        vencedor = c3

    } else {
        empate()
        
    }

    // será apresentado o vencedor e o jogo será reiniciado.
    if (vencedor != "") {
        gameOver = true

        await sleep(50)

        modal = document.querySelector(".container")
        box = document.querySelector(".box")

        modal.style.display = "flex";
        box.innerHTML = `<p>O ganhador foi o: ${vencedor}</p>`

        reiniciar()
    }
}

// essa function determina um tempo de espera para que a mensagem do vencedor seja exibida
function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms))

}

// essa function retorna algo se houver um empate no jogo
async function empate() {

    var espacos = document.getElementsByClassName("espaco")
        var contJogadas = 0

        // verifica se o espaço já foi escolhido por algum jogador
        for (var i = 0; i < espacos.length; i++) {
            jogada = espacos[i].getAttribute("jogada")

            if (jogada != "") {
                contJogadas++
            }
        }

        // verifica se todos os espaços já foram ocupados
        if(contJogadas == 9) {
            
            await sleep(50)
            
            //alert("Empate!")

            modal = document.querySelector(".container")
            box = document.querySelector(".box")

            modal.style.display = "flex";
        
            box.innerHTML = `<p>Empate!</p>`

            reiniciar()
        }
}

// irá exibir o botão de reiniciar o jogo
async function reiniciar() {
    var container = document.querySelector(".reiniciar")

    if(container.style.display === "block") {
        container.style.display = 'none'
    } else {
        container.style.display = 'block'
    }

    await sleep(50)
    
}

// atribui a função reiniciar e resetarEspacos ao botão
var btn = document.getElementById("btn-reiniciar")
var container = document.querySelector(".reiniciar")
    
btn.addEventListener('click', function() {

    if(container.style.display === "block") {
        container.style.display = 'none'
    } else {
        container.style.display = 'block'
    }

    modal = document.querySelector(".container")
    modal.style.display = "none";

    resetarEspacos()
    
})

// essa function irá resetar o jogo limpando todos os espaços e resetando todas as varíaveis
function resetarEspacos() {

    var espacos = document.getElementsByClassName("espaco")

    for (var i = 0; i < espacos.length; i++) {
        
        img = espacos[i].querySelector("img")

        espacos[i].setAttribute("jogada", "")

        if (img != null) {

            img.remove()
        }
    }

    gameOver = false
    playTime = player1
    vencedor = ""

    verificarVencedor()
    atualizaMostrador()

}