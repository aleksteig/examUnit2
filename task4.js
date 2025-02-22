import fs from 'fs';
import test from './test.mjs';

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
    let newBookDataList = [];
    let bookTitlesAndAuthors = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    let tempBookAndAuthors = [];
    for(let i = 0; i < newBookDataList.length; i++){
        tempBookAndAuthors.push(newBookDataList[i][0]);
        tempBookAndAuthors.push(newBookDataList[i][2]);
        bookTitlesAndAuthors.push(tempBookAndAuthors);
        tempBookAndAuthors = [];
    }

    let lastNameAuthors = [];
    let tempLastNameAuthor = "";
    let translatedByCheck = "";
    let spaceCounter = 0;
    let andCounter = 0;
    let lastCharacterOfLastNameSwitch = 0;

    for(let i = 0; i < bookTitlesAndAuthors.length; i++){
        let tempAuthor = bookTitlesAndAuthors[i][1];
        for(let i = 0; i < tempAuthor.length; i++){

            translatedByCheck += tempAuthor[i];

            if(tempAuthor[i] == ' '){
                spaceCounter++;
            }
            if(tempAuthor[i] == "&"){
                andCounter++;
            }

            if(tempAuthor[i+1] == "&" || tempAuthor[i-1] == "&"){
                tempLastNameAuthor += " ";
            }

            if(spaceCounter > 0 && lastCharacterOfLastNameSwitch == 0 && tempAuthor[i] != " "){
                tempLastNameAuthor += tempAuthor[i];
            }

            if(tempAuthor[i] == " " && tempAuthor[i-1] == "&"){
                spaceCounter = 0;
            }

            if(translatedByCheck == "Translated by "){
                tempLastNameAuthor = "";
                spaceCounter = 0;
                for(let i = 0; i < tempAuthor.length; i++){
                    if(tempAuthor[i] == " "){
                        spaceCounter++;
                    }
                    if(spaceCounter > 2 && tempAuthor[i] != " "){
                        tempLastNameAuthor += tempAuthor[i];
                    }
                    lastCharacterOfLastNameSwitch++;
                }
            }

            if(tempAuthor[i+2] == "(" && spaceCounter == 0){
                spaceCounter = 0;
                for(let i = 0; i < tempAuthor.length; i++){
                    if(tempAuthor[i] == " "){
                        spaceCounter++;
                    }
                    if(spaceCounter == 0 && lastCharacterOfLastNameSwitch == 0){
                        tempLastNameAuthor += tempAuthor[i];
                    }
                    if(tempAuthor[i+2] == "("){
                        lastCharacterOfLastNameSwitch++;
                    }
                }
            } else if(tempAuthor[i+2] == "("){
                lastCharacterOfLastNameSwitch++;
            }

            if(andCounter == 0 && spaceCounter == 2 && tempAuthor[i+2] != "(" && tempAuthor[0] == "H"){
                spaceCounter = 0;
                tempLastNameAuthor = "";
                for(let i = 0; i < tempAuthor.length; i++){
                    if(tempAuthor[i] == " "){
                        spaceCounter++;
                    }
                    if(spaceCounter > 1 && tempAuthor[i] != " "){
                        tempLastNameAuthor += tempAuthor[i];
                    }
                    lastCharacterOfLastNameSwitch++;
                }
            }

        }
        spaceCounter = 0;
        lastCharacterOfLastNameSwitch = 0;
        andCounter = 0;
        lastNameAuthors.push(tempLastNameAuthor);
        tempLastNameAuthor = "";
        translatedByCheck = "";
    }

    let noDuplicateLastNamesList = [];
    let notADuplicateAuthorCounter = 0;
    for(let i = 0; i < lastNameAuthors.length; i++){
        let currentLastNameAuthor = lastNameAuthors[i];
        if(noDuplicateLastNamesList.length == 0){
            noDuplicateLastNamesList.push(currentLastNameAuthor)
        }
        for(let i = 0; i < noDuplicateLastNamesList.length; i++){
            if(currentLastNameAuthor != noDuplicateLastNamesList[i]){
                notADuplicateAuthorCounter++;
            }

            if(notADuplicateAuthorCounter == noDuplicateLastNamesList.length){
                noDuplicateLastNamesList.push(currentLastNameAuthor);
            }
        }
        notADuplicateAuthorCounter = 0;
    }

    let bookTitleList = [];
    for(let i = 0; i < bookTitlesAndAuthors.length; i++){
        bookTitleList.push(bookTitlesAndAuthors[i][0]);
    }

    let newListOfBookTitlesAndLastNameAuthors = [];
    let tempAuthorAndBookTitle = [];
    for(let i = 0; i < bookTitleList.length; i++){
        tempAuthorAndBookTitle.push(bookTitleList[i]);
        tempAuthorAndBookTitle.push(lastNameAuthors[i]);
        newListOfBookTitlesAndLastNameAuthors.push(tempAuthorAndBookTitle);
        tempAuthorAndBookTitle = [];
    }

    const listOfBooksGroupedByAuthorNoName = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    for(let i = 0; i < newListOfBookTitlesAndLastNameAuthors.length; i++){
        let currentAuthorChecked = newListOfBookTitlesAndLastNameAuthors[i][1];
        let currentBook = newListOfBookTitlesAndLastNameAuthors[i][0]
        for(let i = 0; i < noDuplicateLastNamesList.length; i++){
            let currentLastNameAuthor = noDuplicateLastNamesList[i];
            if(currentAuthorChecked == currentLastNameAuthor){
                listOfBooksGroupedByAuthorNoName[i].push(currentBook);
            }
        }
    }

    const listOfBooksGroupedByAuthorsLastName = []

    let listPlaceholder = [];
    for(let i = 0; i < listOfBooksGroupedByAuthorNoName.length; i++){
        listPlaceholder.push(noDuplicateLastNamesList[i]);
        listPlaceholder.push(listOfBooksGroupedByAuthorNoName[i]);
        listOfBooksGroupedByAuthorsLastName.push(listPlaceholder);
        listPlaceholder = [];
    }

    return listOfBooksGroupedByAuthorsLastName;
}

