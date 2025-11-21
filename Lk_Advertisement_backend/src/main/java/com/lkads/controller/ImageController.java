package com.lkads.controller;


import com.lkads.model.ImageBlob;
import com.lkads.model.ImageFile;
import com.lkads.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService service;


    // ✅ POST - Create new record + upload multiple images
    @PostMapping("/create")
    public ResponseEntity<?> create(
            @RequestParam String title,
            @RequestParam Long id,
            @RequestParam("files") MultipartFile[] files) {

        try {
            return ResponseEntity.ok(service.createRecordForPost(title, id, files));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Create failed");
        }
    }

    // ✅ GET all images for a given post
    @GetMapping("/post/{id}")
    public ResponseEntity<List<ImageFile>> getImagesByPost(@PathVariable Long id) {
        List<ImageFile> images = service.getImagesByPostId(id);
        if (images.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(images);
    }

    // ✅ GET only first image for a given post
    @GetMapping(value = "/post/{id}/first", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getFirstImageByPost(@PathVariable Long id) {
        byte[] data = service.getFirstImageOfPost(id);
        if (data == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(data);
    }

    // ✅ POST - Add more images to existing ID
    @PostMapping("/{id}/add")
    public ResponseEntity<?> addImages(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files) {

        try {
            ImageFile updated = service.addImages(id, files);
            if (updated == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Add failed");
        }
    }


    // ✅ GET - one record + all images
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        ImageFile rec = service.getOne(id);
        if (rec == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(rec);
    }

    // ✅ NEW: GET - single image by imageId
    @GetMapping(value = "/image/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getSingleImage(@PathVariable Long imageId) {
        byte[] data = service.getImageDataById(imageId);
        if (data == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(data);
    }

    // ✅ DELETE one image
    @DeleteMapping("/image/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Long imageId) {
        boolean ok = service.deleteOneImage(imageId);
        return ok ? ResponseEntity.ok("Deleted") : ResponseEntity.notFound().build();
    }


    // ✅ DELETE full record
    @DeleteMapping("/record/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id) {
        boolean ok = service.deleteRecord(id);
        return ok ? ResponseEntity.ok("Record deleted") : ResponseEntity.notFound().build();
    }

    @GetMapping("/post/{postId}/urls")
    public ResponseEntity<?> getImageUrls(@PathVariable Long postId) {
        List<ImageFile> files = service.getImagesByPostId(postId);

        List<String> urls = new ArrayList<>();

        for (ImageFile f : files) {
            for (ImageBlob b : f.getImages()) {
                urls.add("/api/images/image/" + b.getId());
            }
        }

        return ResponseEntity.ok(urls);
    }


    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

