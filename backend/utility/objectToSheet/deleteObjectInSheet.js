// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
/**
 * updateObjectInSheet
 *
 * @param {object} props { id: string,  nameSheet: string, nameId: string }
 */
function deleteObjectInSheet(props) {
    var id = props.id, nameSheet = props.nameSheet, nameId = props.nameId;
    var table = obtenerSheet(nameSheet);
    if (!table) {
        console.log("Error: la tabla no fue encontrada");
        // Logger.log("Error: la tabla no fue encontrada");
        return JSON.stringify(  {status: error(404,"Hoja "),data:null}); //404 hoja no existe
      }
    var data = JSON.parse(findDataById({ nameSheet: nameSheet, id: id, nameId: nameId })).data;
    table.deleteRow(data.row);
    return JSON.stringify(  {status: error(201,"Eliminado de Registro  "),data:data}); //created 
}
