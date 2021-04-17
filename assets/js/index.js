const gameboardDiv = document.querySelectorAll(".gameboard div")
gameboardDiv.forEach((id)=>{
    id.style= "cursor: pointer;"

})
const btn_empezar= document.getElementById("botonEmpezar")
const amarillo= document.getElementById("amarillo")
const azul= document.getElementById("azul")
const rojo= document.getElementById("rojo")
const verde= document.getElementById("verde")

class Juego{
    constructor(){
        this.inicializar()
    }
    inicializar(){
        btn_empezar.classList.add('hide')
    }

}
const empezarJuego= ()=>{
    var juego = new Juego()
}