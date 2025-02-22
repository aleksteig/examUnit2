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

    newListOfTAuthors

    let noDuplicateAuthors = [];
    let notADuplicateAuthorCounter = 0;
    for(let i = 0; i < newListOfTAuthors.length; i++){
        let currentAuthor = newListOfTAuthors[i];
        if(noDuplicateAuthors.length == 0){
            noDuplicateAuthors.push(currentAuthor)
        }
        for(let i = 0; i < noDuplicateAuthors.length; i++){
            if(currentAuthor != noDuplicateAuthors[i]){
                notADuplicateAuthorCounter++;
            }

            if(notADuplicateAuthorCounter == noDuplicateAuthors.length){
                noDuplicateAuthors.push(currentAuthor);
            }
        }
        notADuplicateAuthorCounter = 0;
    }

    let listOfBooksWrittenByAnAuthorWithTInTheirName = [];

    for(let i = 0; i < newBookDataList.length; i++){
        let currentAuthorCheck = newBookDataList[i][2];
        let currentBookInList = newBookDataList[i][0]
        for(let i = 0; i < noDuplicateAuthors.length; i++){
            if(currentAuthorCheck == noDuplicateAuthors[i]){
                listOfBooksWrittenByAnAuthorWithTInTheirName.push(currentBookInList);
            }
        }
    }

    return listOfBooksWrittenByAnAuthorWithTInTheirName;
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
    ]

    for(let i = 0; i < noDuplicateLastNamesList.length; i++){
        listOfBooksGroupedByAuthorNoName.push([])
    }

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
    ]

    for(let i = 0; i < noDuplicateFirstNamesList.length; i++){
        listOfBooksGroupedByAuthorNoName.push([])
    }

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

//#region consts

const exampleData = [{
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
}];

const testListOfBooksStartingWithThe = [
    "The Shepherd's Crown",
    'The Book of Disquiet: The Complete Edition',
    'The Prophet',
    'The Dhammapada: A New Translation of the Buddhist Classic with Annotations',
    'The Way of Kings',
    'The Last Continent',
    'The Alloy of Law',
    'The Perdition Score',
    'The Well of Ascension'
];

const testListOfBooksWrittenByAuthorsWithTInTheirName = 
[
    "The Shepherd's Crown",
    'Night Watch',
    'The Last Continent',
    'Good Omens',
    'Jingo'
];

const testAlphabeticalBookListAscending = [
    'Ballistic Kiss',
    'Cytonic',
    'Dead Set',
    'Good Omens',
    'InterWorld',
    'Jingo',
    'Killing Pretty',
    'Metrophage',
    'Night Watch',
    'Norse Mythology',
    'Redshirts',
    'Sandman Slim',
    'Shadows of Self',
    'Steelheart',
    'The Alloy of Law',
    'The Book of Disquiet: The Complete Edition',
    'The Dhammapada: A New Translation of the Buddhist Classic with Annotations',
    'The Last Continent',
    'The Perdition Score',
    'The Prophet',
    "The Shepherd's Crown",
    'The Way of Kings',
    'The Well of Ascension',
    'Warbreaker',
    "Zoe's Tale"
];

const testAlphabeticalBookListDescending = [
    "Zoe's Tale",
    'Warbreaker',
    'The Well of Ascension',
    'The Way of Kings',
    "The Shepherd's Crown",
    'The Prophet',
    'The Perdition Score',
    'The Last Continent',
    'The Dhammapada: A New Translation of the Buddhist Classic with Annotations',
    'The Book of Disquiet: The Complete Edition',
    'The Alloy of Law',
    'Steelheart',
    'Shadows of Self',
    'Sandman Slim',
    'Redshirts',
    'Norse Mythology',
    'Night Watch',
    'Metrophage',
    'Killing Pretty',
    'Jingo',
    'InterWorld',
    'Good Omens',
    'Dead Set',
    'Cytonic',
    'Ballistic Kiss'
];

const testChronologicalBookListAscending = [
    'The Prophet',
    'Metrophage',
    'Good Omens',
    'The Dhammapada: A New Translation of the Buddhist Classic with Annotations',
    'Jingo',
    'The Last Continent',
    'Night Watch',
    'InterWorld',
    'The Well of Ascension',
    "Zoe's Tale",
    'Sandman Slim',
    'Warbreaker',
    'The Way of Kings',
    'The Alloy of Law',
    'Redshirts',
    'Steelheart',
    'Dead Set',
    "The Shepherd's Crown",
    'Killing Pretty',
    'Shadows of Self',
    'The Perdition Score',
    'Norse Mythology',
    'The Book of Disquiet: The Complete Edition',
    'Ballistic Kiss',
    'Cytonic'
];

