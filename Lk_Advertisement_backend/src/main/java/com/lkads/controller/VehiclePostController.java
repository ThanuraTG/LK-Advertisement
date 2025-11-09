// controller/VehiclePostController.java
package com.lkads.controller;

import com.lkads.model.VehiclePost;
import com.lkads.service.VehiclePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicle-posts")
@CrossOrigin(origins = "*", maxAge = 3600)
public class VehiclePostController {

    @Autowired
    private VehiclePostService vehiclePostService;

    @GetMapping
    public List<VehiclePost> getAllVehiclePosts() {
        return vehiclePostService.getAllVehiclePosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiclePost> getVehiclePostById(@PathVariable Long id) {
        Optional<VehiclePost> vehiclePost = vehiclePostService.getVehiclePostById(id);
        return vehiclePost.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public VehiclePost createVehiclePost(@RequestBody VehiclePost vehiclePost) {
        return vehiclePostService.createVehiclePost(vehiclePost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehiclePost(@PathVariable Long id) {
        vehiclePostService.deleteVehiclePost(id);
        return ResponseEntity.ok().build();
    }
}