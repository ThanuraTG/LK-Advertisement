// service/VehiclePostService.java
package com.lkads.service;

import com.lkads.model.VehiclePost;
import com.lkads.repository.VehiclePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiclePostService {

    @Autowired
    private VehiclePostRepository vehiclePostRepository;

    public List<VehiclePost> getAllVehiclePosts() {
        return vehiclePostRepository.findAll();
    }

    public Optional<VehiclePost> getVehiclePostById(Long id) {
        return vehiclePostRepository.findById(id);
    }

    public VehiclePost createVehiclePost(VehiclePost vehiclePost) {
        return vehiclePostRepository.save(vehiclePost);
    }

    public void deleteVehiclePost(Long id) {
        vehiclePostRepository.deleteById(id);
    }
}