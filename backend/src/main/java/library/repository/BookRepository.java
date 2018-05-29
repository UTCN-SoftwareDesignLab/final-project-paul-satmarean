package library.repository;

import library.entity.Author;
import library.entity.Book;
import library.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Book findByTitle(String title);

    List<Book> findByAuthorsContaining(Author author);

//    List<Book> findByAuthorId(Long id);

    List<Book> findByGenresContaining(Genre genre);
//    List<Book> findByGenreId(Long id);
}
