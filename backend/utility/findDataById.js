// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
/**
 * findDataById
 *
 * @param {Object} props {nameSheet, id, nameId }
 * @return {Object} objeto con la informacion necesaria
 */
function findDataById(props) {
    var nameSheet = props.nameSheet;
    var id = props.id;
    var nameId = props.nameId;
    var sheet = obtenerSheet(nameSheet);

    var data;
   Logger.log("findDataByID");
   Logger.log(props);

    if (sheet) {
        data = sheet.getDataRange().getValues();
    }
    else {
        return JSON.stringify(  {status: error(404,"Hoja "),data:null}); //404 hoja no existe
    }
    if (id && nameId) {
        sheet.getDataRange().getValues();
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
    /*Logger.log(resultado);*/
    // Filtrar si se pasa un id
  

        const matchrow=resultado.find(function (dato) { return dato[nameId] == id; })
        const match = matchrow ? matchrow: null;
        //match ? "302" : "204",
        //Logger.log(matchrow);
        return JSON.stringify({
            status:error( (match ? 302 : 404),'Registro'), //302 found //404 not found
            data: match
        });
    } else{
    return JSON.stringify({
        status: error(206,'id & nameId'), //206 partial Contents
    
       data: null
    });
    }
}


  function validarfindDataById(){
 
 var datossearch= {    "action" : "findDataById",    "nameSheet": "usuarios",    "id" : "amantari@bbva.com.pe",  "nameId":"usuario_email"    }
  var resulta= JSON.parse(findDataById(datossearch)); 
 // console.log(resulta);
   const mensaje=resulta.status;
   const datos=resulta.data;
 console.log(mensaje);
  console.log(datos);

  }
