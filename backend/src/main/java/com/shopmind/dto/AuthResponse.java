package com.shopmind.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private Long branchId;

    public AuthResponse(String token, String username, String email, String fullName, String role, Long branchId) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.branchId = branchId;
    }

    public String getToken() { return token; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getRole() { return role; }
    public Long getBranchId() { return branchId; }
}
