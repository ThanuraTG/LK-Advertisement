
// model/RealEstatePost.java
package com.lkads.model;

import jakarta.persistence.*;

@Entity
@Table(name = "real_estate_posts")
@PrimaryKeyJoinColumn(name = "post_id")
public class RealEstatePost extends Post {
    private String type; // House, Land, Apartment, etc.
    private Integer bedrooms;
    private Integer bathrooms;

    @Column(name = "lot_size")
    private String lotSize;

    private String address;

    @Column(name = "image_url")
    private String imageUrl;

    // Constructors
    public RealEstatePost() {
        super();
    }

    public RealEstatePost(String title, String description, Double price, String condition,
                          User user, String categoryType, String subCategory,
                          String type, Integer bedrooms, Integer bathrooms,
                          String lotSize, String address, String imageUrl) {
        super(title, description, price, condition, user, categoryType, subCategory);
        this.type = type;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.lotSize = lotSize;
        this.address = address;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }

    public Integer getBathrooms() { return bathrooms; }
    public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }

    public String getLotSize() { return lotSize; }
    public void setLotSize(String lotSize) { this.lotSize = lotSize; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
