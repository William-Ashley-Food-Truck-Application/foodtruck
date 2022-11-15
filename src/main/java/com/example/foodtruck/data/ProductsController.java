package com.example.foodtruck.data;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/products", headers = "Accept=application/json")
public class ProductsController {
    private ProductsRepository productsRepository;

    @GetMapping("")
    public List<Product> getAllProducts() {
        return productsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> getById(@PathVariable Long id) {
        return productsRepository.findById(id);
    }
}




