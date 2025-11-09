// controller/AuthController.java
package com.lkads.controller;

import com.lkads.dto.JwtResponse;
import com.lkads.dto.LoginRequest;
import com.lkads.dto.RegisterRequest;
import com.lkads.model.User;
import com.lkads.service.UserPrincipal;
import com.lkads.service.UserService;
import com.lkads.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        User user = (User) authentication.getPrincipal();
//
//
//        String jwt = jwtUtil.generateJwtToken(authentication);
//
//        return ResponseEntity.ok(new JwtResponse(jwt,
//                user.getId(),
//                user.getUsername(),
//                user.getEmail(),
//                user.getFirstName(),
//                user.getProfileImage()));
//    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal(); // ✅ correct
        String jwt = jwtUtil.generateJwtToken(authentication);

        // Use data from userPrincipal
        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userPrincipal.getId(),
                userPrincipal.getUsername(),
//                userPrincipal.getEmail(),
//                userPrincipal.getFirstName(),
//                userPrincipal.getProfileImage()
                "", // Email not available in UserPrincipal
                "", // First name
                ""  // Profile image
        ));
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setEmail(registerRequest.getEmail());
        user.setAddress(registerRequest.getAddress());
        user.setGender(registerRequest.getGender());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setCity(registerRequest.getCity());

        userService.createUser(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}