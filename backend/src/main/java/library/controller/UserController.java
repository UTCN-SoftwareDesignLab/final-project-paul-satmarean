package library.controller;

import library.entity.User;
import library.entity.validator.UserValidator;
import library.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Paul on 17/05/2018.
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //GET ONE
    @CrossOrigin
    @RequestMapping(value="/users/{id}", method=RequestMethod.GET)
    public ResponseEntity<User> getUsers(@PathVariable("id") Long id){
        User user = userService.findById(id);

        if(user == null){
            return  new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    //GET ONE
    @CrossOrigin
    @RequestMapping(value="/users/name={name}", method=RequestMethod.GET)
    public ResponseEntity<User> getUsers(@PathVariable("name") String name){
        User user = userService.findByUsername(name);

        if(user == null){
            return  new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }




    //GET
    @CrossOrigin
    @RequestMapping("/users/")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.findAll();

        if(users.isEmpty()){
            return  new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    //ADD
    // @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    @CrossOrigin
    @RequestMapping(value="/users/", method= RequestMethod.POST)
    public ResponseEntity<?> addUser(@RequestBody User user){
        if(user==null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        if(userService.findByUsername(user.getUsername())!=null){
            return new ResponseEntity<String>("Username already in use.",HttpStatus.CONFLICT);
        }
        UserValidator validator = new UserValidator(user);
        if(validator.isValid()){
            userService.save(user);
            user = userService.findByUsername(user.getUsername());
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }else{
            String message = "";
            for(String err: validator.getErrors()){
                message = message + err + '\n';
            }
            return new ResponseEntity<String>(message, HttpStatus.BAD_REQUEST);
        }
    }

    //DELETE
    //@PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    @CrossOrigin
    @RequestMapping(value="/users/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        if(userService.findById(id)==null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        userService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }


}
