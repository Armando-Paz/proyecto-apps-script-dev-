// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
/**
 * saveObjectInSheet
 * @param {object} props { data: string, nameSheet: string }
 * @returns {object}
 */
function saveObjectInSheet(props) {
    var datos = props.datos, nameSheet = props.nameSheet;
    var table = obtenerSheet(nameSheet);
    if (!table) {
       // Logger.log("Error: la tabla no fue encontrada");
             return JSON.stringify(  {status: error(404,"Hoja "),data:null}); //404 hoja no existe
    }
    var headers = table.getDataRange().getValues().shift();
    if (!headers) {
        //Logger.log("Error: No se encontraron los headers de la tabla");
        return JSON.stringify(  {status: error(404,"cabeceras "),data:null}); //404 cabeceras  no existe
    }
    var nuevaFila = ordenarArray_(datos, headers);
    table.appendRow(nuevaFila);
    return JSON.stringify(  {status: error(201,"Registro "),data:datos}); //created 
}
function ordenarArray_(data, headers) {
    var arregloOrdenado = [];
    for (var posicion = 0; posicion < headers.length; posicion++) {
        var value = data[headers[posicion]];
        arregloOrdenado[posicion] = value;
    }
    return arregloOrdenado;
}
