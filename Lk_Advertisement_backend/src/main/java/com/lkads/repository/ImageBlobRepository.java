package com.lkads.repository;

import com.lkads.model.ImageBlob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageBlobRepository extends JpaRepository<ImageBlob, Long> {
}

