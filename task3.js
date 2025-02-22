// Task 3

import fs from 'fs';
import test from './test.mjs';

const data = fs.readFileSync('example_files/nodes.json', { encoding: 'utf8', flag: 'r' });

function sumFullStructure(src){
    let stringifiedSource = src.toString();
    
    let test = "";
    let sumOfStructure = 0;

    for(let i = 0; i < stringifiedSource.length; i++){
        if(Number.isInteger(parseInt(stringifiedSource[i]))){
            test += stringifiedSource[i];
        } else if (!Number.isInteger(parseInt(stringifiedSource[i])) && Number.isInteger(parseInt(stringifiedSource[i-1]))){
            sumOfStructure += (+test);
            test = "";
        }
    }

    console.log(test);
    return sumOfStructure;
}

function deepestLevel(src){
    let stringifiedSource = src.toString();
    
    let currentLevel = 0;
    let highestLevel = 0;

    for(let i = 0; i < stringifiedSource.length; i++){
        if(stringifiedSource[i] == "{"){
            currentLevel += 1;
            if(currentLevel > highestLevel){
                highestLevel = currentLevel;
            }
        } else if(stringifiedSource[i] == "}"){
            currentLevel -= 1;
        }
    }

    return highestLevel;
}

function numberOfNodes(src){
    let stringifiedSource = src.toString();
    
    let nodes = 0;
    
    for(let i = 0; i < stringifiedSource.length; i++){
        if(stringifiedSource[i] == "{"){
            nodes += 1;
        }
    }

    return nodes;
}

function nodesStats(){
    let fullStructureSum = sumFullStructure(data);
    let deepestLevelReached = deepestLevel(data);
    let amountOfNodes = numberOfNodes(data);
    return "The sum of the full structure is " + fullStructureSum + ", the deepest level of the structure is " + deepestLevelReached + " and the amount of nodes is " + amountOfNodes + ".";
}

console.log(nodesStats());

//#region Tests ---------------------------------------------------------------------------------------------------------------------

const tests = test("Cave diving functions");

const testData = `{
    "value": 328,
    "left": null,
    "right": {
        "value": 278,
        "left": null,
        "right": {
            "value": 983,
            "left": {
                "value": 924,
                "left": {
                    "value": 269,
                    "left": {
                        "value": 558,
                        "left": {
                            "value": 571,
                            "left": null,
                            "right": {
                                "value": 241,
                                "left": null,
                                "right": null
                            }
                        },
                        "right": null
                    },
                    "right": null
                },
                "right": null
            },
            "right": {
                "value": 912,
                "left": null,
                "right": {
                    "value": 438,
                    "left": {
                        "value": 977,
                        "left": null,
                        "right": {
                            "value": 119,
                            "left": null,
                            "right": {
                                "value": 410,
                                "left": null,
                                "right": {
                                    "value": 97,
                                    "left": null,
                                    "right": {
                                        "value": 906,
                                        "left": null,
                                        "right": null
                                    }
                                }
                            }
                        }
                    },
                    "right": {
                        "value": 971,
                        "left": null,
                        "right": {
                            "value": 441,
                            "left": null,
                            "right": null
                        }
                    }
                }
            }
        }
    }
}`;

// Valid inputs
tests.isEqual(sumFullStructure(testData), 9423, "As the sum of the structure of the testData constant is 9423, the function should return as 9423");
tests.isEqual(deepestLevel(testData), 10, "As the deepest level reached in the testData constant is level 10, the function should return as 10");
tests.isEqual(numberOfNodes(testData), 17, "As the number of nodes in the testData constant is 17, the function should return as 17");


//#endregion