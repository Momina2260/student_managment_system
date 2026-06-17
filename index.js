function getGrade(percentage) {
    let grade;
    if (percentage >= 90) {
        return 'A';
    }
    else if (percentage >= 80) {
        return 'B';
    }
   else if (percentage >= 60) {
        return 'C';
    }
    else if (percentage === 50) {
        return 'D';
    }
    else{
        return 'F'
    }


}
function calculateResult() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let department = document.getElementById("department").value;
    let english = Number(document.getElementById("eng").value);
    let math = Number(document.getElementById("math").value);
    let science = Number(document.getElementById("science").value);
    let programming = Number(document.getElementById("programming").value);
    let urdu = Number(document.getElementById("urdu").value);
    let obtainedTotal =Number( english + math + science + programming + urdu);
    let percentage = Number((obtainedTotal / 500) * 100);
    let grade = getGrade(percentage);
    let status;
    if (percentage >= 50) {
        status = "pass";
    } else {
        status = "fail";
    }
    let student = {
        name: name,
        roll: roll,
        department: department,
        total: obtainedTotal,
        percentage: percentage.toFixed(2),
        grade: grade
    };
    document.getElementById('result').innerHTML =
        `<strong>Total:</strong>${student.total}<br>
    <strong>Percentage:</strong>${student.percentage}<br>
    <strong>Grade:</strong>${student.grade}<br>
    <strong>Status:</strong>${status}<br>
    
    `;
    document.getElementById('profile').innerHTML = `
    <strong>Name:</strong>${student.name}<br>
    <strong>roll:</strong>${student.roll}<br>
    
    `;


    console.log('METHOD CALLED');



}
 function toggleTheme() {

            document.body.classList.toggle("dark");

            darkMode = !darkMode;
        }