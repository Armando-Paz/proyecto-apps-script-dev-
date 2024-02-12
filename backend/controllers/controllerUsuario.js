function registrarUsuario(usuario_id,usuario) {
    // desestructurando los datos de objeto usuario que esta recibiendo

   
        Logger.log("Prueba registrarUsuario:"+id)
        if (id==undefined){
            return  nuevoUsuario(usuario)
        }else{
     
           return actualizarUsuario(usuario_id,usuario)
        }
};

function listarUsuarios(id = undefined) {

    //const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
    //return obtenerDatos(env_().SH_REGISTRO_USUARIO);

   
    Logger.log(id);
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
    try {
        const {
            usuario_id = generarIdUnico2(),
            usuario_email,
            usuario_nombres,
            usuario_apellidos,
            // usuario_codigo_telefono,
            // usuario_numerotelefono,
            usuario_password,
            // usuario_aceptacontrato,
            // usuario_aceptacookies,
            // usuario_seguridad,
            // usuario_fotografia,
            // usuario_estado,
            // usuario_nacimiento,
            // usuario_edad 
        } = usuario;

        //var dta = JSON.parse(datosActualizar)
        //console.log(dta);
        var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": usuario_email, "nameId": "usuario_email" }
        //Logger.log(datosvalidar);
        const resulta = JSON.parse(findDataById(datosvalidar));
        var status = resulta.status;
        //Logger.log(resulta);
        if (status.code != 302) {
            //
            //Logger.log(env_().SH_REGISTRO_USUARIO);
            //Reemplazar por :
            // saveObjectInSheet(props) {
            const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
            sheetUsuarios.appendRow([
                usuario_id,
                usuario_email,
                usuario_nombres,
                usuario_apellidos,
                usuario_password
            ]
                // var datos2 = {
                //     "action": "saveObjectInSheet",
                //     "datos": {
                //         "usuario_id": generarIdUnico2(),
                //         "usuario_email": dta.usuario_email,
                //         "usuario_nombres": dta.usuario_nombres,
                //         "usuario_apellidos": dta.usuario_apellidos,
                //         "usuario_password": dta.usuario_password,
                //         "usuario_codigo_telefono": dta.usuario_codigo_telefono,
                //         "usuario_numerotelefono": dta.usuario_numerotelefono,
                //         "usuario_aceptacontrato": dta.usuario_aceptacontrato,
                //         "usuario_aceptacontrato": true,
                //         "usuario_aceptakookies": true,
                //         "usuario_seguridad": "",
                //         "usuario_fotografia": "",
                //     },
                //     "nameSheet": "usuarios"
                // }

                // resultado = saveObjectInSheet(datos2);
                // return (resultado);
            );
            Logger.log("despues de grabar");

            return {
                titulo: "Registro exitoso",
            }
        } else {
            return {
                titulo: "Registro no exitoso : email ya existe ",
            }
        }
    } catch (error) {
        return {
            titulo: "Ops ha ocurrido un error! " + error,
        }
    }
};
function actualizarUsuario(usuario_id,datosActualizar) {
    var dta = JSON.parse(datosActualizar)
    console.log(dta);
    var datosvalidar = { "action": "findDataById", "nameSheet": "usuarios", "id": usuario_id, "nameId": "usuario_id" }
    const resulta = JSON.parse(findDataById(datosvalidar));

    console.log(resulta);

    var datos = resulta.data;
    var status = resulta.status;

    Logger.log(datos.usuario_apellidos);
    console.log(status.code);
    console.log(status.message);
    console.log("====");
    if (status.code == 302) {
        var datos2 = {
            "action": "updateObjectInSheet",
            "id": dta.usuario_email,
            "datos": {
                "usuario_email": dta.usuario_email,
                "usuario_nombres": dta.usuario_nombres,
                "usuario_apellidos": dta.usuario_apellidos,
                "usuario_password": dta.usuario_password,
                "usuario_codigo_telefono": dta.usuario_codigo_telefono,
                "usuario_numerotelefono": dta.usuario_numerotelefono,
                "usuario_aceptacontrato": dta.usuario_aceptacontrato,
                "usuario_aceptacontrato": true,
                "usuario_aceptakookies": true,
                "usuario_seguridad": "",
                "usuario_fotografia": "",
            },
            "nameId": "usuario_email",
            "nameSheet": "usuarios"
        }

        resultado = updateObjectInSheet(datos2);
        console.log(resultado);
        return (resultado);



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