
// model/VehiclePost.java
package com.lkads.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_posts")
@PrimaryKeyJoinColumn(name = "post_id")
public class VehiclePost extends Post {
    private String make;
    private String model;
    private String type;
    private Integer mileage;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "engine_capacity")
    private String engineCapacity;

    private String trim;
    private String transmission;

    @Column(name = "image_url")
    private String imageUrl;

    // Constructors
    public VehiclePost() {
        super();
    }

    public VehiclePost(String title, String description, Double price, String condition,
                       User user, String categoryType, String subCategory,
                       String make, String model, String type, Integer mileage,
                       String fuelType, String engineCapacity, String trim,
                       String transmission, String imageUrl) {
        super(title, description, price, condition, user, categoryType, subCategory);
        this.make = make;
        this.model = model;
        this.type = type;
        this.mileage = mileage;
        this.fuelType = fuelType;
        this.engineCapacity = engineCapacity;
        this.trim = trim;
        this.transmission = transmission;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getMileage() { return mileage; }
    public void setMileage(Integer mileage) { this.mileage = mileage; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getEngineCapacity() { return engineCapacity; }
    public void setEngineCapacity(String engineCapacity) { this.engineCapacity = engineCapacity; }

    public String getTrim() { return trim; }
    public void setTrim(String trim) { this.trim = trim; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}