package com.skecorp.studentmgmt.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> studentList = Arrays.asList(
                new Student(1L, "John Doe", "johndoe@skeuni.co.ug", Gender.MALE),
                new Student(2L, "Jane Doe", "janedoe@skeuni.co.ug", Gender.FEMALE)
        );
        return studentList;
    }
}
