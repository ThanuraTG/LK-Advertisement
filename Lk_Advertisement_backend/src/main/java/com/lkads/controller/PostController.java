// controller/PostController.java
package com.lkads.controller;

import com.lkads.dto.FullPostDTO;
import com.lkads.dto.PostRequest;
import com.lkads.model.Post;
import com.lkads.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
//        Optional<Post> post = postService.getPostById(id);
//        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
//    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        FullPostDTO dto = postService.getFullPost(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable Long userId) {
        return postService.getPostsByUser(userId);
    }

    @GetMapping("/category/{categoryType}")
    public List<Post> getPostsByCategory(@PathVariable String categoryType) {
        return postService.getPostsByCategory(categoryType);
    }

    @GetMapping("/category/{categoryType}/filter")
    public List<Post> getPostsByCategoryAndCondition(
            @PathVariable String categoryType,
            @RequestParam(required = false) String condition) {
        return postService.getPostsByCategoryAndCondition(categoryType, condition);
    }

    @GetMapping("/latest")
    public List<Post> getLatestPosts(@RequestParam(defaultValue = "10") int limit) {
        return postService.getLatestPosts(limit);
    }

    @PostMapping
    public ResponseEntity<?> createPost(
            @Valid @RequestBody PostRequest postRequest,
            Authentication authentication) {
        try {
            // Get current user ID from authentication
            Long userId = getCurrentUserId(authentication);
            Post createdPost = postService.createPost(postRequest, userId);
            return ResponseEntity.ok(createdPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
        }
    }

    // New endpoint for creating post with images
    @PostMapping(value = "/with-images", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createPostWithImages(
            @RequestPart("postData") PostRequest postRequest,
            @RequestPart(value = "images", required = false) MultipartFile[] imageFiles,
            Authentication authentication) {
        try {
            // Get current user ID from authentication
            Long userId = getCurrentUserId(authentication);
            Post createdPost = postService.createPost(postRequest, userId, imageFiles);
            return ResponseEntity.ok(createdPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post updatedPost = postService.updatePost(id, postDetails);
        return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }

    private Long getCurrentUserId(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated: cannot determine current user");
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof com.lkads.service.UserPrincipal) {
            return ((com.lkads.service.UserPrincipal) principal).getId();
        } else {
            throw new RuntimeException("Unexpected principal type: " + principal.getClass().getName());
        }
    }

    // search bar detail
    @GetMapping("/search")
    public List<Post> searchPosts(
            @RequestParam(required = false) String categoryType,
            @RequestParam String keyword) {
        return postService.searchPosts(categoryType, keyword);
    }

}