function booksGroupedByAuthorsFirstName(data){
    let newBookDataList = [];
    let bookTitlesAndAuthors = [];
    for(let i = 0; i < data.length; i++){
        newBookDataList.push(Object.values(data[i]));
    }

    let tempBookAndAuthors = [];
    for(let i = 0; i < newBookDataList.length; i++){
        tempBookAndAuthors.push(newBookDataList[i][0]);
        tempBookAndAuthors.push(newBookDataList[i][2]);
        bookTitlesAndAuthors.push(tempBookAndAuthors);
        tempBookAndAuthors = [];
    }

    let firstNameAuthors = [];
    let tempFirstNameAuthor = "";
    let translatedByCheck = "";
    let spaceCounter = 0;
    let lastCharacterOfLastNameSwitch = 0;

    for(let i = 0; i < bookTitlesAndAuthors.length; i++){
        let tempAuthor = bookTitlesAndAuthors[i][1];
        for(let i = 0; i < tempAuthor.length; i++){

            translatedByCheck += tempAuthor[i];

            if(tempAuthor[i] == ' '){
                spaceCounter++;
            }

            if(tempAuthor[i] == "&"){
                tempFirstNameAuthor += "&";
            }

            if(tempAuthor[i+1] == "&" || tempAuthor[i-1] == "&"){
                tempFirstNameAuthor += " ";
            }

            if(spaceCounter == 0 && lastCharacterOfLastNameSwitch == 0 && tempAuthor[i] != " "){
                tempFirstNameAuthor += tempAuthor[i];
            }

            if(tempAuthor[i] == " " && tempAuthor[i-1] == "&"){
                spaceCounter = 0;
            }

            if(translatedByCheck == "Translated by "){
                tempFirstNameAuthor = "";
                spaceCounter = 0;
                for(let i = 0; i < tempAuthor.length; i++){
                    if(tempAuthor[i] == " "){
                        spaceCounter++;
                    }
                    if(spaceCounter == 2 && tempAuthor[i] != " "){
                        tempFirstNameAuthor += tempAuthor[i];
                    }
                    lastCharacterOfLastNameSwitch++;
                }
            }
        }
        spaceCounter = 0;
        lastCharacterOfLastNameSwitch = 0;
        firstNameAuthors.push(tempFirstNameAuthor);
        tempFirstNameAuthor = "";
        translatedByCheck = "";
    }

    let noDuplicateFirstNamesList = [];
    let notADuplicateAuthorCounter = 0;
    for(let i = 0; i < firstNameAuthors.length; i++){
        let currentFirstNameAuthor = firstNameAuthors[i];
        if(noDuplicateFirstNamesList.length == 0){
            noDuplicateFirstNamesList.push(currentFirstNameAuthor)
        }
        for(let i = 0; i < noDuplicateFirstNamesList.length; i++){
            if(currentFirstNameAuthor != noDuplicateFirstNamesList[i]){
                notADuplicateAuthorCounter++;
            }

            if(notADuplicateAuthorCounter == noDuplicateFirstNamesList.length){
                noDuplicateFirstNamesList.push(currentFirstNameAuthor);
            }
        }
        notADuplicateAuthorCounter = 0;
    }

    let bookTitleList = [];
    for(let i = 0; i < bookTitlesAndAuthors.length; i++){
        bookTitleList.push(bookTitlesAndAuthors[i][0]);
    }

    let newListOfBookTitlesAndFirstNameAuthors = [];
    let tempAuthorAndBookTitle = [];
    for(let i = 0; i < bookTitleList.length; i++){
        tempAuthorAndBookTitle.push(bookTitleList[i]);
        tempAuthorAndBookTitle.push(firstNameAuthors[i]);
        newListOfBookTitlesAndFirstNameAuthors.push(tempAuthorAndBookTitle);
        tempAuthorAndBookTitle = [];
    }

    const listOfBooksGroupedByAuthorNoName = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    for(let i = 0; i < newListOfBookTitlesAndFirstNameAuthors.length; i++){
        let currentAuthorChecked = newListOfBookTitlesAndFirstNameAuthors[i][1];
        let currentBook = newListOfBookTitlesAndFirstNameAuthors[i][0]
        for(let i = 0; i < noDuplicateFirstNamesList.length; i++){
            let currentFirstNameAuthor = noDuplicateFirstNamesList[i];
            if(currentAuthorChecked == currentFirstNameAuthor){
                listOfBooksGroupedByAuthorNoName[i].push(currentBook);
            }
        }
    }

    const listOfBooksGroupedByAuthorsFirstName = []

    let listPlaceholder = [];
    for(let i = 0; i < listOfBooksGroupedByAuthorNoName.length; i++){
        listPlaceholder.push(noDuplicateFirstNamesList[i]);
        listPlaceholder.push(listOfBooksGroupedByAuthorNoName[i]);
        listOfBooksGroupedByAuthorsFirstName.push(listPlaceholder);
        listPlaceholder = [];
    }

    return listOfBooksGroupedByAuthorsFirstName;

}

