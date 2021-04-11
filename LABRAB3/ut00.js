const fs = require('fs');
const csvjson = require('csvjson'); 


function csv_to_json(nameFile, del = ',') {
    let textCSV = fs.readFileSync(nameFile, 'utf-8');
    return csvjson.toObject(textCSV, { delimiter: del });
}

function getAdultStudents() {
    return csv_to_json('./csv/students.csv')
        .filter(s => s.age > 17);
}

function getGroupId(groupName) {
    return csv_to_json('./csv/groups.csv')
        .find(g => g.nameGr === groupName)['﻿id'];
}

function getIdCurator(curName) {
    return csv_to_json('./csv/curators.csv')
        .find(g => g.nameCur === curName)['﻿id'];
}

module.exports.csv_to_json = csv_to_json;
module.exports.getAdultStudents = getAdultStudents;
module.exports.getGroupId = getGroupId;
module.exports.getIdCurator = getIdCurator;