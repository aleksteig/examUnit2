import fs from 'fs';

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
    
    let currentLevel = -1;
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



console.log(sumFullStructure(data));
console.log(deepestLevel(data))

/*
tasks:
- Calculate the sum of the full structure.
- Report the deepest level of the structure. 
- Report the number of nodes.
*/