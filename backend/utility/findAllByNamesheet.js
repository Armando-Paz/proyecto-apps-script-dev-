// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
/**
 * findAllByNamesheet
 *
 * @param {Object} props nombre de la tabla de la base de datos
 * @return {Object} objeto con la informacion necesaria
 */
function findAllByNamesheet(props) {
    var nameSheet = props.nameSheet;
    var sheet = obtenerSheet(nameSheet);
    Logger.log("findAllByNamesheet:resolviendo");
    var data;
    if (!sheet)
        return JSON.stringify({
            status: "failed",
            message: "No se encontro la sheet"
        });
    data = sheet.getDataRange().getValues();

    var header = data.shift();
    
    // Buscar todo
    var resultado = data.map(function (row, indx) {
        var reduced = header.reduce(function (accumulator, currentValue, currentIndex) {
            accumulator[currentValue] = row[currentIndex];
            return accumulator;
        }, {});
        reduced.row = indx + 2;
        return reduced;
    });
    //Logger.log(resultado);
    return JSON.stringify({
        status: "ok",
        message: "Resultados encontados",
        data: resultado
    });
}
