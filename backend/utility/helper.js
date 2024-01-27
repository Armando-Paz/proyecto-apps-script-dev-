
var globalStatus  =
{  Responsecodigos:  [
  {"code" : 100 , "message ":  "Continue",reference: "10.1.1"},
  {"code" : 101  ,"message" :  "Switching Protocols"},
  {"code" : 200  ,"message" :  "Ok"},
  {"code" : 201  ,"message" :  "Created"} ,
  {"code" : 202  ,"message" :  "Accepted"} ,
  {"code" : 203  ,"message" :  "Non-Authoritative Information" },
  {"code" : 204  ,"message" :  "No Content" },
  {"code" : 205  ,"message" :  "Reset Content"} ,
  {"code" : 206  ,"message" :  "Partial Content"} ,
  {"code" : 300  ,"message" :  "Multiple Choices"} ,
  {"code" : 301  ,"message" :  "Moved Permanently"} ,
  {"code" : 302  ,"message" :  "Encontrado" },
  {"code" : 303  ,"message" :  "See Other"} ,
  {"code" : 304  ,"message" :  "Not Modified" },
  {"code" : 305  ,"message" :  "Use Proxy"} ,
  {"code" : 307  ,"message" :  "Temporary Redirect"}, 
  {"code" : 400  ,"message" :  "Bad Request"} ,
  {"code" : 401  ,"message" :  "Unauthorized"} ,
  {"code" : 402  ,"message" :  "Payment Required"}, 
  {"code" : 403  ,"message" :  "Forbidden"} ,
  {"code" : 404  ,"message" :  "No Encontrado" },
  {"code" : 405  ,"message" :  "Method Not Allowed"}, 
  {"code" : 406  ,"message" :  "Not Acceptable"} ,
  {"code" : 407  ,"message" :  "Proxy Authentication Required"}, 
  {"code" : 408  ,"message" :  " Request Time-out"},
  {"code" : 409  ,"message" :  "Conflict"},
  {"code" : 410  ,"message" :  "Gone"},
  {"code" : 411  ,"message" :  "Length Required"},
  {"code" : 412  ,"message" :  "Precondition Failed"},
  {"code" : 413  ,"message" :  "Request Entity Too Large"},
  {"code" : 414  ,"message" :  "Request-URI Too Large"},
  {"code" : 415  ,"message" :  "Unsupported Media Type"},
  {"code" : 416  ,"message" :  "Requested range not satisfiable"},
  {"code" : 417  ,"message" :  "Expectation Failed"},
  {"code" : 500  ,"message" :  "Internal Server Error"},
  {"code" : 501  ,"message" :  "Not Implemented"},
  {"code" : 502  ,"message" :  "Bad Gateway"},
  {"code" : 503  ,"message" :  "Service Unavailable"},
  {"code" : 504  ,"message" :  "Gateway Time-out"},
  {"code" : 505  ,"message" :  "HTTP Version notsupported"}
]

}

function generarIdUnico2 () { 
    return 'nnnnnnnnnn-nnnn-7nnn-tnnn-Cnnnnnnnnnnnn'.replace(/[nt]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'n' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }); 
} 

function error(codeSearch, textPrevio,textPosterior){
  
  const  codigos=globalStatus.Responsecodigos; 

 
  const resulta= globalStatus.Responsecodigos.filter( (error) => error.code === codeSearch).map((x)=> x)

    resulta[0].message= (textPrevio===undefined? '':textPrevio)+' '+ resulta[0].message+ ' '+(textPosterior===undefined ? '':textPosterior);
     //console.log(JSON.stringify(resulta));
     var prueba=   JSON.stringify(resulta);
     //console.log(prueba);//return {resulta};
   var  error =   JSON.parse(prueba);
    // console.log(error[0].message);//return {resulta};
 //console.log(error[0].code);//
 return resulta[0];
  }
// Llamamos a la función 'generarIdUnico2()' 
function validarcc(){
console.log(generarIdUnico2()); 
}