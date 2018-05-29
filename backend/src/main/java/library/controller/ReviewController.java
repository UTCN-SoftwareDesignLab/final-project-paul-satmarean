package library.controller;

import library.entity.Review;
import library.entity.User;
import library.service.review.ReviewService;
import library.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Paul on 28/05/2018.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class ReviewController {


    private ReviewService reviewService;
    private UserService userService;

    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @CrossOrigin
    @RequestMapping("/reviews/")
    public ResponseEntity<?> getHistory(){
        List<Review> list = reviewService.findAll();
        if(list.isEmpty()){
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Review>>(list, HttpStatus.OK);
    }

    //GET ONE BY ID
    @CrossOrigin
    @RequestMapping("/reviews/book/{id}")
    public ResponseEntity<?> getHistoryById(@PathVariable("id") Long id){
        List<Review> histories = reviewService.findByBookId(id);
        if(!histories.isEmpty()){
            return new ResponseEntity<List<Review>>(histories, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    //GET ONE BY AUTHOR ID
    @CrossOrigin
    @RequestMapping("/reviews/user/{id}")
    public ResponseEntity<?> getByAuthorId(@PathVariable("id") Long id){
        List<Review> reviews = reviewService.findByUserId(id);

        if(!reviews.isEmpty()){
            return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //DELETE
    @CrossOrigin
    @RequestMapping(value="/reviews/{id}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteReview(@PathVariable("id") Long id){
        if(reviewService.findById(id)==null){
            return new ResponseEntity<String>("null", HttpStatus.NOT_FOUND);
        }
        reviewService.delete(id);
        return new ResponseEntity<String>("confirmed", HttpStatus.OK);
    }

    //ADD
    @CrossOrigin
    @RequestMapping(value="/reviews/", method=RequestMethod.POST)
    public ResponseEntity<?> addReview(@RequestBody Review review){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        User currentUser = this.userService.findByUsername(user);

        review.setUser(currentUser);
//        if(reviewService.findByUserId(review.getUser().getId())!=null){
//            return new ResponseEntity(HttpStatus.CONFLICT);
//        }


        Review saved = reviewService.save(review);
        return new ResponseEntity<Review>(saved, HttpStatus.OK);
    }

    //EDIT
    @CrossOrigin
    @RequestMapping(value="/reviews/", method=RequestMethod.PUT)
    public ResponseEntity<?> editReview(@RequestBody Review review){

        Review saved = reviewService.save(review);
        return new ResponseEntity<Review>(saved, HttpStatus.OK);
    }

}
