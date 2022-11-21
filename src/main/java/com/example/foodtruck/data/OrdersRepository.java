package com.example.foodtruck.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.util.Collection;

public interface OrdersRepository extends JpaRepository<Order, Long> {
    @Query("SELECT SUM(totalPrice) from Order")
    Double getTotalPrice();
}
