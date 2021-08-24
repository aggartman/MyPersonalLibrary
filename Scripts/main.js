// Basics of clean organizational code in JS

// Beginning of Library 
let myLibrary = [];

// constructor for Book
class Book {
    constructor (index, title, author, pages, read,) {
        this.index = index
        this.title = title;
        this.author = author;
        this.pages = pages; //number of pages
        this.read = read; //if Book is read or not
    };
}

Book.prototype.info = function(){
    return this.title + ' by ' + this.author + ' has ' + this.pages + ' pages' + ', and ' + this.read
};

let count = 0

function addBookToLibrary(e) {
    e.preventDefault();
    let book1 = new Book(
        count,
        document.getElementById('title').value, 
        document.getElementById('author').value, 
        document.getElementById('pages').value, 
        document.getElementById('read').value);
    myLibrary.push(book1);
    count += 1;
    document.getElementById('myForm').reset();
    return false;
    
}

// initialize modal popup
let modal = document.getElementById('addLibBook');
let btn = document.getElementById('newBook');
let span = document.getElementsByClassName("close")[0];
let submission = document.getElementById('submit')

btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
