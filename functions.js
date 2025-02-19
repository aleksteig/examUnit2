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

const listOfFunctions = [
    
    function squareNumber(num){

        if(typeof(num) != "number"){
            return "NaN";
        }

        return num**2;
    },

    function inchesToMillimeters(num){

        if(typeof(num) != "number"){
            return "NaN";
        }

        return num * 25.4;
    },

    function rootOfNumber(num){
    
        if(typeof(num) != "number"){
            return "NaN";
        }

        if(num < 0){
            return undefined;
        }

        return Math.sqrt(num);
    },
    
    function cubeNumber(num){

        if(typeof(num) != "number"){
            return "NaN";
        }

        return num**3;
    },

    function areaOfCircleGivenRadius(rad){

        if(typeof(rad) != "number"){
            return "NaN";
        }

        return Math.PI * (rad ** 2);
    },

    function greetingGivenName(name){
        if(typeof(name) != "string"){
            return "Only string for this function";
        } else {
            return `Hello ${name}`
        }
    },
]

const acceptedFnNames = ["square", "inchToMm", "root", "cube", "circle", "greeting"];

function pickFromFunctionList(arg, fnName){
    
    let counterForNotInAcceptedNames = 0;

    if(typeof(arg) == "string"){
        if(fnName != "greeting"){
            return "Use function name 'greeting' if you want to use strings"
        } else {
            return listOfFunctions[5](arg);
        }
    }

    for(let i = 0; i < acceptedFnNames.length; i++){
        if(fnName == acceptedFnNames[i]){
            return listOfFunctions[i](arg);
        } else {
            counterForNotInAcceptedNames += 1;
        }
    }

    if(counterForNotInAcceptedNames >= 5){
        return "The only accepted function names are: " + acceptedFnNames;
    }
}

console.log(pickFromFunctionList(Infinity, "greeting"));
