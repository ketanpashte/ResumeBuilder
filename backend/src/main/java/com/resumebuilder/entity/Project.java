package com.resumebuilder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "projects")
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;
    
    @NotBlank(message = "Project title is required")
    @Size(max = 150, message = "Project title must not exceed 150 characters")
    @Column(name = "project_title", nullable = false, length = 150)
    private String projectTitle;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "technologies_used", columnDefinition = "TEXT")
    private String technologiesUsed;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Size(max = 255, message = "Project URL must not exceed 255 characters")
    @Column(name = "project_url")
    private String projectUrl;
    
    @Size(max = 255, message = "GitHub URL must not exceed 255 characters")
    @Column(name = "github_url")
    private String githubUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    // Constructors
    public Project() {}
    
    public Project(Resume resume, String projectTitle) {
        this.resume = resume;
        this.projectTitle = projectTitle;
    }
    
    public Project(Resume resume, String projectTitle, String description, String technologiesUsed) {
        this.resume = resume;
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
    
    public Resume getResume() {
        return resume;
    }
    
    public void setResume(Resume resume) {
        this.resume = resume;
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
    
    public String getDateRange() {
        if (startDate == null) {
            return null;
        }
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        String start = startDate.format(formatter);
        
        if (endDate != null) {
            return start + " - " + endDate.format(formatter);
        } else {
            return start + " - Present";
        }
    }
}
