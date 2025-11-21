package com.lkads.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ImageBlob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String filePath;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_file_id")
    @JsonBackReference
    private ImageFile imageFile;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public byte[] getData() {return data;}
    public void setData(byte[] data) {this.data = data;}

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public ImageFile getImageFile() {return imageFile;}
    public void setImageFile(ImageFile imageFile) {this.imageFile = imageFile;}
}

