//Agrego cursor pointer a todos los colores
const gameboardDiv = document.querySelectorAll(".gameboard div")
gameboardDiv.forEach((id)=>{
    id.style= "cursor: pointer;"

})
//obtengo en constantes los elementos html del juego (el boton y las luces de colores)
const btn_empezar= document.getElementById("botonEmpezar")
const amarillo= document.getElementById("amarillo")
const azul= document.getElementById("azul")
const rojo= document.getElementById("rojo")
const verde= document.getElementById("verde")
const ULTIMO_NIVEL= 10;

//Creo la clase juego en la cual uso el constructor para crear los metodos que usaré allí tambien crear las funciones que se requieren para iluminar y apagar los colores.

class Juego{
    constructor(){
        this.inicializar()
        this.generarSecuencia()
        setTimeout(()=>{
            this.siguienteNivel()
        },500)
        
    }
    //inicializa el juego, cuando oprimimos el boton agregamos la clase hide para que este desaparezca, indicamos que el nivel es 1 y guardamos los elementos que habiamos obtenido antes en un objeto.
    inicializar(){
        this.elegircolor = this.elegircolor.bind(this)
        this.siguienteNivel= this.siguienteNivel.bind(this)
        btn_empezar.classList.add('hide')
        this.nivel=1
        this.colores={
            amarillo,// amarillo: amarillo, -> es esto mismo 
            azul,
            rojo,
            verde
        }
    }
    //se usa para transformar los valores númericos del array  que se creará más adelante en texto con el nombre de cada color
    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'amarillo';
            case 1:
                return 'azul';
            case 2:
                return 'rojo';
            case 3:
                return 'verde';
        }
    }
    transformarColorANumero(color){
        switch(color){
            case 'amarillo':
                return 0;
            case 'azul':
                return 1;
            case 'rojo':
                return 2;
            case 'verde':
                return 3;
        }
    }
    //crea un array de 10 elementos en cero,  luego los mapea y les asigna un número aleatorio entre 0 y 3(incluido) para generar el array que se transformará en array de colores.
    generarSecuencia(){
        this.secuencia= new Array (ULTIMO_NIVEL).fill(0).map(n=>Math.floor(Math.random()*4))
    }
    //llama a iluminar secuencia para ir avanzando en cada nivel del juego
    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }
    //va a recorrer un for según el nivel en el que vaya el usuario, dentro de este irá iluminando los colores haciendo la transformación de cada color obtenido en el array en número al nombre de cada color, luego con settimeout y la función iluminar color va esperando un segundo por cada color a iluminar (1000*i)
    iluminarSecuencia(){
        for (let i=0;i < this.nivel; i++){
            const color= this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(()=>this.iluminarColor(color),1000 * i)
            
        }
    }
    //agrega la clase light a cada "bombillo"(div.color) luego con el setTimeout despues de 350ms llama a la función apagar color
    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=>{this.apagarColor(color)},350)
    }
    //borra la clase light de cada "bombillo" (div.color)
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    //agregamos los eventos click a cada luz para conocer cual elemento clickea el usuario
    agregarEventosClick(){
        // this.colores.amarillo.addEventListener('click',this.elegircolor).bind(this)
        // this.colores.azul.addEventListener('click',this.elegircolor).bind(this)
        // this.colores.rojo.addEventListener('click',this.elegircolor).bind(this)
        // this.colores.verde.addEventListener('click',this.elegircolor).bind(this)
        //para no hacer esto el bind(this) se puede incluir en una sola linea en inicializar
        this.colores.amarillo.addEventListener('click',this.elegircolor)
        this.colores.azul.addEventListener('click',this.elegircolor)
        this.colores.rojo.addEventListener('click',this.elegircolor)
        this.colores.verde.addEventListener('click',this.elegircolor)
    }
    eliminarEventosClick(){

        this.colores.amarillo.removeEventListener('click',this.elegircolor)
        this.colores.azul.removeEventListener('click',this.elegircolor)
        this.colores.rojo.removeEventListener('click',this.elegircolor)
        this.colores.verde.removeEventListener('click',this.elegircolor)

    }
    elegircolor(ev){
        //recibimos el nombre del color que enviamos por el dataset en cada div.color hay un data-color="<color>"
        const nombreColor= ev.target.dataset.color 
        const numeroColor= this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor=== this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel===this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.subnivel===ULTIMO_NIVEL+1){
                    this.ganoElJuego()
                }else{
                    setTimeout(this.siguienteNivel,1500)
                }

               
            }
        }else{
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
        swal({
            text: "¡Ganaste!",
            icon: "success",
          })
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
        perdioElJuego(){
        swal({
            text: "¡Perdiste!",
            icon: "error",
          })
        .then(()=>{
            this.eliminarEventosClick()

        })
    }

}
const empezarJuego= ()=>{
     window.juego = new Juego()
}