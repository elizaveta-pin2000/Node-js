const _ = require('lodash');
const ut = require('./ut00');

const groupName = 'ПИб-1';

function getAverageAge(groupName) {
    const groupId = ut.getGroupId(groupName);
    const studentsAge =  ut.csv_to_json('./csv/students.csv')
        .filter(s => s.idGr === groupId)
        .map(s => +s.age);

    console.log(_.sum(studentsAge) /  studentsAge.length)
}


getAverageAge(groupName)
