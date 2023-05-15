package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getUserList();
    void add(User user);
    void edit(int id, User user);
    User getUserById(int id);
    void delete(int id);
}
