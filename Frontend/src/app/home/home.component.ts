import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {NgIf} from '@angular/common';
import { ChangeDetectorRef} from '@angular/core';
import { LibraryService } from '../services/library.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent implements AfterViewInit {

  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  isUserLoggedIn: boolean = false;
  showPopup: boolean = false;
  isLoading: boolean = false;
  topic: string | undefined;
  themes: string[] = ['science', 'history', 'art', 'architecture', 'fashion', 'psychology',
    'flowers', 'coffee', 'cat', 'fish', 'forest', 'news', 'travel', 'cooking',
    'science fiction', 'biography', 'culture', 'music', 'astronomy', 'politics', 'technology',
    'sports', 'mythology', 'law', 'philosophy', 'comics', 'radio', 'city', 'books', 'water', 'cinema', 'poems'];
  bookId: String | undefined;
  Entries: any[] = [];
  /*@ViewChild('log') logElement!: ElementRef;
  @ViewChild('topic') topicElement!: ElementRef;*/
  private lastScrollPosition = 0;

  ngOnInit() {
    this.isLoggedIn$.subscribe(status => {
      this.isUserLoggedIn  = status;
    });
  }

  ngAfterViewInit() {
    /*this.topicElement.nativeElement.addEventListener("keyup", () => {
      this.topic = this.topicElement.nativeElement.value;
      //this.logElement.nativeElement.innerText = `Topic: ${this.topic}`;
    });
    console.log(this.topic);*/
    this.main();
  }

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, 
              private libraryService: LibraryService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
    this.authService.isLoggedIn$.subscribe(status => {
      this.isUserLoggedIn = status;
      this.cdr.detectChanges();
    })
  }


  //-----------------------------------------------------------
// log topic in search field
//-----------------------------------------------------------
  logTopic() {
    console.log("current topic: ", this.topic);
  }

//-----------------------------------------------------------
// fetch topic-themed book data from api
//-----------------------------------------------------------
  async searchTopicBooks(): Promise<void> {

    //console.log(this.randomTheme);

    if (this.topic===undefined) {
      alert("Please enter a topic!");
      throw new Error('Execution stopped');
    } else {
      const query: string = this.topic.toLowerCase();

      let books;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }
        const data = await response.json();
        let books = data.items?.map((item: any) => item.volumeInfo) || [];
        //console.log(books);
        this.Entries = books;
      } catch (error) {
        console.log("Error:" + error);
      }

      this.Entries.forEach((book: any) => {
        console.log(book.title);
        console.log(book.authors);
        console.log(book.publisher);
        console.log(book.publishedDate);
      })
    }
  }

//-----------------------------------------------------------
// display topic-themed book data
//-----------------------------------------------------------
  async displayTopicBooks(){
    window.scrollTo(0, 0);
    this.isLoading = true;
    try {
      await this.searchTopicBooks();
    } catch (error) {console.log('no search topic')}
    finally {
      this.isLoading = false;
    }
    console.log(this.Entries);
    //nächste 2 Zeilen von ChatGPTs
    const validEntries = this.Entries.filter(book => book && book.title);
    this.createBox(validEntries);
    //await this.testBookFunction();
    // this.createBox(this.Entries);
  }

//-----------------------------------------------------------
// fetch book data from api
//-----------------------------------------------------------
  async getBooks(): Promise<void> {

    for (let i = 0; i < 10; i++) {
      let randomTheme: string = this.themes[Math.floor(Math.random()*(this.themes.length))];
      console.log(randomTheme);
      const query: string = randomTheme;

      let books;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }
        const data = await response.json();
       
        //let books = data.items?.map((item: any) => ...item.volumeInfo, item.id ) || [];
        let books = data.items?.map((item: any) => ({
          ...item.volumeInfo,
          id: item.id,
          
      })) || [];
      
       // this.bookId = data.items?.map((item: any) => item.id) || [];
        //console.log(this.bookId);
        //const authors = book.authors ? book.authors.join(", ") : "unknown author"; 
    
  /*
    const data = await response.json();

    books = data.items?.map((item: any) => {
      const book = item.volumeInfo;
      const authors = book.authors ? book.authors.join(", ") : "No Authors Available";
      const imageUrl = book.imageLinks?.thumbnail || "default-image-url.jpg";
      
      return {
        title: book.title || "No Title",
        authors: authors,
        publisher: book.publisher || "No Publisher",
        publishedDate: book.publishedDate || "No Published Date",
        imageUrl: imageUrl 
      };
    }) || [];*/


        
        this.Entries[i] = books[i];
      }
      catch (error) {
        console.log("Error:" + error);
      }
    }
    this.Entries.forEach((book: any) => {
      console.log(book.id);
      console.log(typeof(book.id))
      console.log(book.title);
      console.log(book.authors);
      console.log(book.publisher);
      console.log(book.publishedDate);

    })
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
  async main(){
    window.scrollTo(0, 0);
    //setTimeout-Teil von ChatGPT wegen RuntimeError: ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.isLoading = true;
    }, 0);
    await this.getBooks();
    this.isLoading = false;
    console.log(this.Entries);
    //nächste 2 Zeilen von ChatGPTs
    const validEntries = this.Entries.filter(book => book && book.title);
    this.createBox(validEntries);
    //await this.testBookFunction();
    // this.createBox(this.Entries);
  }


