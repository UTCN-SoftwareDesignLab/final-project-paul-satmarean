package library.service.book;

import library.entity.Author;
import library.entity.Book;
import library.entity.Genre;
import library.repository.BookRepository;
import library.service.author.AuthorService;
import library.service.genre.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    private AuthorService authorService;

    private GenreService genreService;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, AuthorService authorService, GenreService genreService) {
        this.bookRepository = bookRepository;
        this.authorService = authorService;
        this.genreService = genreService;
    }


    @Override
    public List<Book> findAll() {
        return  bookRepository.findAll();
    }

    @Override
    public List<Book> findByAuthor(Author author) {
        return bookRepository.findByAuthorsContaining(author);
    }

    @Override
    public List<Book> findByAuthorId(Long id) {
        Author author = authorService.findById(id);
        if(author==null){
            return new ArrayList<Book>();
        }

        return bookRepository.findByAuthorsContaining(author);
    }

    @Override
    public List<Book> findByGenre(Genre genre) {
        return bookRepository.findByGenresContaining(genre);
    }

    @Override
    public List<Book> findByGenreId(Long id) {
        Genre genre = genreService.findById(id);
        if(genre==null){
            return new ArrayList<Book>();
        }
        return bookRepository.findByGenresContaining(genre);
    }

    @Override
    public Book findByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findOne(id);
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void delete(Long id) {
        bookRepository.delete(id);
    }
}
