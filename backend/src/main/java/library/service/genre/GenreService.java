package library.service.genre;

import library.entity.Genre;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public interface GenreService {

    List<Genre> findAll();

    Genre findByName(String name);

    Genre findById(Long id);

    Genre save(Genre genre);

    void delete(Long id);

}
