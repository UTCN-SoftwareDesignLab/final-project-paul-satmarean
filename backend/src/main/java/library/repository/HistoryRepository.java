package library.repository;

import library.entity.Book;
import library.entity.History;
import library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findByBook(Book book);

    List<History> findByUser(User user);

    List<History> findByBookId(Long id);

    List<History> findByUserId(Long id);

}
