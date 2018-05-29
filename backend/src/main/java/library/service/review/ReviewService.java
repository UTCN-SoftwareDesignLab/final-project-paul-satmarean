package library.service.review;

import library.entity.Book;
import library.entity.Review;
import library.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public interface ReviewService {

    List<Review> findAll();

    Review findById(Long id);

    List<Review> finndByUser(User user);

    List<Review> findByUserId(Long id);

    List<Review> findByBook(Book book);

    List<Review> findByBookId(Long id);

    Review save(Review review);

    void delete(Long id);
}
