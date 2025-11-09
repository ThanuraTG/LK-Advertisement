// repository/PhonePostRepository.java
package com.lkads.repository;

import com.lkads.model.PhonePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhonePostRepository extends JpaRepository<PhonePost, Long> {
}