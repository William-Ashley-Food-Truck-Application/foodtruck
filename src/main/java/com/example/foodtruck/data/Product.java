package com.example.foodtruck.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private Double price;

//@ManyToMany(cascade = CascadeType.ALL)
//@JoinTable(
//        name = "cart_product",
//        joinColumns = {@JoinColumn(name = "product_id")},
//        inverseJoinColumns = {@JoinColumn(name = "cart_id")}
//)
//    private List<Cart>carts;
}
