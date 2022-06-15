let fs = require('fs');

let moduleJSON = JSON.parse(fs.readFileSync('./module.json', 'utf8'));

moduleJSON.name = "MaintenanceMode";
moduleJSON.title = "Maintenance Mode";

let dlLink = moduleJSON.download;
dlLink = dlLink.substring(0, dlLink.indexOf("download/"));
dlLink = dlLink + "download/" + moduleJSON.version + "/module.zip";
moduleJSON.download = dlLink;
//--
fs.writeFileSync('./module.json', JSON.stringify(moduleJSON), 'utf8');

console.log(moduleJSON.version);
