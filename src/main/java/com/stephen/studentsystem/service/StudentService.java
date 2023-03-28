package com.stephen.studentsystem.service;

import com.stephen.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
