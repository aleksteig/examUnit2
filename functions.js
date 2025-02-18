/*
Tasks:
Create the following functions:
- A function that returns the square of a number
- A function that returns a length in mm assuming it has been given a length in inches.
- A function that returns the root of a number
- A function that returns the cube of a number
- A function that returns the area of a circle given the radius.
- A function that returns a greeting, given a name.
*/
const listOfFunctions = {
    
    function1: function squareNumber(num){
        return num**2;
    },

    function2: function inchesToMillimeters(num){
        return num * 25.4;
    },

    function3: function rootOfNumber(num){
    
        if(num < 0){
            return undefined;
        }
    
        return Math.sqrt(num);
    },
    
    function4: function cubeNumber(num){
        return num**3;
    },

    function5: function areaOfCircleGivenRadius(rad){
        return Math.PI * (rad ** 2);
    },

    function6: function greetingGivenName(name){
        if(typeof(name) != "string"){
            return console.log("Only string for this function");
        } else {
            return `Hello ${name}`
        }
    },
}

const acceptedFnNames = ["square", "inchToMm", "root", "cube", "circle", "greeting"];

function pickFromFunctionList(arg, fnName){
    
    if(typeof(arg) == "string"){
        return listOfFunctions.function6(arg);
    }

    let id = null;
    for(let i = 0; i < acceptedFnNames.length; i++){
        if(fnName == acceptedFnNames[i]){
            id = i;
        }
    }

    if(id == 0){
        return listOfFunctions.function1(arg);
    } else if (id == 1) {
        return listOfFunctions.function2(arg);
    } else if (id == 2) {
        return listOfFunctions.function3(arg);
    } else if (id == 3) {
        return listOfFunctions.function4(arg);
    } else if (id == 4) {
        return listOfFunctions.function5(arg);
    } else {
        return console.log("The only accepted function names are: " + acceptedFnNames)
    }

}

console.log(pickFromFunctionList(7, "greeting"));

//console.log(fnIDs[0]);
