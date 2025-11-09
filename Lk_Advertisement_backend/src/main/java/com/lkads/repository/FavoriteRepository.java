// repository/FavoriteRepository.java
package com.lkads.repository;

import com.lkads.model.Favorite;
import com.lkads.model.User;
import com.lkads.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    Optional<Favorite> findByUserAndPost(User user, Post post);
    Boolean existsByUserAndPost(User user, Post post);
}