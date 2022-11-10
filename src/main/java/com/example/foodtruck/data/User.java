package com.example.foodtruck.data;

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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotEmpty
    private String email;

//    @Column(nullable = false)
    @ToString.Exclude
    private String password;

    @Column
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

//    Field for cart whenever Product Class is created
//    @Column
//    private ArrayList<Product> cart;

//    @JsonIgnoreProperties("author")
//    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
//    @ToString.Exclude
//    private Collection<Post> posts;

    public enum Role {USER, ADMIN}


}
