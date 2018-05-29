package library.entity.validator;

import library.entity.User;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Paul on 14/05/2018.
 */
public class UserValidator {


    private User user;
    private List<String> errors;

    public UserValidator(User user) {
        this.user = user;
        this.errors = new ArrayList<String>();
    }

    public List<String> getErrors(){
        return this.getErrors();
    }

    public boolean isValid(){
        validateEmail();
        validatePassword();
        validateUsername();
        if(this.errors.size()!=0){
            return false;
        }
        return true;
    }

    private boolean validateUsername(){
        if(this.user.getUsername()!=null && !this.user.getUsername().equals("")){
            return true;
        }
        this.errors.add("Username invalid.");
        return false;
    }

    private boolean validatePassword(){
        if(this.user.getPassword()!=null && !this.user.getPassword().equals("")){
            if(this.user.getPassword().length()<8) {
                this.errors.add("Password is too short.");
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    private boolean validateEmail(){
        return true; // TODO: 14/05/2018
    }

}
