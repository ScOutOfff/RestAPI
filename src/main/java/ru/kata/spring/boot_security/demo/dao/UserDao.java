package ru.kata.spring.boot_security.demo.dao;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    List<User> getUserList();
    void add(User user);

    User getUserById(int id);

    void editUser(int id, User user);

    void delete(int id);
}
