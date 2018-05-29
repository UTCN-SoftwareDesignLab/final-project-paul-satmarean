package library.service.history;


import library.entity.Book;
import library.entity.History;
import library.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public interface HistoryService {

    List<History> findAll();

    History findById(Long id);

    List<History> finndByUser(User user);

    List<History> findByUserId(Long id);

    List<History> findByBook(Book book);

    List<History> findByBookId(Long id);

    History save(History history);

    void delete(Long id);

}
