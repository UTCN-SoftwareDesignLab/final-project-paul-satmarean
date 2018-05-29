package library.service.history;

import library.entity.Book;
import library.entity.History;
import library.entity.User;
import library.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public class HistoryServiceImpl  implements HistoryService{

    private HistoryRepository historyRepository;

    @Autowired
    public HistoryServiceImpl(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @Override
    public List<History> findAll() {
        return historyRepository.findAll();
    }


    @Override
    public History findById(Long id) {
        return this.historyRepository.findOne(id);
    }

    @Override
    public List<History> finndByUser(User user) {
        return historyRepository.findByUser(user);
    }

    @Override
    public List<History> findByUserId(Long id) {
        return historyRepository.findByUserId(id);
    }

    @Override
    public List<History> findByBook(Book book) {
        return historyRepository.findByBook(book);
    }

    @Override
    public List<History> findByBookId(Long id) {
        return historyRepository.findByBookId(id);
    }

    @Override
    public History save(History history) {
        return historyRepository.save(history);
    }

    @Override
    public void delete(Long id) {
        historyRepository.delete(id);
    }
}
