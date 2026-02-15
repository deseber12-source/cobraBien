function calcDescuento(){

let saldo=document.getElementById("saldo").value;

let desc=document.getElementById("descuento").value;

let fecha=document.getElementById("fecha").value;

let total=saldo*(1-desc/100);

let mensaje=`Hola, su saldo es $${saldo}.

Con descuento del ${desc}% pagaría $${total}.

Válido hasta ${fecha}.`;

document.getElementById("resultado").value=mensaje;

}



function generarScript(){

let asesor=document.getElementById("asesor").value;

let cliente=document.getElementById("cliente").value;

let apellido=document.getElementById("apellido").value;

let empresa=document.getElementById("empresa").value;

let despacho=document.getElementById("despacho").value;

let monto=document.getElementById("monto").value;

let fecha=document.getElementById("fecha_pago").value;


let script=`Buenas tardes ${cliente} ${apellido}.

Le habla ${asesor} de ${despacho}, representando a ${empresa}.

Motivo de llamada es su saldo pendiente.

(ESCUCHAR CLIENTE)

NOTA ASESOR: ya debes tener abierta la calculadora.

Cliente pagará $${monto} el ${fecha}.

Se confirma acuerdo y se envía WhatsApp.`;

document.getElementById("script").value=script;

}



function copiar(id){

navigator.clipboard.writeText(

document.getElementById(id).value

);

alert("Copiado");

}



function enviarWA(id){

let text=document.getElementById(id).value;

window.open(

`https://wa.me/?text=${encodeURIComponent(text)}`

);

}



function sugerencia(){

window.open(

"https://wa.me/5210000000000?text=Sugerencia"

);

}



function abrirCalc(){

document.getElementById("calculadora")

.scrollIntoView();

}



function toggleDark(){

document.body.classList.toggle("dark");

}
