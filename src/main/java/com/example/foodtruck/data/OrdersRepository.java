package com.example.foodtruck.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.Collection;

public interface OrdersRepository extends JpaRepository<Order, Long> {
    @Query("SELECT SUM(totalPrice) from Order")
    Double getTotalPrice();

    @Query("SELECT SUM(totalPrice) from Order where dateOrdered = ?1")
    Double getTotalPriceByDate(LocalDate dateOrdered);
}
