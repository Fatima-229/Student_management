#!/usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEntrolled;
    feesAmount;
    constructor(id, name, coursesEntrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEntrolled = coursesEntrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEntrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option: \n",
        choices: ["Entroll a student", "Show student status"],
    });
    if (action.ans === "Entroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please enter your name: ",
        });
        let trimmedStudentName = studentName.ans.trim().toLowerCase();
        let studentNameCheck = students.map((obj) => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour account has been created");
                console.log(`Welcome, ${trimmedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course: ",
                    choices: ["IT", "E-commerce evolution", "Cyber security"],
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 6000;
                        break;
                    case "E-commerce evolution":
                        courseFees = 4000;
                        break;
                    case "Cyber security":
                        courseFees = 5000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to entroll in this course?",
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("Congratulations! You have successfully enrolled in this course. ");
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map((e) => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select name",
                choices: studentNameCheck,
            });
            let foundStudent = students.find((Student) => Student.name === selectedStudent.ans);
            console.log("Students information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is empty.");
        }
        let userConfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Do you want to continue?",
        });
        if (userConfirm.ans === false) {
            continueEntrollment = false;
        }
    }
} while (continueEntrollment);
