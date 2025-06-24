import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements AfterViewInit {
  topic: string = 'new york';
  Entries: any[] = [];
  @ViewChild('log') logElement!: ElementRef;
  @ViewChild('topic') topicElement!: ElementRef;

  ngAfterViewInit() {
    this.topicElement.nativeElement.addEventListener("keyup", () => {
      this.topic = this.topicElement.nativeElement.value;
      //this.logElement.nativeElement.innerText = `Topic: ${this.topic}`;
    });
    console.log(this.topic);
    this.main();

  }

//-----------------------------------------------------------
// fetch book data from api
//-----------------------------------------------------------
  async getBooks(): Promise<void> {
    // @ts-ignore
    const query: string = this.topic;
    let books;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error: " + response.statusText);
      }
      const data = await response.json();
      let books = data.items?.map((item: any) => item.volumeInfo) || [];
      console.log(books);

      this.Entries = books;
      console.log(this.Entries);
      this.Entries.forEach((book: any) => {
        console.log(book.title);
        console.log(book.authors);
        console.log(book.publisher);
        console.log(book.publishedDate);
      })
    } catch (error) {
      console.log("Error:" + error);
    }
  }


//-----------------------------------------------------------
// remove all children from container
//-----------------------------------------------------------
  // @ts-ignore
  removeAllChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }


//-----------------------------------------------------------
// clear the content
//-----------------------------------------------------------
  deleteAll() {
    let knot = document.getElementById('book-entries');
    this.removeAllChildren(knot);
  }


//-----------------------------------------------------------
// create boxes after loading book data
//-----------------------------------------------------------
  async main() {
    await this.getBooks();
    console.log(this.Entries);
    //await this.testBookFunction();
    this.createBox(this.Entries);
  }


//-----------------------------------------------------------
//show clicked book entry in single div
//-----------------------------------------------------------
  showSelectedBook(index: number) {
    let array = [];
    array[0] = this.Entries[index];
    this.deleteAll();

    //this.createBox(array);
    this.createReadBox(array);


    const bookBox = document.getElementById("book-entries");
    // @ts-ignore
    bookBox.style.width = '100%';
    // @ts-ignore
    bookBox.style.height = '100%';

    const bookB = document.getElementById("bookBoxID");
    // @ts-ignore
    bookB.style.width = '100%';
    // @ts-ignore
    bookB.style.height = '100%';

    /*let show = sessionStorage.getItem('isSignedIn') && (sessionStorage.getItem('username') == this.Entries[index].username);
    console.log(show);
    if(show) {

      let updateButton = document.createElement('Button');
      updateButton.innerText = 'update';
      // @ts-ignore
      bookB.appendChild(updateButton);

      let deleteButton = document.createElement('Button');
      deleteButton.innerText = 'delete';
      // @ts-ignore
      bookB.appendChild(deleteButton);
      // @ts-ignore
      bookBox.classList.add('delete');

    }*/
  }


//-----------------------------------------------------------
// create div-elements for every book entry (<=10)
//-----------------------------------------------------------
  // @ts-ignore
  createBox(bookEntries) {

    this.deleteAll();

    for (let i = 0; i < bookEntries.length; i++) {
      const bookBox = document.createElement('div');
      bookBox.id = "bookBoxID";

      //title for each entry
      const titleElement = document.createElement('h2');
      const titleText = bookEntries[i].title;
      titleElement.innerText = titleText;
      titleElement.addEventListener('click', () => {
        //console.log(i);
        this.showSelectedBook(i);
      });

      //image
      const imageElement = document.createElement('img');
      imageElement.src = bookEntries[i].imageLinks.smallThumbnail;
      imageElement.alt = `Cover of ${bookEntries[i].title}`;
      imageElement.style.width = '120px';
      imageElement.style.height = 'auto';

      //author
      const authorElement = document.createElement('p');
      const authorText = bookEntries[i].authors;
      authorElement.innerText = authorText;
      authorElement.addEventListener('click', function () {
        //alert(`Author  clicked: ${authorElement.textContent}`);
        // this.getAllUserEntries(authorElement.textContent);
      });

      //content
      const contentElement = document.createElement('p');
      const contentText = bookEntries[i].description;
      contentElement.innerText = contentText;

      //classes
      bookBox.classList.add('blog-item');
      imageElement.classList.add('blog-image');
      titleElement.classList.add('blog-title');
      authorElement.classList.add('blog-author');
      contentElement.classList.add('blog-post-description');

      bookBox.appendChild(authorElement);
      bookBox.appendChild(imageElement);
      bookBox.appendChild(titleElement);
      //bookBox.appendChild(contentElement);

      // append bookBox to container (id 'book-entries')
      const entriesContainer = document.getElementById('book-entries');
      // @ts-ignore
      entriesContainer.appendChild(bookBox);
    }
  }

  //-----------------------------------------------------------
