package in.emp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import in.emp.entity.User;
import in.emp.entity.UserRepo;
import in.emp.exception.UserNotFoundException;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	private UserRepo repo;
	
    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return repo.save(newUser);
    }
    
    @GetMapping("/users")
    List<User> getAllUsers() {
        return repo.findAll();
    }
    
    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
    
    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return repo.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return repo.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }
    
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!repo.existsById(id)){
            throw new UserNotFoundException(id);
        }
        repo.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }
    
    
}
