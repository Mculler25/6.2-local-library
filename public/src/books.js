// import function to get checked books
const { getCheckedBooks } = require("./home");

//returns the author object that has the matching ID.
const findAuthorById = (authors = [], id) => {
  // find the author with the matching id
  const result = authors.find((element)=>{
    return element.id === id
  })
  // return the matching author
  return result;
}
//returns the book object that has the matching ID
const findBookById = (books=[], id) => {
  // find the book with matching id
  const result = books.find((element)=>{
    return element.id === id
  })
  //return the matching book
  return result;
}
//returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.
//first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned
const partitionBooksByBorrowedStatus = (books=[]) => {
  // loop through books to find that books that have been checked out
  const checkedBooks = getCheckedBooks(books)
  // loop through books to find the books that have been returned
  const returnedBooks = books.filter(({borrows})=>{
    return borrows[0].returned === true;
  })
  // create array, first array = checkedBooks, second array = returnedBooks
  let result = [[...checkedBooks],[...returnedBooks]];
  // return the new array
  return result;
}
// return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
const getBorrowersForBook = ({borrows}={}, accounts=[]) => {
  // create new array for account obj
  const result = [];
  // loop through borrowers
   borrows.forEach((borrowsObj)=>{
    // get the id's
    const borrowersId = borrowsObj.id;
    let foundAccount = undefined
    // loop through accounts
    accounts.forEach((accountObj)=>{
      // match book id's with account id's
      foundAccount = accountObj;
      foundAccount.returned = borrowsObj.returned;
      if (borrowersId === accountObj.id && result.length < 10) {
        // if id's match and result.length is not longer then 10 push into a array
        result.push(accountObj);
      }
    })
  })
  
  return result;
  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
}
