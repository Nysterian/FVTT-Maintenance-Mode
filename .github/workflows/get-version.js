let fs = require('fs');

let moduleJSON = JSON.parse(fs.readFileSync('./module.json', 'utf8'))
moduleJSON.name = "MaintenanceMode"
moduleJSON.title = "Maintenance Mode"
fs.writeFileSync('./module.json', moduleJSON, 'utf8')

console.log(moduleJSON.version);
