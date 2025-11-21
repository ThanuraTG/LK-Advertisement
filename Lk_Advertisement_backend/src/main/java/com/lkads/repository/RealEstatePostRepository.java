// repository/RealEstatePostRepository.java
package com.lkads.repository;

import com.lkads.model.RealEstatePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RealEstatePostRepository extends JpaRepository<RealEstatePost, Long> {
}