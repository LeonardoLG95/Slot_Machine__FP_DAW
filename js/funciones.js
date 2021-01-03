//Cargar las funciones cuando todo haya cargado
document.addEventListener('DOMContentLoaded',botones,false);

//-------------------Añadir listeners a los botones-----------------------

function botones(){
    //Evento para boton monedas
    let botonMonedas=document.getElementById('monedas');
    botonMonedas.addEventListener('click',agregarMonedas,false);

    //Evento para boton jugar
    let botonJugar=document.getElementById('tirar');
    botonJugar.addEventListener('click',tirar,false);

    //Evento para boton salir
    let botonSalir=document.getElementById('salir');
    botonSalir.addEventListener('click',salir,false);

    /*Deshabilito el boton jugar para evitar que se pueda 
    jugar sin monedas en algunos navegadores*/
    document.getElementById('tirar').disabled=true;
}

//------------------Función del BOTÓN INTRODUCIR MONEDA--------------------------

let monedas=0;
function agregarMonedas(){
    //Activar botón Jugar desde la primera moneda
    if(monedas==0){
        document.getElementById('tirar').disabled=false;
    }
    monedas++;
    mensajeMonedas(monedas);
}

//------------------Función del BOTÓN TIRAR--------------------------

//Boolean para no permitir introducir monedas una vez se comienza a jugar
let primeraTirada=true;

//Función tirar para el botón que activa el juego
function tirar(){
    if(monedas>0){ 
        if(primeraTirada){
            document.getElementById('monedas').disabled=true;
            primeraTirada=false;
        } 
        monedas--;

        //Muestro las monedas restantes para que se vea restado durante la animación
        mensajeMonedas(monedas);

        monedas+=juego();
    }
    else{
        document.getElementById('tirar').disabled=true;
    }
}

//------------------Función del BOTÓN SALIR-------------------

function salir(){
    alert('¡Tu resultado es de '+monedas+' monedas!\n\n¡Esperamos volver a verte pronto!\n\nLa página va a refrescarse');
    location.reload();
}

//------------------Función para el MENSAJE DEL H2 (MONEDAS DISPONIBLES PARA JUGAR)-------------------

function mensajeMonedas(monedas){
    let mensaje=document.getElementById('mensaje');
    mensaje.innerHTML='Monedas: '+monedas;
}

//--------------------Función de JUEGO----------------------------------------

function juego(){

    //Desabilito el boton tirar hasta que la animación pase y se muestre el resultado
    document.getElementById('tirar').disabled=true;

    //Lista con el nombre de las verduras (y del archivo de imagen)
    let frutas=['ajo','cebolla','zanahoria','aguacate','pepino','puerro','tomate'];

    //Numero para cada hueco
    let num1=Math.floor(Math.random()*(7));
    let num2=Math.floor(Math.random()*(7));
    let num3=Math.floor(Math.random()*(7));

    //Animación de los rodillos de la máquina, una imagen random cada 100 milisegundos
    let animH1=setInterval(function() {
        document.getElementById('imgHueco1').src='img/'+frutas[Math.floor(Math.random()*7)]+'.png';
    }, 100);
    let animH2=setInterval(function() {
        document.getElementById('imgHueco2').src='img/'+frutas[Math.floor(Math.random()*7)]+'.png';
    }, 100);
    let animH3=setInterval(function() {
        document.getElementById('imgHueco3').src='img/'+frutas[Math.floor(Math.random()*7)]+'.png';
    }, 100);

    //Despues de parar cada animación pongo la verdura que realmente a salido
    setTimeout(function(){
        clearInterval(animH1);
        document.getElementById('imgHueco1').src='img/'+frutas[num1]+'.png';
    },1000);
    
    setTimeout(function(){
        clearInterval(animH2);
        document.getElementById('imgHueco2').src='img/'+frutas[num2]+'.png';
    },2000);
    
    setTimeout(function(){
        clearInterval(animH3);
        document.getElementById('imgHueco3').src='img/'+frutas[num3]+'.png';
    },3000);
    
    /*Premios:
    
    1 zanahoria, 1 moneda.
    2 zanahorias, 4 monedas.
    3 zanahorias, 10 monedas.
    2 hortalizas iguales que no sean zanahorias, 2 monedas.
    3 hortalizas iguales que no sean zanahorias, 5 monedas.
    1 zanahoria y 2 hortalizas iguales, 3 monedas.

    */

    let monedasGanadas=0;

    //Comparaciones 1 moneda
    if(num1==2&&(num2!=num3&&(num2!=2&&num3!=2))){
        monedasGanadas=1;
    }
    else if(num2==2&&(num1!=num3&&(num1!=2&&num3!=2))){
        monedasGanadas=1;
    }
    else if(num3==2&&(num1!=num2&&(num1!=2&&num2!=2))){
        monedasGanadas=1;
    }

    //Comparaciones 2 monedas
    else if(num1!=2&&num1==num2&&num3!=num1&&num3!=2){
        monedasGanadas=2;
    }
    else if(num2!=2&&num2==num3&&num1!=num2&&num1!=2){
        monedasGanadas=2;
    }
    else if(num1!=2&&num1==num3&&num2!=num1&&num2!=2){
        monedasGanadas=2;
    }

    //Comparaciones 3 monedas
    else if(num1==2&&num2!=2&&num2==num3){
        monedasGanadas=3;
    }
    else if(num2==2&&num1!=2&&num1==num3){
        monedasGanadas=3;
    }
    else if(num3==2&&num2!=2&&num2==num1){
        monedasGanadas=3;
    }

    //Comparaciones 4 monedas
    else if(num1==2&&num2==2&&num3!=2){
        monedasGanadas=4;
    }
    else if(num2==2&&num3==2&&num1!=2){
        monedasGanadas=4;
    }
    else if(num1==2&&num3==2&&num2!=2){
        monedasGanadas=4;
    }

    //Comparación 5 monedas
    else if(num1!=2&&num2==num1&&num3==num1){
        monedasGanadas=5;
    }
    //Comparaciones 10 monedas
    else if(num1==2&&num2==2&&num3==2){
        monedasGanadas=10;
    }

    //Desbloquar botón y mostrar resultados de la jugada despues de la animación
    setTimeout(function(){
        document.getElementById('tirar').disabled=false;
        lista(monedas,monedasGanadas);
        mensajeMonedas(monedas);
    },3000);
    
    return monedasGanadas;
}

//------------------Función para añadir cada tirada a la lista-------------------

function lista(monedas,monedasGanadas){
    let lista=document.getElementById('lista');
    lista.innerHTML+='<li>Monedas: '+monedas+' | Ganadas: '+monedasGanadas+'</li>';
}