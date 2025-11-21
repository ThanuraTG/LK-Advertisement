package com.lkads.dto;

import com.lkads.model.*;
import java.util.List;

public class FullPostDTO {
    private Post post;
    private VehiclePost vehiclePost;
    private RealEstatePost realEstatePost;
    private PhonePost phonePost;
    private ElectronicPost electronicPost;
    private List<ImageFile> images;

    // Getters / Setters
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }

    public VehiclePost getVehiclePost() { return vehiclePost; }
    public void setVehiclePost(VehiclePost vehiclePost) { this.vehiclePost = vehiclePost; }

    public RealEstatePost getRealEstatePost() { return realEstatePost; }
    public void setRealEstatePost(RealEstatePost realEstatePost) { this.realEstatePost = realEstatePost; }

    public PhonePost getPhonePost() { return phonePost; }
    public void setPhonePost(PhonePost phonePost) { this.phonePost = phonePost; }

    public ElectronicPost getElectronicPost() { return electronicPost; }
    public void setElectronicPost(ElectronicPost electronicPost) { this.electronicPost = electronicPost; }

    public List<ImageFile> getImages() { return images; }
    public void setImages(List<ImageFile> images) { this.images = images; }
}
