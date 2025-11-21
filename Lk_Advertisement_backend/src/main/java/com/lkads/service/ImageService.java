package com.lkads.service;

import com.lkads.model.ImageBlob;
import com.lkads.model.ImageFile;
import com.lkads.model.Post;
import com.lkads.repository.ImageBlobRepository;
import com.lkads.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class ImageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private ImageRepository repo;

    @Autowired
    private ImageBlobRepository blobRepo;

    @PostConstruct
    public void createUploadFolder() {
        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
            System.out.println("✅ Upload folder created: " + uploadDir);
        }
    }

    // ✅ Create record + images
    public ImageFile createRecord(String title, MultipartFile[] files) throws IOException {

        ImageFile record = new ImageFile();
        record.setTitle(title);
        ImageFile saved = repo.save(record);

        saveImages(saved, files);
        return saved;
    }

    // ✅ Add images to existing record
    public ImageFile addImages(Long id, MultipartFile[] files) throws IOException {
        ImageFile record = repo.findById(id).orElse(null);
        if (record == null) return null;

        saveImages(record, files);
        return record;
    }

    // ✅ Reusable upload logic
    private void saveImages(ImageFile record, MultipartFile[] files) throws IOException {
        Path root = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(root);

        for (MultipartFile f : files) {

            String fileName = System.currentTimeMillis() + "_" + f.getOriginalFilename();
            Path fullPath = root.resolve(fileName);

            Files.copy(f.getInputStream(), fullPath, StandardCopyOption.REPLACE_EXISTING);

            ImageBlob blob = new ImageBlob();
            blob.setFileName(fileName);
            blob.setFileType(f.getContentType());
            blob.setFilePath(fullPath.toString());
            blob.setImageFile(record);

            blobRepo.save(blob);
        }
    }

    public ImageFile getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    // ✅ Get only single image bytes by imageId
    public byte[] getImageDataById(Long imageId) {
        ImageBlob blob = blobRepo.findById(imageId).orElse(null);
        if (blob == null) return null;
        if (blob.getData() != null) return blob.getData(); // from DB

        // fallback: read from file path if stored
        try {
            Path path = Paths.get(blob.getFilePath());
            return Files.readAllBytes(path);
        } catch (IOException e) {
            return null;
        }
    }

    public ImageFile createRecordForPost(String title, Long id, MultipartFile[] files) throws IOException {
        ImageFile record = new ImageFile();
        record.setTitle(title);

        // ✅ set linked post
        Post post = new Post();
        post.setId(id);
        record.setPost(post);

        ImageFile saved = repo.save(record);
        saveImages(saved, files);
        return saved;
    }

    public boolean deleteOneImage(Long imageId) {
        ImageBlob blob = blobRepo.findById(imageId).orElse(null);
        if (blob == null) return false;

        File f = new File(blob.getFilePath());
        if (f.exists()) f.delete();

        blobRepo.delete(blob);
        return true;
    }

    public boolean deleteRecord(Long id) {
        ImageFile rec = repo.findById(id).orElse(null);
        if (rec == null) return false;

        for (ImageBlob b : rec.getImages()) {
            File f = new File(b.getFilePath());
            if (f.exists()) f.delete();
        }
        repo.delete(rec);
        return true;
    }

    public List<ImageFile> getAll() {
        return repo.findAll();
    }

    public List<ImageFile> getImagesByPostId(Long id) {
        return repo.findByPostId(id);
    }

    // ✅ (Optional) get only one image (first) for a post
    public byte[] getFirstImageOfPost(Long id) {
        List<ImageFile> files = repo.findByPostId(id);
        if (files.isEmpty()) return null;

        ImageFile file = files.get(0);
        if (file.getImages().isEmpty()) return null;

        ImageBlob blob = file.getImages().get(0);
        if (blob.getData() != null) return blob.getData();

        try {
            Path path = Paths.get(blob.getFilePath());
            return Files.readAllBytes(path);
        } catch (IOException e) {
            return null;
        }
    }

}
