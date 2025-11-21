package com.lkads.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class ImageFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;   // any name for this record (optional)

    @OneToMany(mappedBy = "imageFile", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonBackReference
//    private List<ImageBlob> images = new ArrayList<>();
    @JsonManagedReference
    private List<ImageBlob> images;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @JsonBackReference
    private Post post;

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImages(List<ImageBlob> images) {
        this.images = images;
    }

    public List<ImageBlob> getImages() {
        return images;
    }
}
