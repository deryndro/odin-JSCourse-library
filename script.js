function Book(title, author, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// Array of added books
const myLibrary = [];

// Utility functions
function toggleReadFunc(i) {
  myLibrary[i].toggleRead();
  console.log(myLibrary[i].isRead);
  addBookToLibrary(myLibrary);
}

function deleteBook(i) {
  myLibrary.splice(i, 1);
  addBookToLibrary(myLibrary);
}

// Renders book
const booksContainer = document.querySelector(".book-display-container");

function addBookToLibrary(library) {
  booksContainer.innerHTML = "";
  library.forEach((element, index) => {
    const template = document.createElement("div");
    template.setAttribute("class", `card index${index}`);
    template.innerHTML = `
      <p>${element.title}</p>
      <p>Author: ${element.author}</p>
      <p>Pages: ${element.pages}</p>
      <p>${element.isRead ? "Already read" : "Not read"}</p>
      <div class='card-button-container'>
      <button onclick='deleteBook(${index})' id='button-delete-book'>Delete book</button>
      <button onclick='toggleReadFunc(${index})' id='button-read-toggle'>Read</button>
      </div>
      `;

    booksContainer.appendChild(template);
  });
}

// Creates new book object from inputted form
function formInput() {
  const inputTitle = document.querySelector("#input-title").value;
  const inputAuthor = document.querySelector("#input-author").value;
  const inputPages = document.querySelector("#input-pages").value;
  const inputIsRead =
    document.querySelector('input[name="isRead"]:checked').value == "true"
      ? true
      : false;
  const newBook = new Book(inputTitle, inputAuthor, inputPages, inputIsRead);

  myLibrary.push(newBook);
  addBookToLibrary(myLibrary);
}

//Form submission
const submitForm = document.querySelector("#form");
function submitFunc(event) {
  event.preventDefault();
  formInput();
}
submitForm.addEventListener("submit", submitFunc);
