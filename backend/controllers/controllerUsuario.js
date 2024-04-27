function registrarUsuario(usuario_id,usuario) {
    // desestructurando los datos de objeto usuario que esta recibiendo

   
        console.log("registrarUsuario:"+usuario_id);
        console.log("registrarUsuario:",usuario);
        if (usuario_id==undefined|usuario_id==null){
            return  nuevoUsuario(usuario)
        }else{ 
     
           return actualizarUsuario(usuario_id,usuario)
        }
};

function listarUsuarios(id = undefined) {

    //const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
    //return obtenerDatos(env_().SH_REGISTRO_USUARIO);

   
    Logger.log("listarUsuarios:",id);
    if (id){
        //var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios" }
        var datossearch= {    "action" : "findDataById",    "nameSheet": "usuarios",    "id" : id,  "nameId":"usuario_id"    }

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
function nuevoUsuario(usuario)
{
    console.log("nuevoUsuario:",usuario);
    try {
        // const {
        //     usuario_id = generarIdUnico2(),
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
        // } = usuario;

        var dta = JSON.parse(usuario)
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
            //     usuario_id,
            //     usuario_email,
            //     usuario_nombres,
            //     usuario_apellidos,
            //     usuario_password
            // ]
                var datos2 = {
                    "action": "saveObjectInSheet",
                    "datos": {
                        "usuario_id": generarIdUnico2(),
                        "usuario_email": dta.usuario_email,
                        "usuario_nombres": dta.usuario_nombres,
                        "usuario_apellidos": dta.usuario_apellidos,
                        "usuario_password": dta.usuario_password,
                       // "usuario_codigo_telefono": usuario.usuario_codigo_telefono,
                       // "usuario_numerotelefono": usuario.usuario_numerotelefono,
                        //"usuario_aceptacontrato": usuario.usuario_aceptacontrato,
                        "usuario_aceptacontrato": true,
                        "usuario_aceptakookies": true,
                        "usuario_seguridad": "",
                        "usuario_fotografia": "",
                    },
                    "nameSheet": "usuarios"
                }

                resultado = saveObjectInSheet(datos2);
                //return (resultado);
          
            console.log("nuevoUsuario:","despues de grabar");

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
function actualizarUsuario(usuario_id,datosActualizar) {

    console.log("actualizarUsuario:",usuario_id,datosActualizar);

   var dta = JSON.parse(datosActualizar)
    console.log("actualizarUsuario 2:",dta);
    var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": usuario_id, "nameId": "usuario_id" }
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
            "id": usuario_id,
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
            "nameId": "usuario_id",
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
function validarLogin(login_email,datosValidar) {
    var dta = JSON.parse(datosValidar)
    console.log("datosValdiar:",datosValidar);
    console.log("login_email:",login_email);
   
    var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": dta.login_email, "nameId": "usuario_email" }
    const resulta = JSON.parse(findDataById(datosvalidar));

    console.log(resulta);

    var datos = resulta.data;
    var status = resulta.status;


    console.log(status.code);
    console.log(status.message);
    console.log("====");
    if (status.code == 302) {

        if(dta.login_password == resulta.data.usuario_password){
            console.log("password correcto");
            var datos2 = {
                "action": "updateObjectInSheet",
                "id": dta.login_email,
                "nameId": "usuario_email",
                "nameSheet": "usuarios",
                datosActualizar:{
                    "usuario_ultimoingreso": "2024-04-25",
                    "usuario_hora" :"02:46",
                    "usuario_aceptacontrato":"falso"
                }
            }
            resultado = updateObjectInSheet(datos2);


            console.log("resultado:",resultado);
      
            //return JSON.stringify({ status: error(200, "", "ingreso ok"), data: datosValidar }); //404 datos no existen
            return {
                titulo: "ingreso permitidoo ",
                descripcion : status.code
            }

        }else{
            return {
                titulo: "usuario o password errado ",
                descripcion : status.code
            }
           // return JSON.stringify({ status: error(401, "", "usuario o password errado"), data: datosValidar }); //404 datos no existen
        }
    }
    else {
        // return JSON.stringify({ status: error(404, "", "No se puede Ingresar"), data: datos }); //404 datos no existen
        return {
            titulo: "ingreso no permitido ",
            descripcion : status.code
        }

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