// create div-element for clicked book entry
//-----------------------------------------------------------
  // @ts-ignore
  createReadBox(bookEntries) {

    this.deleteAll();

    for (let i = 0; i < bookEntries.length; i++) {
      const bookBox = document.createElement('div');
      bookBox.id = "bookBoxID";

      //title for each entry
      const titleElement = document.createElement('h2');
      const titleText = bookEntries[i].title;
      titleElement.innerText = titleText;
      titleElement.addEventListener('click', () => {
        console.log(i);
        //this.showSelectedBook(i);
      });

      //image
      const imageElement = document.createElement('img');
      imageElement.src = bookEntries[i].imageLinks.smallThumbnail;
      imageElement.alt = `Cover of ${bookEntries[i].title}`;
      imageElement.style.width = '120px';
      imageElement.style.height = 'auto';
      imageElement.addEventListener('click', () => {
        console.log(i);
        this.showSelectedBook(i);
      });

      //author
      const authorElement = document.createElement('p');
      const authorText = "Author: " + bookEntries[i].authors;
      authorElement.innerText = authorText;
      authorElement.addEventListener('click', function () {
        //alert(`Author  clicked: ${authorElement.textContent}`);
        // this.getAllUserEntries(authorElement.textContent);
      });

      //publishedDate
      const publishedDateElement = document.createElement('p');
      const publishedDateText = bookEntries[i].publishedDate;
      publishedDateElement.innerText = "Year: " + publishedDateText;

      //publisher
      const publisherElement = document.createElement('p');
      const publisherText = "Publisher: " + bookEntries[i].publisher;
      publisherElement.innerText = publisherText;

      //pageCount
      const pageCountElement = document.createElement('p');
      const pageCountText = "Page count: " + bookEntries[i].pageCount;
      pageCountElement.innerText = pageCountText;

      //content
      const contentElement = document.createElement('p');
      const contentText = "Description: " + bookEntries[i].description;
      contentElement.innerText = contentText;

      //categories
      const categoriesElement = document.createElement('p');
      const categoriesText = "Category: " + bookEntries[i].categories;
      categoriesElement.innerText = categoriesText;

      //classes
      bookBox.classList.add('blog-item');
      titleElement.classList.add('blog-title');
      imageElement.classList.add('blog-picture');
      publishedDateElement.classList.add('blog-publishedDate');
      authorElement.classList.add('blog-author');
      publisherElement.classList.add('blog-publisher');
      pageCountElement.classList.add('blog-pageCount');
      contentElement.classList.add('blog-post-description');
      categoriesElement.classList.add('blog-categories');

      bookBox.appendChild(authorElement);
      bookBox.appendChild(titleElement);
      bookBox.appendChild(imageElement);
      bookBox.appendChild(publishedDateElement);
      bookBox.appendChild(publisherElement);
      bookBox.appendChild(pageCountElement);
      bookBox.appendChild(contentElement);
      bookBox.appendChild(categoriesElement);

      // append bookBox to container (id 'entries')
      const entriesContainer = document.getElementById('book-entries');
      // @ts-ignore
      entriesContainer.appendChild(bookBox);
    }
  }
}


