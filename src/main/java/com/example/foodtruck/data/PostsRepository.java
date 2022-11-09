package com.example.foodtruck.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostsRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByCategories(Category cat);
    List<Post> findAllByTitle(String title);
}
