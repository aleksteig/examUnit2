// Task 2

import fs from 'fs';
import test from './test.mjs';

const data = fs.readFileSync('example_files/arrays.json', { encoding: 'utf8', flag: 'r' });

function flattenNumbersInList(src){
    let stringifiedSource = src.toString();
    
    let test = "";
    let newListOfNumbers = [];

    for(let i = 0; i < stringifiedSource.length; i++){

        if(stringifiedSource[i] != !/^[0-9]*$/ && stringifiedSource[i] != "," && stringifiedSource[i] != "[" && stringifiedSource[i] != "]"){
            test += stringifiedSource[i];
        }

        if(stringifiedSource[i] == "0"){
            test += stringifiedSource[i];
        }

        if(stringifiedSource[i] == "," && typeof(parseInt(stringifiedSource[i-1])) == "number"){
            if(typeof(test) == "string"){
                parseInt(test);
                newListOfNumbers.push(test);
                test = "";
            } 
        } else if (stringifiedSource[i+1] == undefined){
            if(typeof(test) == "string"){
                parseInt(test);
                newListOfNumbers.push(test);
                test = "";
            } 
        }
    }

    return newListOfNumbers;
}

console.log(flattenNumbersInList(data));


//#region Tests ---------------------------------------------------------------------------------------------------------------------

const tests = test("Flatten numbers function");

let newRandomList1 = [1, 23, 45, 78, 91, 2, 54, 8, 0, 91];
let result1 = [1, 23, 45, 78, 91, 2, 54, 8, 0, 91];
let newRandomList2 = [1, 23, 45, [78, 91, 2], 54, 8, 0, 91];
let result2 = [1, 23, 45, 78, 91, 2, 54, 8, 0, 91];
let newRandomList3 = [[1, [23, 45], 78], 91, 2, 54, 8, 0, 91];
let result3 = [1, 23, 45, 78, 91, 2, 54, 8, 0, 91];

// Valid inputs
tests.isListEqual(flattenNumbersInList(newRandomList1), result1, "The list should return as a list that just lists out the number in one list rather than multiple if multiple are given")
tests.isListEqual(flattenNumbersInList(newRandomList2), result2, "The list should return as a list that just lists out the number in one list rather than multiple if multiple are given")
tests.isListEqual(flattenNumbersInList(newRandomList3), result3, "The list should return as a list that just lists out the number in one list rather than multiple if multiple are given")

//#endregion
