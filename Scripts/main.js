// Basics of clean organizational code in JS

// Beginning of Library 
var myLibrary = [];

// constructor for Book
class Book {
    constructor (index, title, author, pages, read,) {
        this.index = index;
        this.title = title;
        this.author = author;
        this.pages = pages; //number of pages
        this.read = read; //if Book is read or not
    };
}

Book.prototype.info = function(){
    return this.title + ' by ' + this.author + ' has ' + this.pages + ' pages' + ', and ' + this.read
};

class Library {
    constructor () {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.inLibrary(newBook)) {
            this.books.push(newBook)
        }
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }
    getBook(title) {
        return this.books.find((book) => book.title === title)
    }
    inLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}
const library = new Library();

// Adding books to page
const bookContainer = document.getElementById('bookContainer');

const appendBooks = () => {
    bookContainer.innerHTML = '';
    for (let book of library.books) {
        createBook(book);
    }
}
const createBook = (book) => {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const author = document.createElement('p');
    const pages = document.createElement('p');

    card.classList.add('card');
    cardHeader.classList.add('card-header');
    readBtn.classList.add('btn-link');
    removeBtn.classList.add('closure');
    cardBody.classList.add('card-body');
    if (book.read) {
        readBtn.classList.add('read')
    }
    readBtn.onclick = read;
    removeBtn.onclick = removeBook;

    removeBtn.textContent = 'x'
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`

    card.appendChild(readBtn);
    card.appendChild(removeBtn);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages)
    bookContainer.appendChild(card);
}

const read = (e) => {
    const title = e.target.parentNode.children[2].innerHTML.replaceAll("", '');
    const book = library.getBook(title)
    book.read = !book.read;
    localStore();
    appendBooks();
}
// function  removeBook(e) {
//     const title = e.parentNode.children[2].innerHTML.replaceAll("", '');
//     library.removeBook(title);
//     localStore();
//     appendBooks();
// }
const removeBook = (e) => {
    const title = e.target.parentNode.children[2].innerHTML.replaceAll("", '');
    library.removeBook(title);
    localStore();
    appendBooks();

}
var count = 0;

const bookInput = () => {
    const index = count;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value; 
    const pages = document.getElementById('pages').value; 
    const read = document.getElementById('read').checked;
    return new Book (index, title, author, pages, read);
}

function addBookToLibrary(e) {
    e.preventDefault();
    const newBook = bookInput();
    if (!library.inLibrary(newBook)) {
        library.addBook(newBook);
        appendBooks();
        localStore();
        count += 1;
        resetModal();
    }
    return false;
}

const localStore = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
}

// initialize modal popup
const modal = document.getElementById('addLibBook');
let btn = document.getElementById('newBook');
let span = document.getElementsByClassName("close")[0];
let submission = document.getElementById('submit');
let refresh = document.getElementById('refresh');

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
const resetModal = () => {
    document.getElementById('myForm').reset();
    modal.style.display = 'none';
}
restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    if (books) {
        library.books = books.map((book) => {
            return new Book(book.index, book.title, book.author, book.pages, book.read)
        }); 
    } else {
        library.books = []
    } 
    appendBooks();
}
window.onload = ((event) => {
    restoreLocal();
});
