// Basics of clean organizational code in JS

// Beginning of Library 
var myLibrary = [];

Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObj = this.getItem(arrayName);
    if (typeof fetchArrayObj !== 'undefined') {
        if (fetchArrayObj !== null) {
            thisArray = JSON.parse(fetchArrayObj);
        }
    }
    return thisArray;
}
Storage.prototype.pushArrayItem = function(arrayName, arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.push(arrayItem);
    this.setItem(arrayName, JSON.stringify(existingArray));
}
Storage.prototype.popArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArrray.length > 0) {
        arrayItem = existingArray.pop();
        this.setItem(arrayName, JSON.stringify(existingArray));
    }
}

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
        return this.books.filter((book) => book.title !== title)
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

function appendBooks() {
    bookContainer.innerHTML = ''; 
    for (let book of library.books) {
        const card = document.createElement('div');
        card.classList = 'card-body';

        const content = `
            <div class='card'>
                <div class='card-header' id='heading-${book.index}'>
                    <h5>
                        <button class='btn-link' id='btn-${book.index}' onclick="read(this)">
                        </button>
                    </h5>
                </div>
            
                <div id='body-${book.index}' class='collapse show' aria-labelledby='heading-${book.index}' data-parent='#bookContainer'>
                    <div class='card-body'>
                        <h5>${book.title}</h5>
                        <p>${book.author}</p>
                        <p>${book.pages}</p>
                    </div>
                </div>
            </div>
        `;
        bookContainer.innerHTML += content;
        for (var i=0; i < library.books.length; i++) {
            if (book.read == true) {
                let reader = document.getElementById('btn-' + book.index)
                reader.classList.add('read')
            }
        }  
    };
    
}

function read(obj) {
    let readindicator = document.getElementsByClassName('btn-link');
    for (let i = 0; i < readindicator.length; i++) {
        if (obj == readindicator[i]) {
            if (readindicator[i].classList.contains('read')) {
                readindicator[i].classList.remove('read');
                library.books[i].read = false;
                localStore();
                
            } else {
                readindicator[i].classList.add('read');
                library.books[i].read = true;
                localStore();
            } 
        }
    }
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
