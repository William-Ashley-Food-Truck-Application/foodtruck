package com.example.foodtruck.data;

import lombok.AllArgsConstructor;
import com.example.foodtruck.misc.FieldHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public void addProduct(@RequestBody Product newProduct) {
        productsRepository.save(newProduct);
    }

    @PutMapping("{id}")
    public void updateProduct(@RequestBody Product updatedProduct,@PathVariable Long id) {
        Optional<Product> optionalProduct = productsRepository.findById(id);
        Product originalProduct = optionalProduct.get();
        // in case id is not in the request body (i.e., updatedPost), set it with the path variable id
        updatedProduct.setId(id);
        // copy any new field values FROM updatedPost TO originalPost
        BeanUtils.copyProperties(updatedProduct, originalProduct, FieldHelper.getNullPropertyNames(updatedProduct));
        productsRepository.save(originalProduct);

    }

    @DeleteMapping("{id}")
    public void deleteProductById(@PathVariable Long id) {
        Optional<Product> optionalProduct = productsRepository.findById(id);
        productsRepository.deleteById(id);
    }
}




