package com.resumebuilder.service;

import com.resumebuilder.dto.*;
import com.resumebuilder.entity.*;
import com.resumebuilder.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ResumeService {
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    public List<Resume> getAllResumesByUser(User user) {
        return resumeRepository.findByUserOrderByUpdatedAtDesc(user);
    }
    
    public List<Resume> getAllResumesByUserId(Long userId) {
        return resumeRepository.findByUserIdOrderByUpdatedAtDesc(userId);
    }
    
    public Optional<Resume> getResumeByIdAndUserId(Long id, Long userId) {
        return resumeRepository.findByIdAndUserId(id, userId);
    }
    
    public List<Resume> searchResumes(Long userId, String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllResumesByUserId(userId);
        }
        return resumeRepository.findByUserIdAndSearchTerm(userId, searchTerm.trim());
    }
    
    public Resume createResume(User user, ResumeRequest request) {
        Resume resume = new Resume();
        resume.setUser(user);
        updateResumeFromRequest(resume, request);
        return resumeRepository.save(resume);
    }
    
    public Resume updateResume(Long id, Long userId, ResumeRequest request) {
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        
        updateResumeFromRequest(resume, request);
        return resumeRepository.save(resume);
    }
    
    public void deleteResume(Long id, Long userId) {
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        resumeRepository.delete(resume);
    }
    
    private void updateResumeFromRequest(Resume resume, ResumeRequest request) {
        // Update basic info
        resume.setTitle(request.getTitle());
        resume.setFullName(request.getFullName());
        resume.setEmail(request.getEmail());
        resume.setPhone(request.getPhone());
        resume.setAddress(request.getAddress());
        resume.setProfileSummary(request.getProfileSummary());
        
        // Clear existing collections
        resume.getEducations().clear();
        resume.getWorkExperiences().clear();
        resume.getSkills().clear();
        resume.getProjects().clear();
        
        // Add educations
        if (request.getEducations() != null) {
            List<Education> educations = request.getEducations().stream()
                    .map(dto -> {
                        Education education = new Education();
                        education.setResume(resume);
                        education.setDegree(dto.getDegree());
                        education.setInstitution(dto.getInstitution());
                        education.setStartYear(dto.getStartYear());
                        education.setEndYear(dto.getEndYear());
                        education.setGrade(dto.getGrade());
                        education.setDescription(dto.getDescription());
                        education.setDisplayOrder(dto.getDisplayOrder());
                        return education;
                    })
                    .collect(Collectors.toList());
            resume.getEducations().addAll(educations);
        }
        
        // Add work experiences
        if (request.getWorkExperiences() != null) {
            List<WorkExperience> workExperiences = request.getWorkExperiences().stream()
                    .map(dto -> {
                        WorkExperience workExp = new WorkExperience();
                        workExp.setResume(resume);
                        workExp.setJobTitle(dto.getJobTitle());
                        workExp.setCompany(dto.getCompany());
                        workExp.setStartDate(dto.getStartDate());
                        workExp.setEndDate(dto.getEndDate());
                        workExp.setIsCurrent(dto.getIsCurrent());
                        workExp.setDescription(dto.getDescription());
                        workExp.setDisplayOrder(dto.getDisplayOrder());
                        return workExp;
                    })
                    .collect(Collectors.toList());
            resume.getWorkExperiences().addAll(workExperiences);
        }
        
        // Add skills
        if (request.getSkills() != null) {
            List<Skill> skills = request.getSkills().stream()
                    .map(dto -> {
                        Skill skill = new Skill();
                        skill.setResume(resume);
                        skill.setSkillName(dto.getSkillName());
                        skill.setSkillCategory(dto.getSkillCategory());
                        skill.setProficiencyLevel(dto.getProficiencyLevel());
                        skill.setDisplayOrder(dto.getDisplayOrder());
                        return skill;
                    })
                    .collect(Collectors.toList());
            resume.getSkills().addAll(skills);
        }
        
        // Add projects
        if (request.getProjects() != null) {
            List<Project> projects = request.getProjects().stream()
                    .map(dto -> {
                        Project project = new Project();
                        project.setResume(resume);
                        project.setProjectTitle(dto.getProjectTitle());
                        project.setDescription(dto.getDescription());
                        project.setTechnologiesUsed(dto.getTechnologiesUsed());
                        project.setStartDate(dto.getStartDate());
                        project.setEndDate(dto.getEndDate());
                        project.setProjectUrl(dto.getProjectUrl());
                        project.setGithubUrl(dto.getGithubUrl());
                        project.setDisplayOrder(dto.getDisplayOrder());
                        return project;
                    })
                    .collect(Collectors.toList());
            resume.getProjects().addAll(projects);
        }
    }
    
    public long getResumeCountByUserId(Long userId) {
        return resumeRepository.countByUserId(userId);
    }
}
