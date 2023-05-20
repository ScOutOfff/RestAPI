package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.util.UserValidator;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final UserValidator userValidator;

    @Autowired
    public AdminController(UserService userService, RoleService roleService, UserValidator userValidator) {
        this.userService = userService;
        this.roleService = roleService;
        this.userValidator = userValidator;
    }

    @GetMapping
    public String adminPage(Model model) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User authUser = userService.findByEmail(userDetails.getUsername());

        model.addAttribute("users", userService.getUserList());
        model.addAttribute("authUser", authUser);
        model.addAttribute("roles", roleService.getAllRoles());
        model.addAttribute("newUser", new User());
        return "admin";
    }

    //List of All users________________________________________________________
    @GetMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userService.getUserList());
        return "users";
    }

    //Adding a new User_________________________________________________________
    @GetMapping("/new")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        return "new";
    }

    @PostMapping(value = "/users")
    public String create(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return "new";
        }
        userService.add(user);
        return "redirect:users";
    }

    //Deleting a User_________________________________________________________________
    @DeleteMapping(value = "/users/{id}/delete")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin/users";
    }

    //Editing a User_____________________________________________________________________
    @GetMapping(value = "/users/{id}/update")
    public String updateUser(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUserById(id));
        return "update";
    }

    @PatchMapping(value = "/users/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult,
                         @PathVariable("id") Long id) {
        if (bindingResult.hasErrors()) {
            return "update";
        }
        userService.edit(user);
        return "redirect:/admin/users";
    }
    /********************************************************************************************************/
    //Adding a user NEW
    @PostMapping("")
    public String addUser(@ModelAttribute("user") @Valid User user) {
        userService.add(user);
        return "redirect:/admin";
    }
    //Edit a user NEW
    @PatchMapping("/{id}")
    public String editUser(@ModelAttribute("user") @Valid User user, @PathVariable("id") Long id) {
        User newUser = userService.getUserById(id);
        newUser.setName(user.getName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());
        newUser.setAge(user.getAge());
        newUser.setEmail(user.getEmail());
        newUser.setRoles(user.getRoles());
        userService.edit(newUser);
        return "redirect:/admin";
    }
    //Delete a user NEW
    @PatchMapping("/{id}/delete")
    public String deleteUserFromAdmin(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
