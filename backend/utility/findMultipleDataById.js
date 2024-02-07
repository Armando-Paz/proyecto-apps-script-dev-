// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
/**
 * findMultipleDataById
 * @param {Object} props { nameSheet: string, id: string, nameId: string }
 * @return {Object} objeto con la informacion necesaria
 */
function findMultipleDataById(props) {
    var nameSheet = props.nameSheet, id = props.id, nameId = props.nameId;
    var sheet = obtenerSheet(nameSheet);
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
    // Filtrar si se pasa un id
    if (id) {
        return JSON.stringify({
            status: "ok",
            message: "Resultados encontados",
            data: resultado.filter(function (dato) { return dato[nameId] == id; })
        });
    }
    return JSON.stringify({
        status: "ok",
        message: "Resultados encontados",
        data: resultado
    });
}
