//package ru.kata.spring.boot_security.demo.security;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//import ru.kata.spring.boot_security.demo.model.User;
//
//import java.util.Collection;
//
//@Component
//public class UserDetailsImpl implements UserDetails {
//    private User user;
//    private String name;
//    private String password;
//    private Collection<GrantedAuthority> authorities;
//
//    public UserDetailsImpl(User user) {
//        this.user = user;
//    }
//    public UserDetailsImpl(){}
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return user.getName();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//
//    public User getUser() {
//        return user;
//    }
//}
