// model/ElectronicPost.java
package com.lkads.model;

import jakarta.persistence.*;

@Entity
@Table(name = "electronic_posts")
@PrimaryKeyJoinColumn(name = "post_id")
public class ElectronicPost extends Post {
    private String brand;

    @Column(name = "device_type")
    private String deviceType;

//    private String title;
    private String type;
    private String model;

    @Column(name = "screen_size")
    private String screenSize;

    // Getters and Setters
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getDeviceType() { return deviceType; }
    public void setDeviceType(String deviceType) { this.deviceType = deviceType; }

//    public String getTitle() { return title; }
//    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getScreenSize() { return screenSize; }
    public void setScreenSize(String screenSize) { this.screenSize = screenSize; }
}