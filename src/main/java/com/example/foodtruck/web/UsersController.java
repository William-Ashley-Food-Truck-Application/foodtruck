package com.example.foodtruck.web;


import com.example.foodtruck.data.User;
import com.example.foodtruck.data.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersController(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    private List<User> getAll() {
        return usersRepository.findAll();
    }

    @GetMapping("{userId}")
    private Optional<User> getByUserId(@PathVariable Long userId){

        return usersRepository.findById(userId);
    }

    //create user is now at api/users/create
    @PostMapping("create")
    private void createUser(@RequestBody User newUser) {

        newUser.setCreatedAt(LocalDate.now());
        newUser.setRole(User.Role.USER);
        String encryptedPassword = newUser.getPassword();
        encryptedPassword = passwordEncoder.encode(encryptedPassword);
        newUser.setPassword(encryptedPassword);
        usersRepository.save(newUser);

        System.out.println("User created");
    }

    @PutMapping("{userId}")
    private void updateUser(@PathVariable Long userId, @RequestBody User user) {

        User userToUpdate = usersRepository.getById(userId);
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setRole(user.getRole());
        usersRepository.save(userToUpdate);

        System.out.println("Updating user with id of: " + userId + " \nto: " + user);
    }

    @DeleteMapping("{userId}")
    private void deleteUser(@PathVariable Long userId) {
        usersRepository.deleteById(userId);
        System.out.println("Deleting user with id of: " + userId);
    }

    @GetMapping("me")
    private User getLoggedInUser(OAuth2Authentication auth) {
        return usersRepository.findByEmail(auth.getName());
    }

    @GetMapping("username")
    @ResponseBody
    private User getByUsername(@RequestParam String username) {
        return usersRepository.findByUsername(username);
    }

    @GetMapping("email")
    @ResponseBody
    private User getByEmail(@RequestParam String email) {
        return usersRepository.findByEmail(email);
    }


    @PutMapping("/{userId}/updatePassword")
    private void updatePassword(@PathVariable Long userId, @RequestBody String newPassword){

        User userToUpdate = usersRepository.getById(userId);

        String encryptedPassword = newPassword;
        encryptedPassword = passwordEncoder.encode(encryptedPassword);
        userToUpdate.setPassword(encryptedPassword);
        usersRepository.save(userToUpdate);

        System.out.println("Updating the password of user: " + userToUpdate.getUsername() + " to: " + newPassword);
    }

}
