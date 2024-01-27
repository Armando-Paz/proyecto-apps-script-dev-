function RegistrarUsuario(usuario) {
    // desestructurando los datos de objeto usuario que esta recibiendo
    Logger.log(usuario);
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
        Logger.log(datosvalidar);
        const resulta = JSON.parse(findDataById(datosvalidar));
        var status =resulta.status;
        Logger.log(resulta);
        if (status.code != 302) {
            Logger.log(env_().SH_REGISTRO_USUARIO);
            const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
            sheetUsuarios.appendRow([
                usuario_id,
                usuario_email,
                usuario_nombres,
                usuario_apellidos,
                usuario_password
            ]
            );
            Logger.log("despues de grabar");

            return {
                titulo: "Registro exitoso",
            }
        }else{
            return {
                titulo: "Registro no exitoso : email ya existe ",
            }
        }
    } catch (error) {
        return {
            titulo: "Ops ha ocurrido un error! " + error,
        }
    }



}