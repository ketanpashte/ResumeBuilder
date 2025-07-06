package com.resumebuilder.controller;

import com.resumebuilder.dto.ResumeRequest;
import com.resumebuilder.entity.Resume;
import com.resumebuilder.entity.User;
import com.resumebuilder.service.PdfGenerationService;
import com.resumebuilder.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ResumeController {
    
    @Autowired
    private ResumeService resumeService;

    @Autowired
    private PdfGenerationService pdfGenerationService;
    
    @GetMapping
    public ResponseEntity<List<Resume>> getAllResumes(
            Authentication authentication,
            @RequestParam(required = false) String search) {
        
        User user = (User) authentication.getPrincipal();
        
        List<Resume> resumes;
        if (search != null && !search.trim().isEmpty()) {
            resumes = resumeService.searchResumes(user.getId(), search);
        } else {
            resumes = resumeService.getAllResumesByUser(user);
        }
        
        return ResponseEntity.ok(resumes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getResumeById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        Optional<Resume> resume = resumeService.getResumeByIdAndUserId(id, user.getId());
        
        if (resume.isPresent()) {
            return ResponseEntity.ok(resume.get());
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Resume not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createResume(
            @Valid @RequestBody ResumeRequest request,
            Authentication authentication) {
        
        try {
            User user = (User) authentication.getPrincipal();
            Resume resume = resumeService.createResume(user, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(resume);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request,
            Authentication authentication) {
        
        try {
            User user = (User) authentication.getPrincipal();
            Resume resume = resumeService.updateResume(id, user.getId(), request);
            return ResponseEntity.ok(resume);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            resumeService.deleteResume(id, user.getId());
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Resume deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error deleting resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getResumeStats(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalResumes", resumeService.getResumeCountByUserId(user.getId()));
        stats.put("userId", user.getId());
        stats.put("username", user.getUsername());

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<?> downloadResumePdf(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Optional<Resume> resumeOpt = resumeService.getResumeByIdAndUserId(id, user.getId());

            if (resumeOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Resume not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            Resume resume = resumeOpt.get();
            byte[] pdfBytes = pdfGenerationService.generateResumePdf(resume);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment",
                resume.getTitle().replaceAll("[^a-zA-Z0-9]", "_") + "_Resume.pdf");
            headers.setContentLength(pdfBytes.length);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error generating PDF: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
