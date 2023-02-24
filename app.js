//variables Globales

const formularioDOM = document.getElementById("formulario")
//const btnverconsultas =document.getElementById("btnverconsultas")
const listaPacientesDOM = document.getElementById("listaPacientesG")
const ArraylistaPacientes = JSON.parse(localStorage.getItem('listando')) || [];



//funciones

const CrearPasciente = (nombre,apellido,edad,email,celular,mensaje) => {

    const pacientes ={
    
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    email: email,
    celular: celular,
    //sexo: sexo,
    mensaje: mensaje,
    estado: false
    }
    ArraylistaPacientes.push(pacientes)
    console.log('se guardo en el array')
    swal("CONSULTA ENVIADA", "Gracias por consultar", "success", {
        button: "Continuar",
        });
    return pacientes;
    
}

const GuardarDP = () => {
    localStorage.setItem('listando',JSON.stringify(ArraylistaPacientes));
    listandoDP()
}

const listandoDP = () => {
    listaPacientesDOM.innerHTML ='';
    
    if(ArraylistaPacientes === null){
        ArraylistaPacientes = [];
    }else{
       
        ArraylistaPacientes.forEach(pacient => {
        listaPacientesDOM.innerHTML += 
            `<form class=" row mb-4"  name="formu"><div class="col-4  text-start"><h3> Nombre: ${pacient.nombre}, ${pacient.apellido}, Edad: ${pacient.edad}</h3><p>Email: ${pacient.email} Celular: ${pacient.celular}</p></div><div class="col-7 text-start"><b>Mensaje: ${pacient.mensaje}</b> - ${pacient.estado}</div><div class="col-1 d-flex flex-row-reverse align-self-center " ><span class="float-right"><span class="material-icons">check</span><span class="material-icons">cancel</span></span></div></form> `

        //  else{
        //     listaPacientesDOM.innerHTML += 
        //     `<form class="formi row mb-4"  name="formu"><div class="col-4  text-start"><h3> Nombre: ${pacient.nombre}, ${pacient.apellido}, Edad: ${pacient.edad}</h3><p>Email: ${pacient.email} Celular: ${pacient.celular}</p></div><div class="col-7 text-start"><b>Mensaje: ${pacient.mensaje}</b> - ${pacient.estado}</div><div class="col-1 d-flex flex-row-reverse align-self-center " ><span class="float-right"><span class="material-icons">check</span><span class="material-icons">cancel</span></span></div></form> `
        // } 

            
        });
    }
}

///PARA ELIMINAR

const eliminarDP = (mensaje) => {
    //console.log(mensaje)
    let indexArray;
    ArraylistaPacientes.forEach((elemento, index) => {
        //console.log(index)
        if(elemento.mensaje === mensaje){
            indexArray=index;
            
        }
        //console.log(ArraylistaPacientes[index])
    })
    
    ArraylistaPacientes.splice(indexArray,1)
    GuardarDP();
    swal("MENSAJE ELIMINADO","" ,"error",{button: "Continuar",});
    
    
}

//PARA EDITAR
// const EditarDP = (mensaje) => {
    
//     let indexArray =  ArraylistaPacientes.findIndex((element) =>{
//         return element.mensaje === mensaje});
//         ArraylistaPacientes[indexArray].estado =true
        
    
//     GuardarDP();
// }
//console.log(ArraylistaPacientes[pacient.estado])

//eventlistener
  //guardando pacientes
formularioDOM.addEventListener('submit', (e) => {

    e.preventDefault();
    
    const nombreDOM = document.getElementById("nombre").value;//toUpperCase
    const apellidoDOM = document.getElementById("apellido").value;
    const edadDOM = document.getElementById("edad").value;
    const emailDOM = document.getElementById("email").value;
    const celularDOM = document.getElementById("celular").value;
    //const impsexo = document.getElementById("sexo").value;
    const mensajeDOM = document.getElementById("mensaje").value;
    
    CrearPasciente(nombreDOM,apellidoDOM,edadDOM,emailDOM,celularDOM,mensajeDOM);
GuardarDP();
formularioDOM.reset();

})

document.addEventListener('DOMContentLoaded', listandoDP);

listaPacientesDOM.addEventListener('click', (e) => {
    e.preventDefault();
    //console.log(e)
    //console.log(e.target.offsetParent.childNodes[0].innerHTML)
    //console.log(e.target.offsetParent.childNodes[1].innerHTML);//[] [1].innerHTML
    //if(e.target.innerHTML === 'cancel'|| e.target.innerHTML === 'check') 
    //{
    const msn = e.target.offsetParent.childNodes[1].innerHTML;
    //const otr = e.target.offsetParent.childNodes[0].innerHTML;
    
        if (e.target.innerHTML === 'cancel'){

            console.log('accion de eliminar');
            eliminarDP(msn);
            
            
        }
        else if (e.target.innerHTML === 'check') {
           
            console.log('accion del check');
            //EditarDP(msn);
        
        }
        
    //} 

})
