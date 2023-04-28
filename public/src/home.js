//returns a _number_ that represents the number of book objects inside of the array.
const getTotalBooksCount = (books = []) => books.length;

//returns a _number_ that represents the number of account objects inside of the array.
const getTotalAccountsCount = (accounts = []) => accounts.length;

//returns a _number_ that represents the number of books _that are currently checked out of the library.
const getBooksBorrowedCount = (books = []) => {
  // loop through books to find that books that have been checked out
  return getCheckedBooks(books).length
};
// returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
const getMostCommonGenres = (books = []) => {
  
  // intialize new object
  const topGenres = {};
  // loop through books to get genre
  books.forEach(({ genre }) => {
    //if the genre is not in the object make new key,
    //but if the genre is a key then update the counter
    if (!topGenres[genre]) {
      topGenres[genre] = 1;
    } else {
      topGenres[genre] += 1;
    }
  });
  // get each key
  const topGenresKeys = Object.keys(topGenres);
  // put each key into an array
  const result = topGenresKeys.map((genreEl) => {
    return { name: genreEl, count: topGenres[genreEl] };
  });

  // sort the genres by the one that appears the most
  result.sort((a, b) => {
    return b.count - a.count;
  });

  // return the array with 5 top genres
  return result.slice(0, 5);
};
//returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.
const getMostPopularBooks = (books=[]) => {
  // sort books by borrows length
  books = sortBooksByDescendingOrder(books)
 
  // reformat to objects in an array
  const result = books.map(({title, borrows})=>{
    return { name : title, count : borrows.length};
  })
  // return the top 5 popular books
  return result.slice(0,5);
}


function getMostPopularAuthors(books=[], authors=[]) {
  // sort books by borrows length and get top 5
  const getMostPopularAuthors = sortBooksByDescendingOrder(books).slice(0,5);
  // make array with top authors as objects
  const result = getMostPopularAuthors.map(({authorId, borrows})=>{
    // get author by matching id's
    const {name: {first,last}} = authors.find(({id})=> id === authorId)
   // return array with object that has their name and amount of time books have been borrowed
    return {name: helpCombineNames(first, last), count : borrows.length}

  });
  return result;
}
// function to combine both names
function helpCombineNames(first="", last="") {
  return `${first} ${last}`;
}
// function to sort the borrows length
function sortBooksByDescendingOrder (books=[]) {
  return books.sort((a, b)=>{
    return b.borrows.length - a.borrows.length
  })
}
function getCheckedBooks(books=[]) {
  // loop through books to find that books that have been checked out
  return books.filter(({ borrows }) => {
    return borrows[0].returned === false;
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  getCheckedBooks,
};
