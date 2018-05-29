package library.controller;

import library.entity.Author;
import library.entity.Book;
import library.entity.Genre;
import library.service.author.AuthorService;
import library.service.book.BookService;
import library.service.genre.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Created by Paul on 28/05/2018.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class BookController {

    private BookService bookService;
    private AuthorService authorService;
    private GenreService genreService;

    @Autowired
    public BookController(BookService bookService, AuthorService authorService, GenreService genreService) {
        this.bookService = bookService;
        this.authorService = authorService;
        this.genreService = genreService;
    }


    @CrossOrigin
    @RequestMapping("/books/")
    public ResponseEntity<?> getBooks(){
        List<Book> bookList = bookService.findAll();
        if(bookList.isEmpty()){
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Book>>(bookList, HttpStatus.OK);
    }

    //GET ONE BY ID
    @CrossOrigin
    @RequestMapping("/books/{id}")
    public ResponseEntity<?> getBook(@PathVariable("id") Long id){
        Book book = bookService.findById(id);
        if(book!=null){
            return new ResponseEntity<Book>(book, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //GET ONE BY AUTHOR ID
    @CrossOrigin
    @RequestMapping("/books/author/{id}")
    public ResponseEntity<?> getByAuthorId(@PathVariable("id") Long id){
        List<Book> books = bookService.findByAuthorId(id);
        if(!books.isEmpty()){
            return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //GET ONE BY AUTHOR ID
    @CrossOrigin
    @RequestMapping("/books/genre/{id}")
    public ResponseEntity<?> getByGenreId(@PathVariable("id") Long id){
        List<Book> books = bookService.findByGenreId(id);
        if(!books.isEmpty()){
            return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //DELETE
    @CrossOrigin
    @RequestMapping(value="/books/{id}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteBook(@PathVariable("id") Long id){
        if(bookService.findById(id)==null){
            return new ResponseEntity<String>("null", HttpStatus.NOT_FOUND);
        }
        bookService.delete(id);
        return new ResponseEntity<String>("confirmed", HttpStatus.OK);
    }

    //ADD
    @CrossOrigin
    @RequestMapping(value="/books/", method=RequestMethod.POST)
    public ResponseEntity<?> addBook(@RequestBody Book book){
        List<Author> authors = new ArrayList<Author>();
        List<Genre> genres = new ArrayList<Genre>();

        for(Genre genre:book.getGenres()){
            genres.add(genreService.findById(genre.getId()));
        }
        for(Author author:book.getAuthors()){
            authors.add(authorService.findById(author.getId()));
        }
        book.setAuthors(new HashSet<Author>(authors));
        book.setGenres(new HashSet<Genre>(genres));


        if(bookService.findByTitle(book.getTitle())!=null){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        Book saved = bookService.save(book);
        return new ResponseEntity<Book>(saved, HttpStatus.OK);
    }

    //EDIT
    @CrossOrigin
    @RequestMapping(value="/books/", method=RequestMethod.PUT)
    public ResponseEntity<?> editBook(@RequestBody Book book){

        Book saved = bookService.save(book);
        return new ResponseEntity<Book>(saved, HttpStatus.OK);
    }

}
