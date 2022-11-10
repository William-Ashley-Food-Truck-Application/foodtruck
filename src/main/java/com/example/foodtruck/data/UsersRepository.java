package com.example.foodtruck.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
