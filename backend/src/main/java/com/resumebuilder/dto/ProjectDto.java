package com.resumebuilder.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ProjectDto {
    
    private Long id;
    
    @NotBlank(message = "Project title is required")
    @Size(max = 150, message = "Project title must not exceed 150 characters")
    private String projectTitle;
    
    private String description;
    
    private String technologiesUsed;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    @Size(max = 255, message = "Project URL must not exceed 255 characters")
    private String projectUrl;
    
    @Size(max = 255, message = "GitHub URL must not exceed 255 characters")
    private String githubUrl;
    
    private Integer displayOrder = 0;
    
    // Constructors
    public ProjectDto() {}
    
    public ProjectDto(String projectTitle) {
        this.projectTitle = projectTitle;
    }
    
    public ProjectDto(String projectTitle, String description, String technologiesUsed) {
        this.projectTitle = projectTitle;
        this.description = description;
        this.technologiesUsed = technologiesUsed;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getProjectTitle() {
        return projectTitle;
    }
    
    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getTechnologiesUsed() {
        return technologiesUsed;
    }
    
    public void setTechnologiesUsed(String technologiesUsed) {
        this.technologiesUsed = technologiesUsed;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    
    public String getProjectUrl() {
        return projectUrl;
    }
    
    public void setProjectUrl(String projectUrl) {
        this.projectUrl = projectUrl;
    }
    
    public String getGithubUrl() {
        return githubUrl;
    }
    
    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
    
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
