// Task 1

import test from "./test.mjs";

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

        if(num == Infinity){
            return Infinity;
        }

        if(num < 0){
            return undefined;
        }

        let x,
        x1 = num / 2;
          
        do {
            x = x1;
            x1 = (x + (num / x)) / 2;
        } while (x !== x1);
        return x;
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

        return 3.14 * (rad ** 2);
    },

    function greetingGivenName(name){
        if(typeof(name) != "string"){
            return "Only string for this function";
        } else {
            return `Hello ${name}`
        }
    },
]

const acceptedFnNames = ["square", "inchtomm", "root", "cube", "circle", "greeting"];

function pickFromFunctionList(arg, fnName){
    
    if(typeof(fnName) != "string"){
        return "The name of the function can only be written as a string";
    }

    let counterForNotInAcceptedNames = 0;

    if(typeof(arg) == "string"){
        if(fnName.toLowerCase() != "greeting"){
            return "Use function name 'greeting' if you want to use strings";
        } else {
            return listOfFunctions[5](arg);
        }
    }

    for(let i = 0; i < acceptedFnNames.length; i++){
        if(fnName.toLowerCase() == acceptedFnNames[i]){
            return listOfFunctions[i](arg);
        } else {
            counterForNotInAcceptedNames += 1;
        }
    }

    if(counterForNotInAcceptedNames >= 5){
        return "The only accepted function names are: " + acceptedFnNames;
    }
}

//console.log(pickFromFunctionList(64, "root"));

//#region Tests ---------------------------------------------------------------------------------------------------------------------

const tests = test("List of functions tests");

// Valid inputs
tests.isEqual(listOfFunctions[0](5), 25, "The square number of 5 should return as 25");
tests.isEqual(listOfFunctions[1](1), 25.4, "Given a length of 1 inches, it should return as a length of 25.4 mm");
tests.isEqual(listOfFunctions[2](49), 7, "The root of the number 49 should return as 7");
tests.isEqual(listOfFunctions[3](7), 343, "The cubic number of 7 should return as 343");
tests.isEqual(listOfFunctions[4](5), 78.5, "The area of a circle given the radius of 5 should return as 78.5");
tests.isEqual(listOfFunctions[5]("Per"), "Hello Per", "Given the name Per the function should return a greeting like 'Hello Per'");
tests.isEqual(pickFromFunctionList("Ola", "greeting"), "Hello Ola", "Given the name Ola, the function should return a greeting like 'Hello Ola'");


// Invalid inputs
tests.isNotANumber(listOfFunctions[0]("a"), 'As the input is not a number, it should return as NaN')
tests.isNotANumber(listOfFunctions[1]("b"), 'As the input is not a number, it should return as NaN')
tests.isNotANumber(listOfFunctions[2]("c"), 'As the input is not a number, it should return as NaN')
tests.isNotANumber(listOfFunctions[3]("d"), 'As the input is not a number, it should return as NaN')
tests.isNotANumber(listOfFunctions[4]("e"), 'As the input is not a number, it should return as NaN')
tests.isEqual(listOfFunctions[5](7), "Only string for this function", 'As the function does not accept numbers, it should return a short explanation of why it does not work')
tests.isEqual(pickFromFunctionList(7, "greeting"), "Only string for this function", 'As the function does not accept numbers, it should return a short explanation of why it does not work')
tests.isEqual(pickFromFunctionList("per", "square"), "Use function name 'greeting' if you want to use strings", 'As the function only accepts number, the test will return which function you could run the given prompt with')
tests.isEqual(pickFromFunctionList("per", "inchtomm"), "Use function name 'greeting' if you want to use strings", 'As the function only accepts number, the test will return which function you could run the given prompt with')
tests.isEqual(pickFromFunctionList("per", "cube"), "Use function name 'greeting' if you want to use strings", 'As the function only accepts number, the test will return which function you could run the given prompt with')
tests.isEqual(pickFromFunctionList("per", "root"), "Use function name 'greeting' if you want to use strings", 'As the function only accepts number, the test will return which function you could run the given prompt with')
tests.isEqual(pickFromFunctionList("per", "circle"), "Use function name 'greeting' if you want to use strings", 'As the function only accepts number, the test will return which function you could run the given prompt with')
tests.isEqual(pickFromFunctionList(7, []), "The name of the function can only be written as a string", 'As the fnName section of the function can only be written as a string, the function should return just that')
tests.isEqual(pickFromFunctionList(7, "a"), "The only accepted function names are: " + acceptedFnNames, 'As the function name given is not in the list and the input of the prompt has multiple available functions, the function will return a list of all the available function names that can be used')


// Edge cases
tests.isEqual(listOfFunctions[0](Infinity), Infinity, "The square number of 5 should return as Infinity");
tests.isEqual(listOfFunctions[1](Infinity), Infinity, "Given a length of 1 inches, it should return as a length of Infinity");
tests.isEqual(listOfFunctions[2](Infinity), Infinity, "The root of the number 49 should return as Infinity");
tests.isEqual(listOfFunctions[3](Infinity), Infinity, "The cubic number of 7 should return as Infinity");
tests.isEqual(listOfFunctions[4](Infinity), Infinity, "The area of a circle given the radius of 5 should return as Infinity");
tests.isEqual(listOfFunctions[5](""), "Hello ", "Given the name '' the function should return a greeting like 'Hello '");


//#endregion