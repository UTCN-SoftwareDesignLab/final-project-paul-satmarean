package library.controller;

import library.entity.Book;
import library.entity.History;
import library.entity.User;
import library.service.book.BookService;
import library.service.history.HistoryService;
import library.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by Paul on 28/05/2018.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class HistoryController {

    private HistoryService historyService;
    private UserService userService;
    private BookService bookService;

    @Autowired
    public HistoryController(HistoryService historyService, UserService userService, BookService bookService) {
        this.historyService = historyService;
        this.userService = userService;
        this.bookService = bookService;
    }

    @CrossOrigin
    @RequestMapping("/history/")
    public ResponseEntity<?> getHistory(){
        List<History> list = historyService.findAll();
        if(list.isEmpty()){
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<History>>(list, HttpStatus.OK);
    }

    //GET ONE BY ID
    @CrossOrigin
    @RequestMapping("/history/book/{id}")
    public ResponseEntity<?> getHistoryById(@PathVariable("id") Long id){
        List<History> histories = historyService.findByBookId(id);
        if(!histories.isEmpty()){
            return new ResponseEntity<List<History>>(histories, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //GET ONE BY AUTHOR ID
    @CrossOrigin
    @RequestMapping("/history/user/")
    public ResponseEntity<?> getByUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        User currentUser = this.userService.findByUsername(user);
        List<History> histories = historyService.findByUserId(currentUser.getId());

        if(!histories.isEmpty()){
            return new ResponseEntity<List<History>>(histories, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    //DELETE
    @CrossOrigin
    @RequestMapping(value="/history/{id}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteHistory(@PathVariable("id") Long id){
        if(historyService.findById(id)==null){
            return new ResponseEntity<String>("null", HttpStatus.NOT_FOUND);
        }
        historyService.delete(id);
        return new ResponseEntity<String>("confirmed", HttpStatus.OK);
    }

    //ADD
    @CrossOrigin
    @RequestMapping(value="/history/", method=RequestMethod.POST)
    public ResponseEntity<?> addHistory(@RequestBody History history){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        User currentUser = this.userService.findByUsername(user);
        history.setUser(currentUser);

        Date today = new Date();
        java.sql.Date start_date = new java.sql.Date(today.getTime());
        java.sql.Date end_date = new java.sql.Date(today.getTime()+ 14l*24l*60l*60l*1000l);// we add 2 weeks

        history.setStart_date(start_date);
        history.setEnd_date(end_date);

        Book book = bookService.findByTitle(history.getBook().getTitle());

        history.setBook(book);

        History saved = historyService.save(history);
        book.setAvailable(book.getAvailable()-1);
        bookService.save(book);
        return new ResponseEntity<History>(saved, HttpStatus.OK);
    }

    //EDIT
    @CrossOrigin
    @RequestMapping(value="/history/", method=RequestMethod.PUT)
    public ResponseEntity<?> editHistory(@RequestBody History history){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        User currentUser = this.userService.findByUsername(user);
        history.setUser(currentUser);

        Book book = bookService.findByTitle(history.getBook().getTitle());
        Date today = new Date();
        history.setBook(book);

        java.sql.Date return_date = new java.sql.Date(today.getTime());
        history.setReturn_date(return_date);

        history.setStatus(true);
        book.setAvailable(book.getAvailable()+1);
        History saved = historyService.save(history);
        bookService.save(book);
        return new ResponseEntity<History>(saved, HttpStatus.OK);
    }
}
