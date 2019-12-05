class UI {

  showAllBooks() {
    http.getBooks();
  }    

  addBookToList(book) {  
    const bookList = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.classList='row  pb-3 pt-3';
    row.setAttribute('data-id', `${book.isbn}`);
    row.innerHTML = `
                    <td class="col-4">${book.title}</td>
                    <td class="col-4">${book.author}</td>
                    <td class="col-2">${book.isbn}</td>
                    <td class="col-2"><a href="#" class="delete">X</a></td>
                    `;
    bookList.appendChild(row);
  }

  clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAllert(message, className) {
    const form =  document.querySelector('#book-form'); 
    const container = document.querySelector('.container');
    const alert = document.createElement('div');
    alert.classList = className;
    alert.appendChild(document.createTextNode(message));
    container.insertBefore(alert, form);
    
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
  }
  
  deleteBookFromList(target) {
    target.parentElement.parentElement.remove();
  }
}

export const ui = new UI();