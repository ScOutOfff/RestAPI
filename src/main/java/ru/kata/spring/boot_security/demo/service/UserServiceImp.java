package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserRepo;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserServiceImp(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getUserList() {
        return (List<User>) userRepo.findAll();
//        return userDao.getUserList();
    }

    @Override
    @Transactional
    public void add(User user) {
        userRepo.save(user);
//        userDao.add(user);
    }

//    @Override
//    @Transactional
//    public void editUser(int id, User user) {
//        userRepo.save(user);
//        userDao.editUser(id, user);
//    }

    @Override
//    @Transactional
    public User getUserById(int id) {
        return userRepo.findById(id).orElseThrow();
//        return userDao.getUserById(id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        userRepo.deleteById(id);
//        userDao.delete(id);
    }

}