//-----------------------------------------------------------
//show clicked book entry in single div
//-----------------------------------------------------------
  showSelectedBook(index: number) {
    let array = [];
    array[0] = this.Entries[index];
    console.log(this.Entries[index]);
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


    if (this.isUserLoggedIn) {

      let currentlyReadingButton = document.createElement('Button');
      currentlyReadingButton.innerText = 'currently reading';
      currentlyReadingButton.addEventListener('click', () => {
          console.log('currentlyReadingButton has been clicked');
              //wie soll man reading schreiben?
              this.libraryService.addBookToList('currentlyReading', array[0].id);
              console.log('currently-reading-button has been clicked');
              console.log(array[0].id)
            }
      )
            // @ts-ignore
            bookB.appendChild(currentlyReadingButton);
      ;

      let markAsReadButton = document.createElement('Button');
      markAsReadButton.innerText = 'mark as read';
      markAsReadButton.addEventListener('click', () => {
        console.log('markAsReadButton has been clicked');
            //wie soll man read schreiben?
            this.libraryService.addBookToList('read', array[0].id);
            console.log('mark-as-read-list-button has been clicked');
            console.log(array[0].id)
          


      })
       // @ts-ignore
      bookB.appendChild(markAsReadButton);;

      /*//only if added to readlist?
      let deleteFromReadListButton = document.createElement('Button');
      deleteFromReadListButton.innerText = 'delete from read-list';
      deleteFromReadListButton.addEventListener('click', () => {
        console.log('deleteFromReadListButton has been clicked');
        //von Leseliste löschen
      });*/
      // @ts-ignore
      //bookB.appendChild(deleteFromReadListButton);
       // @ts-ignore
    }
  }