const testChronologicalBookListDescending = [
    'Cytonic',
    'Ballistic Kiss',
    'The Book of Disquiet: The Complete Edition',
    'Norse Mythology',
    'The Perdition Score',
    'Shadows of Self',
    'Killing Pretty',
    "The Shepherd's Crown",
    'Dead Set',
    'Steelheart',
    'Redshirts',
    'The Alloy of Law',
    'The Way of Kings',
    'Warbreaker',
    'Sandman Slim',
    "Zoe's Tale",
    'The Well of Ascension',
    'InterWorld',
    'Night Watch',
    'The Last Continent',
    'Jingo',
    'The Dhammapada: A New Translation of the Buddhist Classic with Annotations',
    'Good Omens',
    'Metrophage',
    'The Prophet'
];

const testListOfBooksGroupedByAuthorsLastName = [
    ['Gaiman', ['Norse Mythology']],
    [
      'Pratchett',
      [
        "The Shepherd's Crown",
        'Night Watch',
        'The Last Continent',
        'Jingo'
      ]
    ],
    ['Pessoa', ['The Book of Disquiet: The Complete Edition'] ],
    ['Scalzi', ['Redshirts', "Zoe's Tale"]],
    ['Gibran', ['The Prophet']],
    [
      'Kadrey',
      [
        'Ballistic Kiss',
        'Sandman Slim',
        'Killing Pretty',
        'Metrophage',
        'Dead Set',
        'The Perdition Score'
      ]
    ],
    [
      'Fronsdal',
      [
        'The Dhammapada: A New Translation of the Buddhist Classic with Annotations'
      ]
    ],
    [
      'Sanderson',
      [
        'Steelheart',
        'Shadows of Self',
        'Cytonic',
        'The Way of Kings',
        'Warbreaker',
        'The Alloy of Law',
        'The Well of Ascension'
      ]
    ],
    ['Gaiman & Reaves', ['InterWorld']],
    ['Gaiman & Pratchett', ['Good Omens']]
];

const testListOfBooksGroupedByAuthorsFirstName = [
    [ 'Neil', [ 'Norse Mythology' ] ],
    [
      'Terry',
      [
        "The Shepherd's Crown",
        'Night Watch',
        'The Last Continent',
        'Jingo'
      ]
    ],
    [ 'Fernando', [ 'The Book of Disquiet: The Complete Edition' ] ],
    [ 'John', [ 'Redshirts', "Zoe's Tale" ] ],
    [ 'Kahlil', [ 'The Prophet' ] ],
    [
      'Richard',
      [
        'Ballistic Kiss',
        'Sandman Slim',
        'Killing Pretty',
        'Metrophage',
        'Dead Set',
        'The Perdition Score'
      ]
    ],
    [
      'Gil',
      [
        'The Dhammapada: A New Translation of the Buddhist Classic with Annotations'
      ]
    ],
    [
      'Brandon',
      [
        'Steelheart',
        'Shadows of Self',
        'Cytonic',
        'The Way of Kings',
        'Warbreaker',
        'The Alloy of Law',
        'The Well of Ascension'
      ]
    ],
    [ 'Neil & Michael', [ 'InterWorld' ] ],
    [ 'Neil & Terry', [ 'Good Omens' ] ]
];

//#endregion

// Valid inputs
tests.isListEqual(booksStartingWithThe(exampleData), testListOfBooksStartingWithThe, "This function should only return books that start with 'The'")
tests.isListEqual(booksWrittenByAuthorsWithTInTheirName(exampleData), testListOfBooksWrittenByAuthorsWithTInTheirName, "This function should give all the books that only authors with t in their name have written in the given data")
tests.isEqual(numberOfBooksWrittenAfter1992(exampleData), 22, "This function should return the amount of books written after 1992 using the given data")
tests.isEqual(numberOfBooksWrittenBefore2004(exampleData), 7, "This function should return the amount of books written before 2004 using the given data")
tests.isListEqual(isbnNumberOfGivenAuthor(exampleData, "Neil Gaiman"), [ '0-393-60909-X' ], "This function should return the isbn numbers of the given author")
tests.isListEqual(isbnNumberOfGivenAuthor(exampleData, "Terry Pratchett"), [ '0-857-53286-5', '0-385-60265-0', '0-575-06540-0', '0-575-06411-0' ], "This function should return the isbn numbers of the given author")
tests.isListEqual(booksAlphabetically(exampleData, "ascending"), testAlphabeticalBookListAscending, "This function should return all of the books from the given data in an alphabetically ascending order")
tests.isListEqual(booksAlphabetically(exampleData, "descending"), testAlphabeticalBookListDescending, "This function should return all of the books from the given data in an alphabetically descending order")
tests.isListEqual(booksChronologically(exampleData, "ascending"), testChronologicalBookListAscending, "This function should return all of the books from the given data in a chronological ascending order")
tests.isListEqual(booksChronologically(exampleData, "descending"), testChronologicalBookListDescending, "This function should return all of the books from the given data in a chronological descending order")
tests.isEqual((booksGroupedByAuthorsLastName(exampleData)).toString(), testListOfBooksGroupedByAuthorsLastName.toString(), "This function should return a list of books grouped by the author's last names")
tests.isEqual((booksGroupedByAuthorsFirstName(exampleData)).toString(), testListOfBooksGroupedByAuthorsFirstName.toString(), "This function should return a list of books grouped by the author's first names")

//#endregion