//console.log(booksStartingWithThe(newData));
//console.log(booksWrittenByAuthorsWithTInTheirName(newData));
//console.log(numberOfBooksWrittenAfter1992(newData));
//console.log(numberOfBooksWrittenBefore2004(newData));
//console.log(isbnNumberOfGivenAuthor(newData, "Terry Pratchett"));
//console.log(booksAlphabetically(newData, "ascending"))
//console.log(booksChronologically(newData, "ascending"));
//console.log(booksGroupedByAuthorsLastName(newData));
//console.log(booksGroupedByAuthorsFirstName(newData));

//#region Tests ---------------------------------------------------------------------------------------------------------------------

const tests = test("My books are a mess functions");

const exampleData = `[{
    "title": "Norse Mythology",
    "publication_year": 2017,
    "author": "Neil Gaiman",
    "isbn": "0-393-60909-X"
},
{
    "title": "The Shepherd's Crown",
    "publication_year": 2015,
    "author": "Terry Pratchett",
    "isbn": "0-857-53286-5"
},
{
    "title": "The Book of Disquiet: The Complete Edition",
    "publication_year": 2017,
    "author": "Fernando Pessoa (Translated by Margaret Jull Costa)",
    "isbn": "978-0811226936"
},
{
    "title": "Redshirts",
    "publication_year": 2012,
    "author": "John Scalzi",
    "isbn": "978-0765334794"
},
{
    "title": "The Prophet",
    "publication_year": 1923,
    "author": "Kahlil Gibran",
    "isbn": "978-0394404288"
},
{
    "title": "Ballistic Kiss",
    "publication_year": 2020,
    "author": "Richard Kadrey",
    "isbn": "978-0062672575"
},
{
    "title": "Sandman Slim",
    "publication_year": 2009,
    "author": "Richard Kadrey",
    "isbn": "978-0061714306"
},
{
    "title": "The Dhammapada: A New Translation of the Buddhist Classic with Annotations",
    "publication_year": 1993,
    "author": "Translated by Gil Fronsdal",
    "isbn": "978-1590303801"
},
{
    "title": "Steelheart",
    "publication_year": 2013,
    "author": "Brandon Sanderson",
    "isbn": "978-0385743563"
},
{
    "title": "Killing Pretty",
    "publication_year": 2015,
    "author": "Richard Kadrey",
    "isbn": "978-0062373106"
},
{
    "title": "InterWorld",
    "publication_year": 2007,
    "author": "Neil Gaiman & Michael Reaves",
    "isbn": "0-06-123896-1"
},
{
    "title": "Metrophage",
    "publication_year": 1988,
    "author": "Richard Kadrey",
    "isbn": "0-671-69759-5"
},
{
    "title": "Zoe's Tale",
    "publication_year": 2008,
    "author": "John Scalzi",
    "isbn": "978-0765316981"
},
{
    "title": "Shadows of Self",
    "publication_year": 2015,
    "author": "Brandon Sanderson",
    "isbn": "978-0765378552"
},
{
    "title": "Cytonic",
    "publication_year": 2021,
    "author": "Brandon Sanderson",
    "isbn": "978-0399555855"
},
{
    "title": "The Way of Kings",
    "publication_year": 2010,
    "author": "Brandon Sanderson",
    "isbn": "978-0765326355"
},
{
    "title": "Night Watch",
    "publication_year": 2002,
    "author": "Terry Pratchett",
    "isbn": "0-385-60265-0"
},
{
    "title": "The Last Continent",
    "publication_year": 1998,
    "author": "Terry Pratchett",
    "isbn": "0-575-06540-0"
},
{
    "title": "Dead Set",
    "publication_year": 2013,
    "author": "Richard Kadrey",
    "isbn": "978-0062283016"
},
{
    "title": "Warbreaker",
    "publication_year": 2009,
    "author": "Brandon Sanderson",
    "isbn": "978-0765320308"
},
{
    "title": "Good Omens",
    "publication_year": 1990,
    "author": "Neil Gaiman & Terry Pratchett",
    "isbn": "0-575-04800-3"
},
{
    "title": "The Alloy of Law",
    "publication_year": 2011,
    "author": "Brandon Sanderson",
    "isbn": "978-0765330420"
},
{
    "title": "The Perdition Score",
    "publication_year": 2016,
    "author": "Richard Kadrey",
    "isbn": "978-0062373267"
},
{
    "title": "Jingo",
    "publication_year": 1997,
    "author": "Terry Pratchett",
    "isbn": "0-575-06411-0"
},
{
    "title": "The Well of Ascension",
    "publication_year": 2007,
    "author": "Brandon Sanderson",
    "isbn": "978-0765316882"
}]`;

const listOfBooksStartingWithThe = [];


// Valid inputs
// tests.isListEqual(booksStartingWithThe(exampleData), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksWrittenByAuthorsWithTInTheirName(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(numberOfBooksWrittenAfter1992(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(numberOfBooksWrittenBefore2004(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(isbnNumberOfGivenAuthor(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(isbnNumberOfGivenAuthor(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksAlphabetically(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksAlphabetically(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksChronologically(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksChronologically(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksGroupedByAuthorsLastName(), "aa", "This function should only return books that start with 'The'")
// tests.isListEqual(booksGroupedByAuthorsFirstName(), "aa", "This function should only return books that start with 'The'")

console.log(booksStartingWithThe(exampleData));

//#endregion
