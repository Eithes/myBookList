
import { http } from './http';
import { Book } from './book';
import { ui } from './ui';

function getBooks() {
  http.get('http://localhost:3000/books')
    .then((books) => {
      if(books.length !== 0) {
        books.forEach(book => ui.addBookToList(book));
      }
    })
    .catch(err => {
      console.log(err);
      ui.showAllert('Something went wrong', 'alert bg-danger p-1');
    });
}

document.addEventListener('DOMContentLoaded', function() {
  getBooks();
});


document.querySelector('#book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  
  if (title !== '' && author !== '' && isbn !== '') {
    if(/^[a-zA-Z0-9]+(?: *[a-zA-Z0-9  *]+)*$/.test(title) && /^[a-zA-Z]+(?: *[a-zA-Z  *]+)*$/.test(author) && /^[0-9]*$/.test(isbn)) {
      const book = new Book(title, author, isbn);
      http.post('http://localhost:3000/books', book)
        .then(data => {
          ui.addBookToList(book);
          ui.clearInput();
          ui.showAllert('The book has been added', 'alert bg-success p-1');
        })
        .catch(err => {
          console.log(err);
          ui.showAllert('Something went wrong', 'alert bg-danger p-1');
        });
       
    } else {
      ui.showAllert('Please, enter a valid title, author and isbn', 'alert bg-danger p-1');
    }
  } else {
    ui.showAllert('Please, fill in all fields', 'alert bg-danger p-1');
  }
  
  e.preventDefault();
});


document.getElementById('book-list').addEventListener('click', function(e) {

  if(e.target.classList.contains('delete')){
    const id = e.target.parentElement.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      ui.deleteBookFromList(e.target);
      http.delete(`http://localhost:3000/books/${id}`)
        .then(data => {
          ui.showAllert('The book has been removed', 'alert bg-success p-1'); 
        })
        .catch(err => {
          console.log(err);
          ui.showAllert('Something went wrong', 'alert bg-danger p-1');
        });
    }
  }

  e.preventDefault();
});
