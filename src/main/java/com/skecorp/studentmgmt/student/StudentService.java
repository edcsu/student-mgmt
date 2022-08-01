package com.skecorp.studentmgmt.student;

import com.skecorp.studentmgmt.student.exception.BadRequestException;
import com.skecorp.studentmgmt.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        // check if email is taken
        var studentExists = studentRepository.selectExistsEmail(student.getEmail());
        if (studentExists){
            throw new BadRequestException(String.format(
                    "Student with email %s already exists", student.getEmail()));
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        // check if student exists
         var studentExists = studentRepository.findById(studentId);
         if(studentExists == null) {
             throw new StudentNotFoundException(String.format(
                     "student with id: %s does not exist",
                     studentId));
         }
        studentRepository.deleteById(studentId);
    }
}
