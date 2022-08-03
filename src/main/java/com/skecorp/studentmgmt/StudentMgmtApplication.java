package com.skecorp.studentmgmt;

import org.junit.Ignore;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Ignore("Class not ready for tests")
@SpringBootApplication
public class StudentMgmtApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentMgmtApplication.class, args);
    }

}
