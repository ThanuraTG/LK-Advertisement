// controller/FavoriteController.java
package com.lkads.controller;

import com.lkads.model.Favorite;
import com.lkads.model.User;
import com.lkads.model.Post;
import com.lkads.repository.FavoriteRepository;
import com.lkads.repository.UserRepository;
import com.lkads.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return favoriteRepository.findByUser(user.get());
        }
        return List.of();
    }

    @GetMapping("/check")
    public Boolean checkFavorite(@RequestParam Long userId, @RequestParam Long postId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Post> post = postRepository.findById(postId);
        if (user.isPresent() && post.isPresent()) {
            return favoriteRepository.existsByUserAndPost(user.get(), post.get());
        }
        return false;
    }

    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        Optional<Post> post = postRepository.findById(request.getPostId());

        if (user.isPresent() && post.isPresent()) {
            // Check if already favorited
            if (favoriteRepository.existsByUserAndPost(user.get(), post.get())) {
                return ResponseEntity.badRequest().body("Already in favorites");
            }

            Favorite favorite = new Favorite();
            favorite.setUser(user.get());
            favorite.setPost(post.get());
            favoriteRepository.save(favorite);
            return ResponseEntity.ok("Added to favorites");
        }
        return ResponseEntity.badRequest().body("User or Post not found");
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorite(@RequestParam Long userId, @RequestParam Long postId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Post> post = postRepository.findById(postId);

        if (user.isPresent() && post.isPresent()) {
            Optional<Favorite> favorite = favoriteRepository.findByUserAndPost(user.get(), post.get());
            if (favorite.isPresent()) {
                favoriteRepository.delete(favorite.get());
                return ResponseEntity.ok("Removed from favorites");
            }
        }
        return ResponseEntity.badRequest().body("Favorite not found");
    }

    // Request DTO
    public static class FavoriteRequest {
        private Long userId;
        private Long postId;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public Long getPostId() { return postId; }
        public void setPostId(Long postId) { this.postId = postId; }
    }
}