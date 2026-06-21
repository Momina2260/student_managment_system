

let students = [];
let editIndex = -1;




function updateDateTime() {
    const dateElement = document.getElementById("currentDate");

    setInterval(() => {
        dateElement.textContent =
            new Date().toLocaleString();
    }, 1000);
}


function getGrade(percentage) {

    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";

    return "F";
}


function getGPA(percentage) {

    if (percentage >= 90) return 4.0;
    if (percentage >= 80) return 3.5;
    if (percentage >= 70) return 3.0;
    if (percentage >= 60) return 2.5;

    return 2.0;
}



function calculateResult() {

    let name =
        document.getElementById("name").value.trim();

    let roll =
        document.getElementById("roll").value.trim();

    let department =
        document.getElementById("department").value.trim();

    if (!name || !roll || !department) {

        showToast("Please fill all student information");

        return;
    }

    let english =
        Number(document.getElementById("eng").value);

    let math =
        Number(document.getElementById("math").value);

    let science =
        Number(document.getElementById("science").value);

    let programming =
        Number(document.getElementById("programming").value);

    let urdu =
        Number(document.getElementById("urdu").value);

    const marks = [
        english,
        math,
        science,
        programming,
        urdu
    ];

    for (let mark of marks) {

        if (mark < 0 || mark > 100) {

            showToast(
                "Marks must be between 0 and 100"
            );

            return;
        }
    }

    let total =
        english +
        math +
        science +
        programming +
        urdu;

    let percentage =
        (total / 500) * 100;

    let grade =
        getGrade(percentage);

    let gpa =
        getGPA(percentage);

    let status =
        percentage >= 60
            ? "PASS"
            : "FAIL";

    let student = {

        name,
        roll,
        department,

        total,

        percentage:
            percentage.toFixed(2),

        grade,

        gpa
    };

    if (editIndex === -1) {

        students.push(student);

        showToast(
            "Student Added Successfully"
        );

    } else {

        students[editIndex] =
            student;

        editIndex = -1;

        showToast(
            "Student Updated Successfully"
        );
    }

    saveData();

    displayStudent();

    updateDashboard();

    updateTopper();

    showResult(student, status);

    clearForm(false);
}


function showResult(student, status) {

    document.getElementById(
        "result"
    ).innerHTML = `

        <p><strong>Total:</strong>
        ${student.total}</p>

        <p><strong>Percentage:</strong>
        ${student.percentage}%</p>

        <p><strong>Grade:</strong>
        ${student.grade}</p>

        <p><strong>GPA:</strong>
        ${student.gpa}</p>

        <p><strong>Status:</strong>
        ${status}</p>

        <div class="progress">

            <div
            class="progress-fill"
            style="width:${student.percentage}%">

            </div>

        </div>
    `;

    document.getElementById(
        "profile"
    ).innerHTML = `

        <p><strong>Name:</strong>
        ${student.name}</p>

        <p><strong>Roll:</strong>
        ${student.roll}</p>

        <p><strong>Department:</strong>
        ${student.department}</p>
    `;
}



function displayStudent() {

    students.sort(
        (a, b) =>
            b.percentage - a.percentage
    );

    let rows = "";

    students.forEach(
        (student, index) => {

            rows += `

            <tr>

                <td>${index + 1}</td>

                <td>${student.name}</td>

                <td>${student.roll}</td>

                <td>${student.department}</td>

                <td>${student.total}</td>

                <td>${student.percentage}%</td>

                <td>${student.grade}</td>

                <td>${student.gpa}</td>

                <td>

                    <button
                    class="edit-btn"
                    onclick="editStudent(${index})">

                    Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">

                    Delete

                    </button>

                </td>

            </tr>
            `;
        }
    );

    document.getElementById(
        "studentTable"
    ).innerHTML = rows;
}



function deleteStudent(index) {

    if (
        confirm(
            "Delete this student?"
        )
    ) {

        students.splice(index, 1);

        saveData();

        displayStudent();

        updateDashboard();

        updateTopper();

        showToast(
            "Student Deleted"
        );
    }
}



function editStudent(index) {

    const student =
        students[index];

    document.getElementById(
        "name"
    ).value =
        student.name;

    document.getElementById(
        "roll"
    ).value =
        student.roll;

    document.getElementById(
        "department"
    ).value =
        student.department;

    editIndex = index;

    showToast(
        "Edit Mode Enabled"
    );
}



function updateDashboard() {

    document.getElementById(
        "totalStudents"
    ).textContent =
        students.length;

    let passed = 0;

    let failed = 0;

    let highest = 0;

    students.forEach(student => {

        if (
            Number(
                student.percentage
            ) >= 60
        ) {
            passed++;
        } else {
            failed++;
        }

        if (
            Number(
                student.percentage
            ) > highest
        ) {
            highest =
                student.percentage;
        }

    });

    document.getElementById(
        "passStudents"
    ).textContent =
        passed;

    document.getElementById(
        "failStudents"
    ).textContent =
        failed;

    document.getElementById(
        "highestPercentage"
    ).textContent =
        highest + "%";
}



function updateTopper() {

    if (
        students.length === 0
    ) {

        document.getElementById(
            "topper"
        ).innerHTML =
            "No Student Added Yet";

        return;
    }

    let topper =
        students[0];

    document.getElementById(
        "topper"
    ).innerHTML = `

        <p><strong>Name:</strong>
        ${topper.name}</p>

        <p><strong>Percentage:</strong>
        ${topper.percentage}%</p>

        <p><strong>Grade:</strong>
        ${topper.grade}</p>

        <p><strong>GPA:</strong>
        ${topper.gpa}</p>
    `;
}



function searchStudent() {

    let value =
        document.getElementById(
            "searchStudent"
        )
            .value
            .toLowerCase();

    let rows =
        document.querySelectorAll(
            "#studentTable tr"
        );

    rows.forEach(row => {

        let text =
            row.innerText
                .toLowerCase();

        row.style.display =
            text.includes(value)
                ? ""
                : "none";
    });
}



function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(
            students
        )
    );
}

function loadData() {

    const data =
        localStorage.getItem(
            "students"
        );

    if (data) {

        students =
            JSON.parse(data);

        displayStudent();

        updateDashboard();

        updateTopper();
    }
}



function exportData() {

    const blob =
        new Blob(
            [
                JSON.stringify(
                    students,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const link =
        document.createElement(
            "a"
        );

    link.href =
        URL.createObjectURL(
            blob
        );

    link.download =
        "students.json";

    link.click();

    showToast(
        "Data Exported"
    );
}



function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(
        "theme",
        document.body.classList.contains(
            "dark"
        )
    );
}

function loadTheme() {

    let dark =
        localStorage.getItem(
            "theme"
        );

    if (
        dark === "true"
    ) {

        document.body.classList.add(
            "dark"
        );
    }
}


function clearForm(
    showMessage = true
) {

    document.getElementById(
        "name"
    ).value = "";

    document.getElementById(
        "roll"
    ).value = "";

    document.getElementById(
        "department"
    ).value = "";

    document.getElementById(
        "eng"
    ).value = "";

    document.getElementById(
        "math"
    ).value = "";

    document.getElementById(
        "science"
    ).value = "";

    document.getElementById(
        "programming"
    ).value = "";

    document.getElementById(
        "urdu"
    ).value = "";

    if (showMessage) {

        showToast(
            "Form Cleared"
        );
    }
}


function showToast(message) {

    let toast =
        document.getElementById(
            "toast"
        );

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);
}



window.onload = () => {

    updateDateTime();

    loadTheme();

    loadData();
};