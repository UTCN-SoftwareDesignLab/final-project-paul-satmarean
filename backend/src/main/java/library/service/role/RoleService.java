package library.service.role;

import library.entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Paul on 27/05/2018.
 */
@Service
public interface RoleService {

    List<Role> findAll();

    Role findById(Long id);

}
