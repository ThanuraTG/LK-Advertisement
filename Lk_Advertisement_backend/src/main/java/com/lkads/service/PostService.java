
// service/PostService.java
package com.lkads.service;

import com.lkads.dto.PostRequest;
import com.lkads.model.*;
import com.lkads.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getPostsByCategory(String categoryType) {
        return postRepository.findByCategoryTypeOrderByCreatedAtDesc(categoryType);
    }

    public List<Post> getPostsByCategoryAndCondition(String categoryType, String condition) {
        return postRepository.findByCategoryTypeAndCondition(categoryType, condition);
    }

    public List<Post> getLatestPosts(int limit) {
        if (limit <= 0) limit = 10;
        Pageable pageable = PageRequest.of(0, limit);
        Page<Post> page = postRepository.findAllOrderByCreatedAtDesc(pageable);
        return page.getContent();
    }

    public List<Post> getPostsByCategoryAndSubCategory(String categoryType, String subCategory) {
        return postRepository.findByCategoryTypeAndSubCategoryOrderByCreatedAtDesc(categoryType, subCategory);
    }

    @Transactional
    public Post createPost(PostRequest postRequest, Long userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post;

        switch (postRequest.getCategoryType().toUpperCase()) {
            case "VEHICLE":
                VehiclePost vehiclePost = new VehiclePost();
                setCommonPostProperties(vehiclePost, postRequest, user);
                setVehiclePostProperties(vehiclePost, postRequest);
                post = vehiclePost;
                break;

            case "REAL_ESTATE":
                RealEstatePost realEstatePost = new RealEstatePost();
                setCommonPostProperties(realEstatePost, postRequest, user);
                setRealEstatePostProperties(realEstatePost, postRequest);
                post = realEstatePost;
                break;

            case "PHONE":
                PhonePost phonePost = new PhonePost();
                setCommonPostProperties(phonePost, postRequest, user);
                setPhonePostProperties(phonePost, postRequest);
                post = phonePost;
                break;

            case "ELECTRONIC":
                ElectronicPost electronicPost = new ElectronicPost();
                setCommonPostProperties(electronicPost, postRequest, user);
                setElectronicPostProperties(electronicPost, postRequest);
                post = electronicPost;
                break;

            default:
                throw new IllegalArgumentException("Invalid category type: " + postRequest.getCategoryType());
        }

        return postRepository.save(post);
    }

    private void setCommonPostProperties(Post post, PostRequest postRequest, User user) {
        post.setTitle(postRequest.getTitle());
        post.setDescription(postRequest.getDescription());
        post.setPrice(postRequest.getPrice());
        post.setCondition(postRequest.getCondition());
        post.setUser(user);
        post.setLocation(postRequest.getLocation());
        post.setCategoryType(postRequest.getCategoryType());
        post.setSubCategory(postRequest.getSubCategory());
        post.setContactName(postRequest.getContactName());
        post.setContactEmail(postRequest.getContactEmail());
        post.setContactPhone(postRequest.getContactPhone());
        post.setContactWhatsapp(postRequest.getContactWhatsapp());
    }

    private void setVehiclePostProperties(VehiclePost vehiclePost, PostRequest postRequest) {
        vehiclePost.setMake(postRequest.getMake());
        vehiclePost.setModel(postRequest.getModel());
        vehiclePost.setType(postRequest.getType());
        vehiclePost.setMileage(postRequest.getMileage());
        vehiclePost.setFuelType(postRequest.getFuelType());
        vehiclePost.setEngineCapacity(postRequest.getEngineCapacity());
        vehiclePost.setTrim(postRequest.getTrim());
        vehiclePost.setTransmission(postRequest.getTransmission());
        vehiclePost.setImageUrl(postRequest.getImageUrl());
    }

    private void setRealEstatePostProperties(RealEstatePost realEstatePost, PostRequest postRequest) {
        realEstatePost.setType(postRequest.getRealEstateType());
        realEstatePost.setBedrooms(postRequest.getBedrooms());
        realEstatePost.setBathrooms(postRequest.getBathrooms());
        realEstatePost.setLotSize(postRequest.getLotSize());
        realEstatePost.setAddress(postRequest.getAddress());
        realEstatePost.setImageUrl(postRequest.getImageUrl());
    }

    private void setPhonePostProperties(PhonePost phonePost, PostRequest postRequest) {
        phonePost.setBrand(postRequest.getBrand());
        phonePost.setModel(postRequest.getModel());
        phonePost.setMemory(postRequest.getMemory());
        phonePost.setBattery(postRequest.getBattery());
        phonePost.setEdition(postRequest.getEdition());
        phonePost.setItemType(postRequest.getItemType());
        phonePost.setFeatures(postRequest.getFeatures());
        phonePost.setCameraSize(postRequest.getCameraSize());
        phonePost.setImageUrls(postRequest.getImageUrls());
    }

    private void setElectronicPostProperties(ElectronicPost electronicPost, PostRequest postRequest) {
        electronicPost.setBrand(postRequest.getBrand());
        electronicPost.setDeviceType(postRequest.getDeviceType());
        electronicPost.setTitle(postRequest.getTitle());
        electronicPost.setType(postRequest.getType());
        electronicPost.setModel(postRequest.getModel());
        electronicPost.setScreenSize(postRequest.getScreenSize());
    }

    public Post updatePost(Long id, Post postDetails) {
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setTitle(postDetails.getTitle());
            post.setDescription(postDetails.getDescription());
            post.setPrice(postDetails.getPrice());
            post.setCondition(postDetails.getCondition());
            post.setUpdatedAt(java.time.LocalDateTime.now());
            return postRepository.save(post);
        }
        return null;
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}