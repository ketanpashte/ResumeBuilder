package com.resumebuilder.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SkillDto {
    
    private Long id;
    
    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name must not exceed 100 characters")
    private String skillName;
    
    @Size(max = 50, message = "Skill category must not exceed 50 characters")
    private String skillCategory;
    
    @Size(max = 20, message = "Proficiency level must not exceed 20 characters")
    private String proficiencyLevel;
    
    private Integer displayOrder = 0;
    
    // Constructors
    public SkillDto() {}
    
    public SkillDto(String skillName) {
        this.skillName = skillName;
    }
    
    public SkillDto(String skillName, String skillCategory, String proficiencyLevel) {
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
