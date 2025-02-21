import fs from 'fs';

const data = fs.readFileSync('example_files/books.json', { encoding: 'utf8', flag: 'r' });

let newData = JSON.parse(data);

function booksStartingWithThe(data){
    let newBookDataList = [];
    let bookTitles = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    for(let i = 0; i < newBookDataList.length; i++){
        bookTitles.push(newBookDataList[i][0]);
    }
    
    function filterItems(array, query){
        return array.filter((element) => element.toLowerCase().includes(query.toLowerCase()));
    }
    
    let booksWithTheInThem = filterItems(bookTitles, "The");
    let booksThatStartWithThe = [];

    for(let i = 0; i < booksWithTheInThem.length; i++){
        if(booksWithTheInThem[i][0] == "T" && booksWithTheInThem[i][1] == "h" && booksWithTheInThem[i][2] == "e")
            booksThatStartWithThe.push(booksWithTheInThem[i]);
    }

    return booksThatStartWithThe;

}

function booksWrittenByAuthorsWithTInTheirName(data){
    let newBookDataList = [];
    let authors = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    for(let i = 0; i < newBookDataList.length; i++){
        authors.push(newBookDataList[i][2]);
    }
    
    function filterItems(array, query){
        return array.filter((element) => element.toLowerCase().includes(query.toLowerCase()));
    }
    
    let authorsWithTInTheirName = filterItems(authors, "T");

    let tCounter = 0;
    let newListOfTAuthors = [];
    let pushOk = 0;
    let byCounter = 0;
    for(let i = 0; i < authorsWithTInTheirName.length; i++){
        let tempAuthor = authorsWithTInTheirName[i];
        for(let i = 0; i < tempAuthor.length; i++){
            if(tempAuthor[i].toLowerCase() == "t"){
                tCounter++;
            }
            if(tempAuthor[i] == "(" && tCounter > 0){
                pushOk++;
            }
            if(tempAuthor[i] == "y" && tempAuthor[i-1] == "b"){
                byCounter++;
            }
        }
        if(pushOk > 0){
            newListOfTAuthors.push(authorsWithTInTheirName[i]);
        }
        if(byCounter == 0){
            newListOfTAuthors.push(authorsWithTInTheirName[i]);
        }
        tCounter = 0;
        pushOk = 0;
        byCounter = 0;
    }

    return newListOfTAuthors;
}

function numberOfBooksWrittenAfter1992(data){
    let newBookDataList = [];
    let dateOfReleaseList = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    for(let i = 0; i < newBookDataList.length; i++){
        dateOfReleaseList.push(newBookDataList[i][1]);
    }

    let after1992 = 1992;
    let newListOfDateOfReleaseList = [];

    for(let i = 0; i < dateOfReleaseList.length; i++){
        let tempWord = dateOfReleaseList[i];

        if(parseInt(tempWord) >= after1992){
            newListOfDateOfReleaseList.push(tempWord);
        }
    }

    return newListOfDateOfReleaseList.length

}

function numberOfBooksWrittenBefore2004(data){
    let newBookDataList = [];
    let dateOfReleaseList = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    for(let i = 0; i < newBookDataList.length; i++){
        dateOfReleaseList.push(newBookDataList[i][1]);
    }

    let before2004 = 2004;
    let newListOfDateOfReleaseList = [];

    for(let i = 0; i < dateOfReleaseList.length; i++){
        let tempWord = dateOfReleaseList[i];

        if(parseInt(tempWord) < before2004){
            newListOfDateOfReleaseList.push(tempWord);
        }
    }

    return newListOfDateOfReleaseList.length

}

function isbnNumberOfGivenAuthor(data, author){
    let newBookDataList = [];
    let isbnList = [];
    let givenAuthor = author;

    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    let tempAuthorAndISBNList = [];
    for(let i = 0; i < newBookDataList.length; i++){
        tempAuthorAndISBNList.push(newBookDataList[i][2]);
        tempAuthorAndISBNList.push(newBookDataList[i][3]);
        isbnList.push(tempAuthorAndISBNList);
        tempAuthorAndISBNList = [];
    }

    let counter = 0;
    let authorList = [];
    for(let i = 0; i < isbnList.length; i++){
        let currentAuthor = isbnList[i][0];
        if(authorList.length < 1){
            authorList.push(currentAuthor);
        } else {
            for(let index = 0; index < authorList.length; index++){
                if(authorList[index] == currentAuthor){
                    counter++;
                }
            }
            if(counter == 0){
                authorList.push(currentAuthor);
            }
        }
        
        counter = 0;
    }

    for(let i = 0; i < authorList.length; i++){
        if(givenAuthor == authorList[i]){
            counter++;
        }
    }

    let authorsISBNNumbers = [];

    if(counter > 0){
        for(let i = 0; i < isbnList.length; i++){
            if(givenAuthor == isbnList[i][0]){
                authorsISBNNumbers.push(isbnList[i][1]);
            }
        }
    } else {
        return "The only valid authors are: " + authorList;
    }

    return authorsISBNNumbers;
}

