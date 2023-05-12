package ru.kata.spring.boot_security.demo.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User,Integer> {
    @Override
    Optional<User> findById(Integer id);
    @Override
    <S extends User> S save(S entity);
    @Override
    Iterable<User> findAll();
    @Override
    void delete(User user);

    @Override
    void deleteById(Integer integer);
}
