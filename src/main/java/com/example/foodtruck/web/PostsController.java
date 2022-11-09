package com.example.foodtruck.web;


import com.example.foodtruck.data.*;
import com.example.foodtruck.services.EmailService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    private final PostsRepository postsRepository;
    private final UsersRepository usersRepository;
    private final CategoriesRepository categoriesRepository;
    private final EmailService emailService;

    public PostsController(PostsRepository postsRepository, UsersRepository usersRepository, CategoriesRepository categoriesRepository, EmailService emailService) {
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
        this.categoriesRepository = categoriesRepository;
        this.emailService = emailService;
    }

    @GetMapping
    private List<Post> getAll() {
        return postsRepository.findAll();
    }
//    GET api/posts/5  5 being an id
    @GetMapping("{postId}")
    private Optional<Post> getById(@PathVariable Long postId){
        return postsRepository.findById(postId);
    }

    @GetMapping("getByCategory")
    private List<Post> getPostsByCategory(@RequestParam String cat) {
        return postsRepository.findAllByCategories(categoriesRepository.findCategoryByName(cat));
    }

    @GetMapping("title")
    private List<Post> getPostByTitle(@RequestParam String title) {
        return postsRepository.findAllByTitle(title);
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost, OAuth2Authentication auth){
        //in-memory list og categories
        Collection<Category> categories = new ArrayList<>();
//        categories.add(categoriesRepository.getById(1L));
//        categories.add(categoriesRepository.getById(2L));
        for (Category category : newPost.getCategories()) {
            System.out.println(category.getName());
            categories.add(categoriesRepository.findCategoryByName(category.getName()));
        }

        Post postToAdd = new Post();
        postToAdd.setTitle(newPost.getTitle());
        postToAdd.setContent(newPost.getContent());
        postToAdd.setCategories(categories);


        //Finding active user that is logged in to set them as the author of the post
        String userEmail = auth.getName();
        User user = usersRepository.findByEmail(userEmail);

        //sets author and categories to post
        postToAdd.setAuthor(user);

        emailService.prepareAndSend(postToAdd, "post subject", "post body");
        //SAVE THIS POST TO THE DATABASE
        postsRepository.save(postToAdd);
        System.out.println("Post created");
    }

    @PutMapping("{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post){
        Post postToUpdate = postsRepository.getById(id);
        postToUpdate.setContent(post.getContent());
        postToUpdate.setTitle(post.getTitle());
        postsRepository.save(postToUpdate);
        System.out.println("Updating post with id of: " + id);
    }

    @DeleteMapping("{id}")
    private void deletePost(@PathVariable Long id) {
        postsRepository.deleteById(id);
        System.out.println("Deleted post with id of: " + id);
    }

}
