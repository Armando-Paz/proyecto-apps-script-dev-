// Compiled using apirest 1.0.0 (TypeScript 4.9.5)
const doGet = () =>
 HtmlService.createTemplateFromFile("frontend/index")
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .addMetaTag("viewport", 
        'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"')
        .setTitle("APMRSOFT");
const include = (ruta) => 
HtmlService.createHtmlOutputFromFile(ruta).getContent();

