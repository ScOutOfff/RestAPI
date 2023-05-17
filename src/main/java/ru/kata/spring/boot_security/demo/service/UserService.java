package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> getUserList();
    void add(User user);
    void edit(int id, User user);
    User getUserById(Long id);
    User findByEmail(String email);
    void delete(Long id);
}
