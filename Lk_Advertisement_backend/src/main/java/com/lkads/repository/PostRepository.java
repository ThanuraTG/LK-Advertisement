// repository/PostRepository.java
//package com.lkads.repository;
//
//import com.lkads.model.Post;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface PostRepository extends JpaRepository<Post, Long> {
//    List<Post> findByUserId(Long userId);
//    List<Post> findByCategoryTypeOrderByCreatedAtDesc(String categoryType);
//
//    @Query("SELECT p FROM Post p WHERE p.categoryType = :categoryType AND " +
//            "(:condition IS NULL OR p.condition = :condition) " +
//            "ORDER BY p.createdAt DESC")
//    List<Post> findByCategoryTypeAndCondition(@Param("categoryType") String categoryType,
//                                              @Param("condition") String condition);
//
//    List<Post> findByCategoryTypeAndSubCategoryOrderByCreatedAtDesc(String categoryType, String subCategory);
//
//    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC LIMIT :limit")
//    List<Post> findLatestPosts(@Param("limit") int limit);
//}

package com.lkads.repository;

import com.lkads.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);
    List<Post> findByCategoryTypeOrderByCreatedAtDesc(String categoryType);

    @Query("SELECT p FROM Post p WHERE p.categoryType = :categoryType AND " +
            "(:condition IS NULL OR p.condition = :condition) " +
            "ORDER BY p.createdAt DESC")
    List<Post> findByCategoryTypeAndCondition(@Param("categoryType") String categoryType,
                                              @Param("condition") String condition);

    List<Post> findByCategoryTypeAndSubCategoryOrderByCreatedAtDesc(String categoryType, String subCategory);

    // Removed invalid JPQL with LIMIT. Use Spring Data Pageable to get latest posts.
    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC")
    Page<Post> findAllOrderByCreatedAtDesc(Pageable pageable);


    // search bar detail
    @Query("SELECT p FROM Post p WHERE " +
            "(:categoryType IS NULL OR p.categoryType = :categoryType) AND " +
            "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Post> searchPosts(@Param("categoryType") String categoryType,
                           @Param("keyword") String keyword);

}
