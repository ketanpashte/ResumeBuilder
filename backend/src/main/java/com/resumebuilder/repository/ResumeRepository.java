package com.resumebuilder.repository;

import com.resumebuilder.entity.Resume;
import com.resumebuilder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    
    List<Resume> findByUserOrderByUpdatedAtDesc(User user);
    
    List<Resume> findByUserIdOrderByUpdatedAtDesc(Long userId);
    
    Optional<Resume> findByIdAndUserId(Long id, Long userId);
    
    @Query("SELECT r FROM Resume r WHERE r.user.id = :userId AND " +
           "(LOWER(r.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Resume> findByUserIdAndSearchTerm(@Param("userId") Long userId, 
                                          @Param("searchTerm") String searchTerm);
    
    long countByUserId(Long userId);
}
