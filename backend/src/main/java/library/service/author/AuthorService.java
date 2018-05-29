package library.service.author;

import library.entity.Author;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by Paul on 27/05/2018.
 */
@Service
public interface AuthorService {

    List<Author> findAll();

    Author findById(Long id);

    Author findByName(String name);

    Author save(Author author);

    void delete(Long id);

}
