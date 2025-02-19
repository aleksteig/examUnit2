

function flattenNumbersInList(src){
    let stringifiedSource = src.toString();
    
    let test = "";
    let newListOfNumbers = [];

    for(let i = 0; i < stringifiedSource.length; i++){
        if(stringifiedSource[i] != !/^[0-9]*$/ && stringifiedSource[i] != "," && stringifiedSource[i] != "[" && stringifiedSource[i] != "]"){
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

console.log(flattenNumbersInList("[112, 2132, 1323, 1234, 31235, 3216, 231327]"));