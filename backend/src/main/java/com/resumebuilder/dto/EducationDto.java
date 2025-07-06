package com.resumebuilder.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EducationDto {
    
    private Long id;
    
    @NotBlank(message = "Degree is required")
    @Size(max = 100, message = "Degree must not exceed 100 characters")
    private String degree;
    
    @NotBlank(message = "Institution is required")
    @Size(max = 150, message = "Institution must not exceed 150 characters")
    private String institution;
    
    @NotNull(message = "Start year is required")
    private Integer startYear;
    
    private Integer endYear;
    
    @Size(max = 20, message = "Grade must not exceed 20 characters")
    private String grade;
    
    private String description;
    
    private Integer displayOrder = 0;
    
    // Constructors
    public EducationDto() {}
    
    public EducationDto(String degree, String institution, Integer startYear) {
        this.degree = degree;
        this.institution = institution;
        this.startYear = startYear;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDegree() {
        return degree;
    }
    
    public void setDegree(String degree) {
        this.degree = degree;
    }
    
    public String getInstitution() {
        return institution;
    }
    
    public void setInstitution(String institution) {
        this.institution = institution;
    }
    
    public Integer getStartYear() {
        return startYear;
    }
    
    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }
    
    public Integer getEndYear() {
        return endYear;
    }
    
    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }
    
    public String getGrade() {
        return grade;
    }
    
    public void setGrade(String grade) {
        this.grade = grade;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
