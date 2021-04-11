const _ = require('lodash');
const ut = require('./ut00');

const students = ut.csv_to_json('./csv/students.csv');

console.log(_.sum(students.map(s => +s.age)) / students.length);