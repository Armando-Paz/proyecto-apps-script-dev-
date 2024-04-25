function registrarOrdenIngreso(ordenIngreso_id,ordenIngreso) {
    // desestructurando los datos de objeto ordenIngreso que esta recibiendo

   
        console.log("registrarOrdenIngreso:"+ordenIngreso_id);
        console.log("registrarOrdenIngreso:",ordenIngreso);
        if (ordenIngreso_id==undefined|ordenIngreso_id==null){
            return  nuevoOrdenIngreso(ordenIngreso)
        }else{ 
     
           return actualizarOrdenIngreso(ordenIngreso_id,ordenIngreso)
        }
};

function listarUsuarios(id = undefined) {

    //const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
    //return obtenerDatos(env_().SH_REGISTRO_USUARIO);

   
    Logger.log("listarUsuarios:",id);
    if (id){
        //var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios" }
        var datossearch= {    "action" : "findDataById",    "nameSheet": "usuarios",    "id" : id,  "nameId":"ordenIngreso_id"    }

        const resulta = JSON.parse(findDataById(datossearch));
        return resulta;
    }else{
        var datosvalidar = { "action": "findAllByNamesheet", "nameSheet": "usuarios" }
        const resulta = JSON.parse(findAllByNamesheet(datosvalidar));
        return resulta;
    }
    
    //var status = resulta.status;
   // Logger.log(resulta);

    

};
function nuevoOrdenIngreso(ordenIngreso)
{
    console.log("nuevoOrdenIngreso:",ordenIngreso);
    try {
        // const {
        //     ordenIngreso_id = generarIdUnico2(),
        //     usuario_email,
        //     usuario_nombres,
        //     usuario_apellidos,
        //     // usuario_codigo_telefono,
        //     // usuario_numerotelefono,
        //     usuario_password,
        //     // usuario_aceptacontrato,
        //     // usuario_aceptacookies,
        //     // usuario_seguridad,
        //     // usuario_fotografia,
        //     // usuario_estado,
        //     // usuario_nacimiento,
        //     // usuario_edad 
        // } = ordenIngreso;

        var dta = JSON.parse(ordenIngreso)
        console.log(dta);
        var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": dta.usuario_email, "nameId": "usuario_email" }
        console.log("nuevoUsuario_datosvalidar:",datosvalidar);
        const resulta = JSON.parse(findDataById(datosvalidar));
        var status = resulta.status;
        console.log("nuevoUsuario_resulta:",resulta);
        if (status.code != 302) {
            //
            //Logger.log(env_().SH_REGISTRO_USUARIO);
            //Reemplazar por :
            // saveObjectInSheet(props) {
            // const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
            // sheetUsuarios.appendRow([
            //     ordenIngreso_id,
            //     usuario_email,
            //     usuario_nombres,
            //     usuario_apellidos,
            //     usuario_password
            // ]
                var datos2 = {
                    "action": "saveObjectInSheet",
                    "datos": {
                        "ordenIngreso_id": generarIdUnico2(),
                        "usuario_email": dta.usuario_email,
                        "usuario_nombres": dta.usuario_nombres,
                        "usuario_apellidos": dta.usuario_apellidos,
                        "usuario_password": dta.usuario_password,
                       // "usuario_codigo_telefono": ordenIngreso.usuario_codigo_telefono,
                       // "usuario_numerotelefono": ordenIngreso.usuario_numerotelefono,
                        //"usuario_aceptacontrato": ordenIngreso.usuario_aceptacontrato,
                        "usuario_aceptacontrato": true,
                        "usuario_aceptakookies": true,
                        "usuario_seguridad": "",
                        "usuario_fotografia": "",
                    },
                    "nameSheet": "usuarios"
                }

                resultado = saveObjectInSheet(datos2);
                //return (resultado);
          
            console.log("nuevoOrdenIngreso:","despues de grabar");

            return {
                titulo: "Registro exitoso",
            }
        } else {
            return {
                titulo: "Registro no exitoso : email ya existe ",
                descripcion : status.code
            }
        }
    } catch (error) {
        return {
            titulo: "Ops ha ocurrido un error! " + error,
        }
    }
};
function actualizarOrdenIngreso(ordenIngreso_id,datosActualizar) {

    console.log("actualizarOrdenIngreso:",ordenIngreso_id,datosActualizar);

   var dta = JSON.parse(datosActualizar)
    console.log("actualizarOrdenIngreso 2:",dta);
    var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": ordenIngreso_id, "nameId": "ordenIngreso_id" }
    const resulta = JSON.parse(findDataById(datosvalidar));

    console.log("actualizarUsuario_REsultado:",resulta.data);

    var datos = resulta.data;
    var status = resulta.status;

    console.log(datos.usuario_apellidos);
    console.log("status.code",status.code,status.message);
     console.log("====");
    if (status.code == 302) {
        var datos2 = {
            "action": "updateObjectInSheet",
            "id": ordenIngreso_id,
            "datos": {
                "usuario_email": dta.usuario_email,
                "usuario_nombres": dta.usuario_nombres,
                "usuario_apellidos": dta.usuario_apellidos,
                "usuario_password": dta.usuario_password,
                "usuario_codigo_telefono": 51,
                "usuario_numerotelefono": 986048057,
                "usuario_aceptacontrato": true,
                "usuario_aceptakookies": true,
                "usuario_seguridad": "",
                "usuario_fotografia": "",
            },
            "nameId": "ordenIngreso_id",
            "nameSheet": "usuarios"
        }
        console.log("actualizarUsuario_datos2:",datos2);
        resultado = updateObjectInSheet(datos2);
        console.log("actualizarUsuario_resultado:",resultado);
        return {
            titulo: "actualizacion exitosa",
        };



    }
    else {
        return JSON.stringify({ status: error(404, "", "No se puede actualizar"), data: datos }); //404 datos no existen

    }

};
function eliminar(datosEliminar) {
    var dta = JSON.parse(datosEliminar)
    console.log(dta);
    var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": dta.usuario_email, "nameId": "usuario_email" }
    const resulta = JSON.parse(findDataById(datosvalidar));

    console.log(resulta);

    var datos = resulta.data;
    var status = resulta.status;


    console.log(status.code);
    console.log(status.message);
    console.log("====");
    if (status.code == 302) {
        var datos2 = {
            "action": "deleteObjectInSheet",
            "id": dta.usuario_email,
            "nameId": "usuario_email",
            "nameSheet": "usuarios"
        }

        resultado = deleteObjectInSheet(datos2);
        console.log(resultado);
        return (resultado);



    }
    else {
        return JSON.stringify({ status: error(404, "", "No se puede Eliminar"), data: datos }); //404 datos no existen

    }

};
function enviarEmailValidacion()
{
    const destinatario ="amantari@gmail.com";
    const copiacc ="amantari@outlook.com";
    const asunto="Validacion de Email";
    const cuerpo="";
    
    var htmlBody= HtmlService.createTemplateFromFile('config/plantilla1.html')
    htmlBody.tickets = destinatario;
  htmlBody.datetime = '2024-04-13';
  htmlBody.cc = copiacc;
  htmlBody.held_under = destinatario;
  var email_html = htmlBody.evaluate().getContent();
  
        
        MailApp.sendEmail({
            to: destinatario,
            subject:asunto,
            htmlBody:email_html
            }
    );
};
function confirmarEmail()
{
    const destinatario ="amantari@gmail.com";
    const asunto="Validacion de Email";
    const cuerpo="Buenos Dias armando /n Validando tu email";
    MailApp.sendEmail(destinatario,asunto,cuerpo);
};