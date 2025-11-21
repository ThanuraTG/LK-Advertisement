//// dto/VehiclePostRequest.java
//package com.lkads.dto;
//
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//
//public class VehiclePostRequest {
//
//    // Post fields
//    @NotBlank(message = "Title is required")
//    private String title;
//
//    private String description;
//
//    @NotNull(message = "Price is required")
//    private Double price;
//
//    @NotBlank(message = "Condition is required")
//    private String condition;
//
//    @NotBlank(message = "Category type is required")
//    private String categoryType;
//
//    private String subCategory;
//
//    private String contactName;
//    private String contactEmail;
//    private String contactPhone;
//    private String contactWhatsapp;
//
//    // VehiclePost fields
//    @NotBlank(message = "Make is required")
//    private String make;
//
//    @NotBlank(message = "Model is required")
//    private String model;
//
//    private String type;
//    private Integer mileage;
//    private String fuelType;
//    private String engineCapacity;
//    private String trim;
//    private String transmission;
//    private String imageUrl;
//
//    // Getters and Setters
//    public String getTitle() { return title; }
//    public void setTitle(String title) { this.title = title; }
//
//    public String getDescription() { return description; }
//    public void setDescription(String description) { this.description = description; }
//
//    public Double getPrice() { return price; }
//    public void setPrice(Double price) { this.price = price; }
//
//    public String getCondition() { return condition; }
//    public void setCondition(String condition) { this.condition = condition; }
//
//    public String getCategoryType() { return categoryType; }
//    public void setCategoryType(String categoryType) { this.categoryType = categoryType; }
//
//    public String getSubCategory() { return subCategory; }
//    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }
//
//    public String getContactName() { return contactName; }
//    public void setContactName(String contactName) { this.contactName = contactName; }
//
//    public String getContactEmail() { return contactEmail; }
//    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
//
//    public String getContactPhone() { return contactPhone; }
//    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
//
//    public String getContactWhatsapp() { return contactWhatsapp; }
//    public void setContactWhatsapp(String contactWhatsapp) { this.contactWhatsapp = contactWhatsapp; }
//
//    public String getMake() { return make; }
//    public void setMake(String make) { this.make = make; }
//
//    public String getModel() { return model; }
//    public void setModel(String model) { this.model = model; }
//
//    public String getType() { return type; }
//    public void setType(String type) { this.type = type; }
//
//    public Integer getMileage() { return mileage; }
//    public void setMileage(Integer mileage) { this.mileage = mileage; }
//
//    public String getFuelType() { return fuelType; }
//    public void setFuelType(String fuelType) { this.fuelType = fuelType; }
//
//    public String getEngineCapacity() { return engineCapacity; }
//    public void setEngineCapacity(String engineCapacity) { this.engineCapacity = engineCapacity; }
//
//    public String getTrim() { return trim; }
//    public void setTrim(String trim) { this.trim = trim; }
//
//    public String getTransmission() { return transmission; }
//    public void setTransmission(String transmission) { this.transmission = transmission; }
//
//    public String getImageUrl() { return imageUrl; }
//    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
//}