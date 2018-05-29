package library.service.user;

import library.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 17/05/2018.
 */
@Service
public interface UserService {

    List<User> findAll();

    User findByUsername(String username);

    User findById(Long id);

    User save(User user);

    void delete(Long id);
}
