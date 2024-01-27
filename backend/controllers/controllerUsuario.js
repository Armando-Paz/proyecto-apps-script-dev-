function guardarUsuario(usuario) {
    // desestructurando los datos de objeto usuario que esta recibiendo
    Logger.log(usuario);
    try {
        const { 
            //usuario_id,
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
        const sheetUsuarios = obtenerSheet(env_().SH_REGISTRO_USUARIO);
        sheetUsuarios.appendRow([
         
            usuario_nombres,
            usuario_apellidos,
            usuario_email,
            usuario_password]
        );

        return {
            titulo:"Registro exitoso",
        }
    } catch (error) {
        return {
            titulo:"Ops ha ocurrido un error! " +error,
        }
    }
   


}