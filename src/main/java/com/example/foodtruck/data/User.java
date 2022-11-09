package com.example.foodtruck.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
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

    @Column(nullable = false)
    private String username;


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

    @JsonIgnoreProperties("author")
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @ToString.Exclude
    private Collection<Post> posts;

    public enum Role {USER, ADMIN}

    ;


}
