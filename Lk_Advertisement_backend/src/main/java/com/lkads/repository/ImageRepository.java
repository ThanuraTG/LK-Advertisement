package com.lkads.repository;

import com.lkads.model.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImageRepository extends JpaRepository<ImageFile, Long> {
    List<ImageFile> findByPostId(Long id);
}
