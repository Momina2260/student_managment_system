function getGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D'; // Fixed: Changed from === to >=
    return 'F';
}

function calculateResult() {
    // 1. Fetch text inputs
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let department = document.getElementById("department").value.trim();

    // 2. Clear previous error outputs if any
    document.getElementById('result').innerHTML = "";
    document.getElementById('profile').innerHTML = "";

    // 3. Name Validation
    if (name === "") {
        document.getElementById('profile').innerHTML = "<span style='color:red;'>Please enter a valid name.</span>";
        return;
    }

    let english = Number(document.getElementById("eng").value);
    let math = Number(document.getElementById("math").value);
    let science = Number(document.getElementById("science").value);
    let programming = Number(document.getElementById("programming").value);
    let urdu = Number(document.getElementById("urdu").value);

    let marks = [english, math, science, programming, urdu];

    for (let mark of marks) {
        if (mark < 0 || mark > 100) {
            document.getElementById('result').innerHTML = "<span style='color:red;'>Invalid marks entered! Ensure all scores are between 0 and 100.</span>";
            return; 
        }
    }

    let obtainedTotal = english + math + science + programming + urdu;
    let percentage = (obtainedTotal / 500) * 100;
    let grade = getGrade(percentage);
    let status = percentage >= 50 ? "Pass" : "Fail";

    // 6. Object Creation
    let student = {
        name: name,
        roll: roll,
        department: department,
        total: obtainedTotal,
        percentage: percentage.toFixed(2),
        grade: grade
    };

    // 7. Render to DOM
    document.getElementById('result').innerHTML = `
        <strong>Total:</strong> ${student.total}<br>
        <strong>Percentage:</strong> ${student.percentage}%<br>
        <strong>Grade:</strong> ${student.grade}<br>
        <strong>Status:</strong> <span style="text-transform: capitalize;">${status}</span><br>
    `;

    document.getElementById('profile').innerHTML = `
        <strong>Name:</strong> ${student.name}<br>
        <strong>Roll No:</strong> ${student.roll}<br>
        <strong>Department:</strong> ${student.department}<br>
    `;

    console.log('METHOD CALLED SUCCESSFULLY');
}

// Global state tracking variable for dark mode
let darkMode = false;

function toggleTheme() {
    document.body.classList.toggle("dark");
    darkMode = !darkMode;
}
