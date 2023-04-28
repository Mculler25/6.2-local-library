//returns the account object that has the matching ID.
const findAccountById = (accounts, id) => {
  // find account with matching id
  const result = accounts.find((accountObj) => {
    return accountObj.id === id;
  });
  // return the obj with matching id
  return result;
};
//returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.
const sortAccountsByLastName = (accounts) => {
  // sort accounts by last name
  accounts.sort((lastNameA, lastNameB) => {
    return lastNameA.name.last.toLowerCase() > lastNameB.name.last.toLowerCase()
      ? 1
      : -1;
  });
  // return accounts array that is now sorted by last name
  return accounts;
};

//returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
const getTotalNumberOfBorrows = ({id}={}, books=[]) => {
// loop through books
return books.reduce((accumalotor, bookObj )=>{
  //access borrows
  const {borrows} = bookObj;
  //loop through borrows
  const result = borrows.forEach((borrowObj)=>{
    // get total amount of time id appears in borrows
    if(borrowObj.id === id) {
      accumalotor++;
    } 
  })
  return accumalotor;
},0)
//returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account.
}
const getBooksPossessedByAccount = ({id}={}, books=[], authors=[]) => {
  const newArray = [];
  // loop through books
    // loop through those books to match id with account id
    books.forEach((checkedObj)=>{
      const authorIdMatch = checkedObj.authorId
      const theBorrowers = checkedObj.borrows;
      theBorrowers.forEach((borrowsObj)=>{
        if (borrowsObj.id === id && borrowsObj.returned === false) {
          // loop through authors to match id
          //make key in the new array created with element from authors that matches author id
          checkedObj["author"] = authors.find((authorObj)=>{
            return authorObj.id === authorIdMatch;
          })
          newArray.push(checkedObj);
        }
      })
     
    })
    return newArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
