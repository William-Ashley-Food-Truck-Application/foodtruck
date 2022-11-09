package com.example.foodtruck.data;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/cat", headers = "Accept=application/json")
public class CategoriesController {

    private CategoriesRepository categoriesRepository;

    public CategoriesController(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    @GetMapping
    private List<Category> getAllCategories(){
        return categoriesRepository.findAll();
    }
}
