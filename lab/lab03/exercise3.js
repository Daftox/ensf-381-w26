//3.A
let classRoster = ["Alice", "Tom", "Charlie", "Diana", "Evan"]
console.log(classRoster.toString())
console.log(classRoster)
classRoster.push("Fiona")
classRoster.push("Nancy")
console.log(classRoster.shift())
console.log(classRoster.toString())
console.log(classRoster.length)

//3.B
let classInfo = {
    className: "ENSF381: Full-Stack Web Development",
    instructor: "Dr. Smith",
    students: classRoster,
    details: {
        semester: "Winter",
        year: 2025
    },

    schedule: ["Monday", "Wednesday", "Friday"]
}

classInfo.instructor = "Dr.Abdellatif"
console.log(classInfo.className)
console.log(classInfo.instructor)
console.log(classInfo.students.toString())
console.log(classInfo.details.semester)
console.log(classInfo)


let { className, students } = classInfo
console.log(className)
console.log(students.toString())

let { semester, year } = classInfo.details
console.log(semester)
console.log(year)

let [student1, student2, ...remainingStudents] = classInfo.students
console.log(student1)
console.log(student2)
console.log(remainingStudents.toString())
console.log(classInfo.students.toString())