//-----------------------------------------------------------
// create div-elements for every book entry
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
      if (titleText.length > 30) {
        titleElement.innerText = titleText.substring(0, 30) + '...';
      } titleElement.innerText = titleText;
      titleElement.addEventListener('click', () => {
        //console.log(i);
        this.showSelectedBook(i);
      });

      //image
      const imageElement = document.createElement('img');
      const placeholderImage = 'https://placehold.co/120x180/png?text=No+Image';
      //nächste 2 Zeilen ChatGPT
      const thumbnail = bookEntries[i].imageLinks?.smallThumbnail || placeholderImage;
      imageElement.src = thumbnail;
      /*imageElement.src = bookEntries[i].imageLinks.smallThumbnail;*/
      imageElement.alt = `Cover of ${bookEntries[i].title}`;
      imageElement.style.width = '120px';
      imageElement.style.height = 'auto';
      imageElement.addEventListener('click', () => {
        //console.log(i);
        this.showSelectedBook(i);
      })

      //author
      const authorElement = document.createElement('p');
      const authorText = bookEntries[i].authors;
      authorElement.innerText = authorText
      //authorElement.addEventListener('click', function () {
        //alert(`Author  clicked: ${authorElement.textContent}`);
        // this.getAllUserEntries(authorElement.textContent);
      //});

      //content
      const contentElement = document.createElement('p');
      const contentText = bookEntries[i].description;
      contentElement.innerText = contentText;

      //to-read-button
      const toReadButtonElement = document.createElement('button');
      toReadButtonElement.innerText = 'Add to read-list';
      toReadButtonElement.addEventListener('click', () => {
        console.log(bookEntries[i]);
          
        if (!this.isUserLoggedIn) {
          console.log('Please log in or register to use additional functions');
          this.showPopup = true;
            this.cdr.detectChanges();
          }  else {
            //wie soll man tbr schreiben?
            this.libraryService.addBookToList('tbr', bookEntries[i].id);
            console.log('add-to-read-list-button has been clicked');
            console.log(bookEntries[i].id)
          }
        });


      //classes
      bookBox.classList.add('bookBox');
      imageElement.classList.add('image');
      titleElement.classList.add('title');
      authorElement.classList.add('author');
      contentElement.classList.add('content-description');
      toReadButtonElement.classList.add('toRead');

      bookBox.appendChild(authorElement);
      bookBox.appendChild(imageElement);
      bookBox.appendChild(titleElement);
      bookBox.appendChild(toReadButtonElement);
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

    this.lastScrollPosition = window.scrollY;
    sessionStorage.setItem('scrollY', String(window.scrollY));

    this.deleteAll();

    for (let i = 0; i < bookEntries.length; i++) {
      const bookBox = document.createElement('div');
      bookBox.id = "bookBoxID";
      bookBox.style.position = 'relative';

      //title for each entry
      const titleElement = document.createElement('h2');
      const titleText = bookEntries[i].title;
      titleElement.innerText = titleText;
      /*if (titleText.length > 30) {
        titleElement.innerText = titleText.substring(0, 30) + '...'; // Add ellipsis if needed
      }*/
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

      //author
      const authorElement = document.createElement('p');
      const authorText = "Author: " + bookEntries[i].authors;
      authorElement.innerText = authorText;
      authorElement.addEventListener('click', function () {
        //alert(`Author  clicked: ${authorElement.textContent}`);
        // this.getAllUserEntries(authorElement.textContent);
      });

      //to-read-button
      const toReadButtonElement = document.createElement('button');
      toReadButtonElement.innerText = 'add to read-list';
      toReadButtonElement.id = 'toReadButton';
      toReadButtonElement.addEventListener('click', () => {
        console.log(bookEntries[i]);
        console.log('toReadButton has been clicked');

        if (!this.isUserLoggedIn) {
          console.log('Please log in or register to use additional functions');
          this.showPopup = true;
          this.cdr.detectChanges();
        }  else {
             //wie soll man tbr schreiben?
            this.libraryService.addBookToList('tbr', bookEntries[i].id);
            console.log('add-to-read-list-button has been clicked');
            console.log(bookEntries[i].id)
        }
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
      bookBox.classList.add('item');
      titleElement.classList.add('title');
      imageElement.classList.add('image');
      publishedDateElement.classList.add('publishedDate');
      authorElement.classList.add('author');
      publisherElement.classList.add('publisher');
      pageCountElement.classList.add('pageCount');
      contentElement.classList.add('content-description');
      categoriesElement.classList.add('categories');
      toReadButtonElement.classList.add('toRead');

      bookBox.appendChild(authorElement);
      bookBox.appendChild(titleElement);
      bookBox.appendChild(imageElement);
      bookBox.appendChild(publishedDateElement);
      bookBox.appendChild(publisherElement);
      bookBox.appendChild(pageCountElement);
      bookBox.appendChild(contentElement);
      bookBox.appendChild(categoriesElement);
      bookBox.appendChild(toReadButtonElement);

      // append bookBox to container (id 'entries')
      const entriesContainer = document.getElementById('book-entries');
      // @ts-ignore
      entriesContainer.appendChild(bookBox);
    }
  }


//-----------------------------------------------------------
// show previously fetched books
//-----------------------------------------------------------
  showEntries() {
    this.createBox(this.Entries);
  }


//-----------------------------------------------------------
// show different books
//-----------------------------------------------------------
  async showDifferentBooks() {

    this.deleteAll();
    const scrollBack = sessionStorage.getItem('scrollY');
    //ChatGPT nächste Zeile
    const lastScrollPosition = scrollBack ? parseInt(scrollBack, 10) : 0;
    //setTimeout-Teil von ChatGPT wegen RuntimeError: ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.isLoading = true;
    }, 0);
    await this.getBooks();
    this.isLoading = false;
    console.log(this.Entries);
    //nächste 2 Zeilen von ChatGPT
    const validEntries = this.Entries.filter(book => book && book.title);
    this.createBox(validEntries);

    setTimeout(() => {
      window.scrollTo({top: lastScrollPosition});
    },100);

      //await this.testBookFunction();
      // this.createBox(this.Entries);
  }

  closePopup() {
    this.showPopup = false;
  }

}