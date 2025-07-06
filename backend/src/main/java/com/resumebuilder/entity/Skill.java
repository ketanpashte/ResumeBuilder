package com.resumebuilder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "skills")
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;
    
    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name must not exceed 100 characters")
    @Column(name = "skill_name", nullable = false, length = 100)
    private String skillName;
    
    @Size(max = 50, message = "Skill category must not exceed 50 characters")
    @Column(name = "skill_category", length = 50)
    private String skillCategory;
    
    @Size(max = 20, message = "Proficiency level must not exceed 20 characters")
    @Column(name = "proficiency_level", length = 20)
    private String proficiencyLevel;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    // Constructors
    public Skill() {}
    
    public Skill(Resume resume, String skillName) {
        this.resume = resume;
        this.skillName = skillName;
    }
    
    public Skill(Resume resume, String skillName, String skillCategory, String proficiencyLevel) {
        this.resume = resume;
        this.skillName = skillName;
        this.skillCategory = skillCategory;
        this.proficiencyLevel = proficiencyLevel;
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
    
    public String getSkillName() {
        return skillName;
    }
    
    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
    
    public String getSkillCategory() {
        return skillCategory;
    }
    
    public void setSkillCategory(String skillCategory) {
        this.skillCategory = skillCategory;
    }
    
    public String getProficiencyLevel() {
        return proficiencyLevel;
    }
    
    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }
    
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
