package com.example.foodtruck.web;

import com.example.foodtruck.data.Order;
import com.example.foodtruck.data.OrdersRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    @GetMapping("/count")
    public long orderCount() {
        return ordersRepository.count();
    }

    @GetMapping("salesTotal")
    public Double getSalesTotal() {
        return ordersRepository.getTotalPrice();
    }

    /*
        This endpoint gets all orders but by page instead of all at once.
        - Pass the page number through as a pathvariable to get which page you want.
     */
    @GetMapping("/{pageNumber}")
    public Collection<Order> getOrdersByPage(@PathVariable int pageNumber) {
        //creates the Object to get a specific page, the first argument is which page(0 based index) and the second is
        //how many items you want on that search.
        Pageable pageWithTwoElements = PageRequest.of(pageNumber - 1, 2);
        return ordersRepository.findAll(pageWithTwoElements).getContent();
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
