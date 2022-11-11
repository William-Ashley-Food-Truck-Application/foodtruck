package com.example.foodtruck.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "foodtruckUsers")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotEmpty
    private String email;

    @Column
    private String phoneNumber;

    @JsonIgnore
    private String password;

    @Column
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Product.class)
    @JoinTable(
            name="users_products",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="product_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    private Collection<Product> cart;

    @OneToMany(mappedBy = "orderOwner")
    @JsonIgnoreProperties({"orderOwner"})
    private Collection<Order> orders;

//    @JsonIgnoreProperties("author")
//    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
//    @ToString.Exclude
//    private Collection<Post> posts;

    public enum Role {USER, ADMIN}


}
