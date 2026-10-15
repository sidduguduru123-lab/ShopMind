package com.shopmind.service;

import com.shopmind.dto.LoginRequest;
import com.shopmind.dto.RegisterRequest;
import com.shopmind.entity.Role;
import com.shopmind.entity.User;
import com.shopmind.repository.UserRepository;
import com.shopmind.security.JwtService;
import com.shopmind.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired private UserRepository userRepo;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authManager;
    @Autowired private UserDetailsServiceImpl userDetailsService;

    public Map<String, Object> login(LoginRequest req) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );
        User user = userRepo.findByUsername(req.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtService.generateToken(userDetails);
        return buildAuthResponse(user, token);
    }

    public Map<String, Object> register(RegisterRequest req) {
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        Role role = Role.CUSTOMER;
        try { role = Role.valueOf(req.getRole().toUpperCase()); } catch (Exception ignored) {}

        User user = new User(
            req.getUsername(), req.getEmail(),
            passwordEncoder.encode(req.getPassword()),
            req.getFullName(), role,
            req.getBranchId() != null ? req.getBranchId() : 1L
        );
        userRepo.save(user);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtService.generateToken(userDetails);
        return buildAuthResponse(user, token);
    }

    private Map<String, Object> buildAuthResponse(User user, String token) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("userId", user.getId());
        resp.put("username", user.getUsername());
        resp.put("email", user.getEmail());
        resp.put("fullName", user.getFullName());
        resp.put("role", user.getRole().name());
        resp.put("branchId", user.getBranchId());
        return resp;
    }
}
