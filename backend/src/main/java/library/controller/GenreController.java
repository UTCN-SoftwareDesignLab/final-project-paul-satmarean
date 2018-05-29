package library.controller;


import library.entity.Genre;
import library.repository.GenreRepository;
import library.service.genre.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Paul on 28/05/2018.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class GenreController {

    private GenreService genreService;

    @Autowired
    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }


    //GET ALL
    @CrossOrigin
    @RequestMapping("/genres/")
    public ResponseEntity<?> getGenres() {
        List<Genre> genres = genreService.findAll();

        if (genres.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Genre>>(genres, HttpStatus.OK);
    }

    //GET ONE BY ID
    @CrossOrigin
    @RequestMapping("/genres/{id}")
    public ResponseEntity<?> getGenre(@PathVariable("id") Long id){
        Genre genre = genreService.findById(id);
        if(genre!=null){
            return new ResponseEntity<Genre>(genre, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //DELETE
    @CrossOrigin
    @RequestMapping(value="/genres/{id}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteGenre(@PathVariable("id") Long id){
        if(genreService.findById(id)==null){
            return new ResponseEntity<String>("null", HttpStatus.NOT_FOUND);
        }
        genreService.delete(id);
        return new ResponseEntity<String>("confirmed", HttpStatus.OK);
    }

    //ADD
    @CrossOrigin
    @RequestMapping(value="/genres/", method=RequestMethod.POST)
    public ResponseEntity<?> addGenre(@RequestBody Genre genre){
        if(genreService.findByName(genre.getName())!=null){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        Genre saved = genreService.save(genre);
        return new ResponseEntity<Genre>(saved, HttpStatus.OK);
    }

    //EDIT
    @CrossOrigin
    @RequestMapping(value="/genres/", method=RequestMethod.PUT)
    public ResponseEntity<?> editGenre(@RequestBody Genre genre){

        Genre saved = genreService.save(genre);
        return new ResponseEntity<Genre>(saved, HttpStatus.OK);
    }


}
