package library.service.review;

import library.entity.Book;
import library.entity.Review;
import library.entity.User;
import library.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> findAll() {
        return this.reviewRepository.findAll();
    }

    @Override
    public Review findById(Long id) {
        return this.reviewRepository.findOne(id);
    }

    @Override
    public List<Review> finndByUser(User user) {
        return this.reviewRepository.findByUser(user);
    }

    @Override
    public List<Review> findByUserId(Long id) {
        return this.reviewRepository.findByUser(id);
    }

    @Override
    public List<Review> findByBook(Book book) {
        return this.reviewRepository.findByBook(book);
    }

    @Override
    public List<Review> findByBookId(Long id) {
        return this.reviewRepository.findByBookId(id);
    }

    @Override
    public Review save(Review review) {
        return this.reviewRepository.save(review);
    }

    @Override
    public void delete(Long id) {
        this.reviewRepository.delete(id);
    }
}
