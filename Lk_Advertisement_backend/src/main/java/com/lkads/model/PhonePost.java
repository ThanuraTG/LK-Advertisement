// model/PhonePost.java
package com.lkads.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phone_posts")
@PrimaryKeyJoinColumn(name = "post_id")
public class PhonePost extends Post {
    private String brand;
    private String model;
    private String memory;
    private String battery;
    private String edition;

    @Column(name = "item_type")
    private String itemType;

    private String features;

    @Column(name = "camera_size")
    private String cameraSize;

    @Column(name = "image_urls")
    private String imageUrls; // JSON array of image URLs

    // Getters and Setters
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getMemory() { return memory; }
    public void setMemory(String memory) { this.memory = memory; }

    public String getBattery() { return battery; }
    public void setBattery(String battery) { this.battery = battery; }

    public String getEdition() { return edition; }
    public void setEdition(String edition) { this.edition = edition; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }

    public String getCameraSize() { return cameraSize; }
    public void setCameraSize(String cameraSize) { this.cameraSize = cameraSize; }

    public String getImageUrls() { return imageUrls; }
    public void setImageUrls(String imageUrls) { this.imageUrls = imageUrls; }
}