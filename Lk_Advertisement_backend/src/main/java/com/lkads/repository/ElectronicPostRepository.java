// repository/ElectronicPostRepository.java
package com.lkads.repository;

import com.lkads.model.ElectronicPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectronicPostRepository extends JpaRepository<ElectronicPost, Long> {
}