function booksAlphabetically(data, ascendingOrDescending){
    let newBookDataList = [];
    let bookTitles = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    for(let i = 0; i < newBookDataList.length; i++){
        bookTitles.push(newBookDataList[i][0]);
    }

    let ascendingBookTitles = bookTitles.sort();
    let descendingBookTitles = [];

    for(let i = 0; i < ascendingBookTitles.length; i++){
        descendingBookTitles.unshift(ascendingBookTitles[i])
    }

    if(ascendingOrDescending.toLowerCase() == "ascending"){
        return ascendingBookTitles;
    } else if (ascendingOrDescending.toLowerCase() == "descending"){
        return descendingBookTitles;
    }

}

function booksChronologically(data, ascendingOrDescending){
    let newBookDataList = [];
    let yearOfPublishing = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    for(let i = 0; i < newBookDataList.length; i++){
        yearOfPublishing.push(newBookDataList[i][1]);
    }

    

    let ascendingYearOfRelease = yearOfPublishing.sort();

    let tempBookTitleAndYearList = [];
    let bookTitleAndYearList = [];

    for(let i = 0; i < newBookDataList.length; i++){
        tempBookTitleAndYearList.push(newBookDataList[i][0]);
        tempBookTitleAndYearList.push(newBookDataList[i][1]);
        bookTitleAndYearList.push(tempBookTitleAndYearList);
        tempBookTitleAndYearList = [];
    }

    let listOfChronologicallyAscendingBookTitles = [];

    let counter = 0;

    for(let i = 0; i < ascendingYearOfRelease.length; i++){
        let currentYear = ascendingYearOfRelease[i];
        for(let i = 0; i < bookTitleAndYearList.length; i++){
            let currentBookYear = bookTitleAndYearList[i][1];
            let currentBookTitle = bookTitleAndYearList[i][0];
            if(currentBookYear == currentYear){
                if(listOfChronologicallyAscendingBookTitles.length == 0){
                    listOfChronologicallyAscendingBookTitles.push(currentBookTitle)
                } else {
                    for(let index = 0; index < listOfChronologicallyAscendingBookTitles.length; index++){
                        if(listOfChronologicallyAscendingBookTitles[index] == currentBookTitle){
                            counter++;
                        }
                    }
                    if(counter == 0){
                        listOfChronologicallyAscendingBookTitles.push(currentBookTitle)
                    }
                    counter = 0;
                }
            }
        }
    }

    let listOfChronologicallyDescendingBookTitles = [];

    for(let i = 0; i < listOfChronologicallyAscendingBookTitles.length; i++){
        listOfChronologicallyDescendingBookTitles.unshift(listOfChronologicallyAscendingBookTitles[i])
    }

    if(ascendingOrDescending.toLowerCase() == "ascending"){
        return listOfChronologicallyAscendingBookTitles;
    } else if (ascendingOrDescending.toLowerCase() == "descending"){
        return listOfChronologicallyDescendingBookTitles;
    }
}

function booksGroupedByAuthorsLastName(data){

}

//console.log(booksStartingWithThe(newData));
//console.log(booksWrittenByAuthorsWithTInTheirName(newData));
//console.log(numberOfBooksWrittenAfter1992(newData));
//console.log(numberOfBooksWrittenBefore2004(newData));
//console.log(isbnNumberOfGivenAuthor(newData, "Terry Pratchett"));
//console.log(booksAlphabetically(newData, "ascending"))
//console.log(booksChronologically(newData, "ascending"));


/*
Tasks:
In the file `books.json` there is a listing of books. Write the functions to
- Return only books starting with `The`
- Return only books written by authors with a `t` in their name
- The number of books written after `1992`
- The number of books written before `2004`
- Return the isbn number of all the books for a given author.
- List books alphabetically assending or decendig
- List books chronologically assending or decendig
- List books grouped by author last name
- List books grouped by author first name
*/
