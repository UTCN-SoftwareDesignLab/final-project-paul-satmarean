package library.controller;

import library.entity.Author;
import library.service.author.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class AuthorController {

    private AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    //GET ALL
    @CrossOrigin
    @RequestMapping("/authors/")
    public ResponseEntity<List<Author>> getAuthors(){
        List<Author> authors = authorService.findAll();

        if(authors.isEmpty()){
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Author>>(authors, HttpStatus.OK);
    }
    //GET ONE BY ID
    @CrossOrigin
    @RequestMapping("/authors/{id}")
    public ResponseEntity<?> getAuthor(@PathVariable("id") Long id){
        Author author = authorService.findById(id);
        if(author!=null){
            return new ResponseEntity<Author>(author, HttpStatus.OK);
        }
        return new ResponseEntity<Author>(HttpStatus.NOT_FOUND);
    }

    //DELETE
    @CrossOrigin
    @RequestMapping(value="/authors/{id}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteAuthor(@PathVariable("id") Long id){
        if(authorService.findById(id)==null){
            return new ResponseEntity<String>("null", HttpStatus.NOT_FOUND);
        }
        authorService.delete(id);
        return new ResponseEntity<String>("confirmed", HttpStatus.OK);
    }

    //ADD
    @CrossOrigin
    @RequestMapping(value="/authors/", method=RequestMethod.POST)
    public ResponseEntity<?> addAuthor(@RequestBody Author author){
        if(authorService.findByName(author.getName())!=null){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        Author saved = authorService.save(author);
        return new ResponseEntity<Author>(saved, HttpStatus.OK);
    }

    //EDIT
    @CrossOrigin
    @RequestMapping(value="/authors/", method=RequestMethod.PUT)
    public ResponseEntity<?> editAuthor(@RequestBody Author author){

        Author saved = authorService.save(author);
        return new ResponseEntity<Author>(saved, HttpStatus.OK);
    }

}
