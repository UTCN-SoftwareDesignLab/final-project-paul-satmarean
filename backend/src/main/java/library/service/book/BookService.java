package library.service.book;

import library.entity.Author;
import library.entity.Book;
import library.entity.Genre;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public interface BookService {

    List<Book> findAll();

    List<Book> findByAuthor(Author author);

    List<Book> findByAuthorId(Long id);

    List<Book> findByGenre(Genre genre);

    List<Book> findByGenreId(Long id);

    Book findByTitle(String title);

    Book findById(Long id);

    Book save(Book book);

    void delete(Long id);

}
