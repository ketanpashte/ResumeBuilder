package com.resumebuilder.service;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.resumebuilder.entity.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfGenerationService {
    
    private static final DeviceRgb HEADER_COLOR = new DeviceRgb(41, 128, 185);
    private static final DeviceRgb SECTION_COLOR = new DeviceRgb(52, 73, 94);
    private static final float MARGIN = 36f;
    
    public byte[] generateResumePdf(Resume resume) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc);
        
        // Set margins
        document.setMargins(MARGIN, MARGIN, MARGIN, MARGIN);
        
        // Fonts
        PdfFont boldFont = PdfFontFactory.createFont("Helvetica-Bold");
        PdfFont regularFont = PdfFontFactory.createFont("Helvetica");
        
        // Header Section
        addHeader(document, resume, boldFont, regularFont);
        
        // Profile Summary
        if (resume.getProfileSummary() != null && !resume.getProfileSummary().trim().isEmpty()) {
            addProfileSummary(document, resume.getProfileSummary(), boldFont, regularFont);
        }
        
        // Education Section
        if (!resume.getEducations().isEmpty()) {
            addEducationSection(document, resume.getEducations(), boldFont, regularFont);
        }
        
        // Work Experience Section
        if (!resume.getWorkExperiences().isEmpty()) {
            addWorkExperienceSection(document, resume.getWorkExperiences(), boldFont, regularFont);
        }
        
        // Skills Section
        if (!resume.getSkills().isEmpty()) {
            addSkillsSection(document, resume.getSkills(), boldFont, regularFont);
        }
        
        // Projects Section
        if (!resume.getProjects().isEmpty()) {
            addProjectsSection(document, resume.getProjects(), boldFont, regularFont);
        }
        
        document.close();
        return baos.toByteArray();
    }
    
    private void addHeader(Document document, Resume resume, PdfFont boldFont, PdfFont regularFont) {
        // Name
        Paragraph name = new Paragraph(resume.getFullName())
                .setFont(boldFont)
                .setFontSize(24)
                .setFontColor(HEADER_COLOR)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(5);
        document.add(name);
        
        // Contact Information
        StringBuilder contactInfo = new StringBuilder();
        contactInfo.append(resume.getEmail());
        
        if (resume.getPhone() != null && !resume.getPhone().trim().isEmpty()) {
            contactInfo.append(" | ").append(resume.getPhone());
        }
        
        if (resume.getAddress() != null && !resume.getAddress().trim().isEmpty()) {
            contactInfo.append(" | ").append(resume.getAddress());
        }
        
        Paragraph contact = new Paragraph(contactInfo.toString())
                .setFont(regularFont)
                .setFontSize(11)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20);
        document.add(contact);
        
        // Horizontal line
        Table line = new Table(1);
        line.setWidth(UnitValue.createPercentValue(100));
        Cell lineCell = new Cell().setBorder(null);
        lineCell.setBackgroundColor(HEADER_COLOR);
        lineCell.setHeight(2);
        line.addCell(lineCell);
        document.add(line);
    }
    
    private void addProfileSummary(Document document, String profileSummary, PdfFont boldFont, PdfFont regularFont) {
        addSectionHeader(document, "PROFILE SUMMARY", boldFont);
        
        Paragraph summary = new Paragraph(profileSummary)
                .setFont(regularFont)
                .setFontSize(11)
                .setMarginBottom(15)
                .setTextAlignment(TextAlignment.JUSTIFIED);
        document.add(summary);
    }
    
    private void addEducationSection(Document document, java.util.List<Education> educations, PdfFont boldFont, PdfFont regularFont) {
        addSectionHeader(document, "EDUCATION", boldFont);
        
        for (Education education : educations) {
            // Degree and Institution
            Paragraph degreeInfo = new Paragraph()
                    .add(new com.itextpdf.layout.element.Text(education.getDegree()).setFont(boldFont).setFontSize(12))
                    .add(new com.itextpdf.layout.element.Text(" | " + education.getInstitution()).setFont(regularFont).setFontSize(11))
                    .setMarginBottom(2);
            document.add(degreeInfo);
            
            // Year and Grade
            StringBuilder details = new StringBuilder();
            details.append(education.getYearRange());
            
            if (education.getGrade() != null && !education.getGrade().trim().isEmpty()) {
                details.append(" | Grade: ").append(education.getGrade());
            }
            
            Paragraph yearGrade = new Paragraph(details.toString())
                    .setFont(regularFont)
                    .setFontSize(10)
                    .setFontColor(ColorConstants.DARK_GRAY)
                    .setMarginBottom(5);
            document.add(yearGrade);
            
            // Description
            if (education.getDescription() != null && !education.getDescription().trim().isEmpty()) {
                Paragraph description = new Paragraph(education.getDescription())
                        .setFont(regularFont)
                        .setFontSize(10)
                        .setMarginBottom(10);
                document.add(description);
            } else {
                document.add(new Paragraph().setMarginBottom(10));
            }
        }
    }
    
    private void addWorkExperienceSection(Document document, java.util.List<WorkExperience> workExperiences, PdfFont boldFont, PdfFont regularFont) {
        addSectionHeader(document, "WORK EXPERIENCE", boldFont);
        
        for (WorkExperience workExp : workExperiences) {
            // Job Title and Company
            Paragraph jobInfo = new Paragraph()
                    .add(new com.itextpdf.layout.element.Text(workExp.getJobTitle()).setFont(boldFont).setFontSize(12))
                    .add(new com.itextpdf.layout.element.Text(" | " + workExp.getCompany()).setFont(regularFont).setFontSize(11))
                    .setMarginBottom(2);
            document.add(jobInfo);
            
            // Date Range
            Paragraph dateRange = new Paragraph(workExp.getDateRange())
                    .setFont(regularFont)
                    .setFontSize(10)
                    .setFontColor(ColorConstants.DARK_GRAY)
                    .setMarginBottom(5);
            document.add(dateRange);
            
            // Description
            if (workExp.getDescription() != null && !workExp.getDescription().trim().isEmpty()) {
                Paragraph description = new Paragraph(workExp.getDescription())
                        .setFont(regularFont)
                        .setFontSize(10)
                        .setMarginBottom(15);
                document.add(description);
            } else {
                document.add(new Paragraph().setMarginBottom(15));
            }
        }
    }
    
    private void addSkillsSection(Document document, java.util.List<Skill> skills, PdfFont boldFont, PdfFont regularFont) {
        addSectionHeader(document, "SKILLS", boldFont);
        
        // Group skills by category
        java.util.Map<String, java.util.List<Skill>> skillsByCategory = skills.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                    skill -> skill.getSkillCategory() != null ? skill.getSkillCategory() : "General"
                ));
        
        for (java.util.Map.Entry<String, java.util.List<Skill>> entry : skillsByCategory.entrySet()) {
            // Category header
            if (skillsByCategory.size() > 1) {
                Paragraph categoryHeader = new Paragraph(entry.getKey() + ":")
                        .setFont(boldFont)
                        .setFontSize(11)
                        .setMarginBottom(3);
                document.add(categoryHeader);
            }
            
            // Skills list
            StringBuilder skillsList = new StringBuilder();
            for (int i = 0; i < entry.getValue().size(); i++) {
                Skill skill = entry.getValue().get(i);
                skillsList.append(skill.getSkillName());
                
                if (skill.getProficiencyLevel() != null && !skill.getProficiencyLevel().trim().isEmpty()) {
                    skillsList.append(" (").append(skill.getProficiencyLevel()).append(")");
                }
                
                if (i < entry.getValue().size() - 1) {
                    skillsList.append(", ");
                }
            }
            
            Paragraph skillsText = new Paragraph(skillsList.toString())
                    .setFont(regularFont)
                    .setFontSize(10)
                    .setMarginBottom(10);
            document.add(skillsText);
        }
    }
    
    private void addProjectsSection(Document document, java.util.List<Project> projects, PdfFont boldFont, PdfFont regularFont) {
        addSectionHeader(document, "PROJECTS", boldFont);
        
        for (Project project : projects) {
            // Project Title
            Paragraph projectTitle = new Paragraph(project.getProjectTitle())
                    .setFont(boldFont)
                    .setFontSize(12)
                    .setMarginBottom(2);
            document.add(projectTitle);
            
            // Date Range and Technologies
            StringBuilder details = new StringBuilder();
            if (project.getDateRange() != null) {
                details.append(project.getDateRange());
            }
            
            if (project.getTechnologiesUsed() != null && !project.getTechnologiesUsed().trim().isEmpty()) {
                if (details.length() > 0) {
                    details.append(" | ");
                }
                details.append("Technologies: ").append(project.getTechnologiesUsed());
            }
            
            if (details.length() > 0) {
                Paragraph projectDetails = new Paragraph(details.toString())
                        .setFont(regularFont)
                        .setFontSize(10)
                        .setFontColor(ColorConstants.DARK_GRAY)
                        .setMarginBottom(5);
                document.add(projectDetails);
            }
            
            // Description
            if (project.getDescription() != null && !project.getDescription().trim().isEmpty()) {
                Paragraph description = new Paragraph(project.getDescription())
                        .setFont(regularFont)
                        .setFontSize(10)
                        .setMarginBottom(10);
                document.add(description);
            }
            
            // URLs
            if ((project.getProjectUrl() != null && !project.getProjectUrl().trim().isEmpty()) ||
                (project.getGithubUrl() != null && !project.getGithubUrl().trim().isEmpty())) {
                
                StringBuilder urls = new StringBuilder();
                if (project.getProjectUrl() != null && !project.getProjectUrl().trim().isEmpty()) {
                    urls.append("Project URL: ").append(project.getProjectUrl());
                }
                
                if (project.getGithubUrl() != null && !project.getGithubUrl().trim().isEmpty()) {
                    if (urls.length() > 0) {
                        urls.append(" | ");
                    }
                    urls.append("GitHub: ").append(project.getGithubUrl());
                }
                
                Paragraph urlsText = new Paragraph(urls.toString())
                        .setFont(regularFont)
                        .setFontSize(9)
                        .setFontColor(ColorConstants.BLUE)
                        .setMarginBottom(15);
                document.add(urlsText);
            } else {
                document.add(new Paragraph().setMarginBottom(15));
            }
        }
    }
    
    private void addSectionHeader(Document document, String title, PdfFont boldFont) {
        Paragraph sectionHeader = new Paragraph(title)
                .setFont(boldFont)
                .setFontSize(14)
                .setFontColor(SECTION_COLOR)
                .setMarginTop(15)
                .setMarginBottom(10);
        document.add(sectionHeader);
        
        // Section underline
        Table line = new Table(1);
        line.setWidth(UnitValue.createPercentValue(100));
        Cell lineCell = new Cell().setBorder(null);
        lineCell.setBackgroundColor(SECTION_COLOR);
        lineCell.setHeight(1);
        line.addCell(lineCell);
        document.add(line);
    }
}
