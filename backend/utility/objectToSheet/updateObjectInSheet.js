// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
/**
 * updateObjectInSheet
 *
 * @param {object} props { id: string, datos: string, nameSheet: string, nameId: string }
 */
function updateObjectInSheet(props) {
    var id = props.id, datos = props.datos, nameSheet = props.nameSheet, nameId = props.nameId;
    var table = obtenerSheet(nameSheet);
    if (!table) {
        console.log("Error: la tabla no fue encontrada");
        return JSON.stringify(  {status: error(404,"Hoja "),data:null}); //404 hoja no existe
    }
    var headers = table.getDataRange().getValues().shift();
    var data = JSON.parse(findDataById({ nameSheet: nameSheet, id: id, nameId: nameId })).data;
    var numeroFila = data.row;
    if (!headers) {
        Logger.log("Error: No se encontraron los headers de la tabla");
        return JSON.stringify(  {status: error(404,"cabeceras "),data:null}); //404 cabeceras  no existe
    }
    for (var key in datos) {
        var numeroColumna = headers.indexOf(key) + 1;
        numeroColumna > 0 &&
            datos[key] &&
            table.getRange(numeroFila, numeroColumna).setValue(datos[key]);
    }
    return JSON.stringify(  {status: error(200,"Actualizado "),data:datos}); //created 
}
