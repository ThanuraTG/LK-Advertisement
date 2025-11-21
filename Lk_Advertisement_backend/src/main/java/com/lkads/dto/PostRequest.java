// dto/PostRequest.java
package com.lkads.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PostRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Price is required")
    private Double price;

    @NotBlank(message = "Category type is required")
    private String categoryType;

    private String condition;
    private String description;
    private String location;
    private String subCategory;

    private String contactName;
    private String contactEmail;
    private String contactPhone;
    private String contactWhatsapp;

    // Vehicle specific fields
    private String make;
    private String model;
    private String type;
    private Integer mileage;
    private String fuelType;
    private String engineCapacity;
    private String trim;
    private String transmission;
    private String imageUrl;

    // Real Estate specific fields
    private String realEstateType;
    private Integer bedrooms;
    private Integer bathrooms;
    private String lotSize;
    private String address;

    // Phone specific fields
    private String brand;
    private String memory;
    private String battery;
    private String edition;
    private String itemType;
    private String features;
    private String cameraSize;
    private String imageUrls;

    // Electronic specific fields
    private String deviceType;
    private String screenSize;

    // Getters and Setters for common fields
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }


    public String getCategoryType() { return categoryType; }
    public void setCategoryType(String categoryType) { this.categoryType = categoryType; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactWhatsapp() { return contactWhatsapp; }
    public void setContactWhatsapp(String contactWhatsapp) { this.contactWhatsapp = contactWhatsapp; }

    // Vehicle specific getters and setters
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

    // Real Estate specific getters and setters
    public String getRealEstateType() { return realEstateType; }
    public void setRealEstateType(String realEstateType) { this.realEstateType = realEstateType; }

    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }

    public Integer getBathrooms() { return bathrooms; }
    public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }

    public String getLotSize() { return lotSize; }
    public void setLotSize(String lotSize) { this.lotSize = lotSize; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    // Phone specific getters and setters
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

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

    // Electronic specific getters and setters
    public String getDeviceType() { return deviceType; }
    public void setDeviceType(String deviceType) { this.deviceType = deviceType; }

    public String getScreenSize() { return screenSize; }
    public void setScreenSize(String screenSize) { this.screenSize = screenSize; }
}