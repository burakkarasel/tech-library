package com.kullop.techlibrary.dao;

import com.kullop.techlibrary.entities.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;


public interface ReviewRepository extends JpaRepository<Review, Long> {
    public Page<Review> findByBookId(@RequestParam("bookId") Long bookId, Pageable pageable);
}
