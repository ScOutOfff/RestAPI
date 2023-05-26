package ru.kata.spring.boot_security.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

public class UserDTO {
    @NotEmpty(message = "Field \"Name\" should not empty")
    @Size(min = 2, max = 30, message = "Name should be from 2 to 30 letters")
    private String name;
    @NotEmpty(message = "Field \"Last Name\" should not empty")
    @Size(min = 2, max = 30, message = "Last Name should be from 2 to 30 letters")
    private String lastName;
    @Min(value = 0, message = "Age should be greater than 0")
    private int age;
    @NotEmpty(message = "Field \"Email\" should not empty")
    @Email(message = "Email should be valid")
    private String email;
    private String password;
    private Set<Role> roles;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
