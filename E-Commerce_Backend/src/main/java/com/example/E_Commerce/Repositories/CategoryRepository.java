package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.E_Commerce.Models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String Category);
 @Query("SELECT c FROM Category c WHERE c.name = :name AND c.parentCategory = :parentCategory")
Category findByNameAndParentCategory(@Param("name") String name, @Param("parentCategory") Category parentCategory);



}
