package com.resumebuilder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "education")
public class Education {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;
    
    @NotBlank(message = "Degree is required")
    @Size(max = 100, message = "Degree must not exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String degree;
    
    @NotBlank(message = "Institution is required")
    @Size(max = 150, message = "Institution must not exceed 150 characters")
    @Column(nullable = false, length = 150)
    private String institution;
    
    @NotNull(message = "Start year is required")
    @Column(name = "start_year", nullable = false)
    private Integer startYear;
    
    @Column(name = "end_year")
    private Integer endYear;
    
    @Size(max = 20, message = "Grade must not exceed 20 characters")
    @Column(length = 20)
    private String grade;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    // Constructors
    public Education() {}
    
    public Education(Resume resume, String degree, String institution, Integer startYear) {
        this.resume = resume;
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
    
    public Resume getResume() {
        return resume;
    }
    
    public void setResume(Resume resume) {
        this.resume = resume;
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
    
    public String getYearRange() {
        if (endYear != null) {
            return startYear + " - " + endYear;
        }
        return startYear + " - Present";
    }
}
