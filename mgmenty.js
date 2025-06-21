document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const tableBody = document.querySelector('#student-table tbody');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    function renderTable() {
        tableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.course}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('roll').value = student.roll;
        document.getElementById('course').value = student.course;

        students.splice(index, 1);
        saveStudents();
        renderTable();
    };

    window.deleteStudent = function(index) {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            saveStudents();
            renderTable();
        }
    };

    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const roll = document.getElementById('roll').value.trim();
        const course = document.getElementById('course').value.trim();

        if (name && roll && course) {
            students.push({ name, roll, course });
            saveStudents();
            renderTable();
            form.reset();
        }
    });

    renderTable();
});
