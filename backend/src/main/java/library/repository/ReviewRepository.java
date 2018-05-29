package library.repository;

import library.entity.Book;
import library.entity.Review;
import library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */

@Repository
public interface ReviewRepository  extends JpaRepository<Review, Long>{

    List<Review> findByBook(Book book);

    List<Review> findByBookId(Long id);

    List<Review> findByUser(User user);

    List<Review> findByUser(Long id);

}
