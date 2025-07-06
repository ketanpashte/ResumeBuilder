package com.resumebuilder.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class ResumeRequest {
    
    @NotBlank(message = "Resume title is required")
    @Size(max = 100, message = "Title must not exceed 100 characters")
    private String title;
    
    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;
    
    private String address;
    
    private String profileSummary;
    
    @Valid
    private List<EducationDto> educations;
    
    @Valid
    private List<WorkExperienceDto> workExperiences;
    
    @Valid
    private List<SkillDto> skills;
    
    @Valid
    private List<ProjectDto> projects;
    
    // Constructors
    public ResumeRequest() {}
    
    // Getters and Setters
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getProfileSummary() {
        return profileSummary;
    }
    
    public void setProfileSummary(String profileSummary) {
        this.profileSummary = profileSummary;
    }
    
    public List<EducationDto> getEducations() {
        return educations;
    }
    
    public void setEducations(List<EducationDto> educations) {
        this.educations = educations;
    }
    
    public List<WorkExperienceDto> getWorkExperiences() {
        return workExperiences;
    }
    
    public void setWorkExperiences(List<WorkExperienceDto> workExperiences) {
        this.workExperiences = workExperiences;
    }
    
    public List<SkillDto> getSkills() {
        return skills;
    }
    
    public void setSkills(List<SkillDto> skills) {
        this.skills = skills;
    }
    
    public List<ProjectDto> getProjects() {
        return projects;
    }
    
    public void setProjects(List<ProjectDto> projects) {
        this.projects = projects;
    }
}
