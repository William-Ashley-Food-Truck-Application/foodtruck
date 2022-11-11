package com.example.foodtruck.web;

import com.example.foodtruck.data.Order;
import com.example.foodtruck.data.OrdersRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(value = "/api/orders", headers = "Accept=application/json")
public class OrdersController {

    private final OrdersRepository ordersRepository;

    @GetMapping
    public Collection<Order> getAllOrders() {
        return ordersRepository.findAll();
    }

    @GetMapping("/getById/{id}")
    public Order getById(@PathVariable Long id) {
        return ordersRepository.findById(id).get();
    }

    @PostMapping
    public void createOrder(@RequestBody Order newOrder) {
        ordersRepository.save(newOrder);
    }
}
