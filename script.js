// Fungsi untuk menyimpan data kursus ke LocalStorage
function saveCourse(course) {
  let courses = [];
  
  if (localStorage.getItem('courses')) {
    courses = JSON.parse(localStorage.getItem('courses'));
  }
  
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Fungsi untuk memuat daftar kursus dari LocalStorage
function loadCourses() {
  let courses = [];
  
  if (localStorage.getItem('courses')) {
    courses = JSON.parse(localStorage.getItem('courses'));
  }
  
  return courses;
}

// Fungsi untuk menampilkan daftar kursus
function showCourses() {
  const courseList = document.getElementById('course-list');
  courseList.innerHTML = '';
  
  const courses = loadCourses();
  
  courses.forEach(course => {
    const li = document.createElement('li');
    li.innerHTML = `<b>Judul:</b> <span class="course-title" onclick="showCourseDetail(${course.id})">${course.title}</span>, <b>Deskripsi:</b> ${course.description}, <b>Durasi:</b> ${course.duration} <br><button onclick="editCourse(${course.id})">Edit</button> <button onclick="deleteCourse(${course.id})">Delete</button>`;
    courseList.appendChild(li);
  });
}

// Fungsi untuk menambah kursus baru
function addCourse(event) {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const duration = document.getElementById('duration').value;
  
  const course = {
    id: new Date().getTime(),
    title: title,
    description: description,
    duration: duration,
    materials: []
  };
  
  saveCourse(course);
  showCourses();
  
  // Reset form input
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('duration').value = '';
}

// Fungsi untuk mengedit kursus
function editCourse(id) {
  const courses = loadCourses();
  const courseIndex = courses.findIndex(course => course.id === id);

  if (courseIndex !== -1) {
    const course = courses[courseIndex];

    // Membuat elemen form edit kursus
    const form = document.createElement('form');
    form.innerHTML = `
      <label for="edit-title">Judul:</label>
      <input type="text" id="edit-title" value="${course.title}" required><br>
      
      <label for="edit-description">Deskripsi:</label>
      <textarea id="edit-description" required>${course.description}</textarea><br>
      
      <label for="edit-duration">Durasi:</label>
      <input type="text" id="edit-duration" value="${course.duration}" required><br>
      
      <button type="submit">Simpan</button>
    `;

    // Menangani submit form edit kursus
    form.addEventListener('submit', event => {
      event.preventDefault();

      const updatedTitle = document.getElementById('edit-title').value;
      const updatedDescription = document.getElementById('edit-description').value;
      const updatedDuration = document.getElementById('edit-duration').value;

      // Memperbarui data kursus
      course.title = updatedTitle;
      course.description = updatedDescription;
      course.duration = updatedDuration;

      // Menyimpan kembali data kursus ke LocalStorage
      localStorage.setItem('courses', JSON.stringify(courses));

      // Perbarui tampilan daftar kursus
      showCourses();
    });

    // Menghapus elemen daftar kursus sebelumnya
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';

    // Menambahkan form edit kursus ke dalam elemen daftar kursus
    const li = document.createElement('li');
    li.appendChild(form);
    courseList.appendChild(li);
  }
}

// Fungsi untuk menghapus kursus
function deleteCourse(id) {
  const courses = loadCourses();
  const updatedCourses = courses.filter(course => course.id !== id);

  // Menyimpan kembali data kursus ke LocalStorage
  localStorage.setItem('courses', JSON.stringify(updatedCourses));

  // Perbarui tampilan daftar kursus
  showCourses();
}

// Event listener untuk menangani penambahan kursus
document.getElementById('add-course-form').addEventListener('submit', addCourse);

// Muat dan tampilkan daftar kursus saat halaman dimuat
showCourses();

function showCourseDetail(courseId) {
  // Dapatkan kursus dari LocalStorage berdasarkan ID
  const courses = loadCourses();
  const course = courses.find(course => course.id === courseId);

  // Cek apakah kursus ditemukan
  if (course) {
    // Navigasi ke halaman detail kursus dengan membuka jendela baru
    window.open(`course-detail.html?id=${course.id}`, '_blank');
  }
}
