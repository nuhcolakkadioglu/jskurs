
//kurs class
class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}
//ui class
class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');
        var html = `
                    <tr>
                    <td><img src="img/${course.image}" width="100" /></td>
                    <td>${course.title}</td>
                    <td>${course.instructor}</td>
                    <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">sil</a></td>
                    </tr>
                    `;
        list.innerHTML += html;
    }

    clearsControls() {
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = "";
    }

    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        var html = `
        <div class="alert alert-${className}">
            ${message}
        </div>
        `;

        const row = document.querySelector(".row");
        row.insertAdjacentHTML('beforeBegin', html);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

class Storage {
    //verileri okuma
    static getCourses() {
        let courses;

        if (localStorage.getItem('courses') === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }

        return courses.reverse();
    }

    //verileri ekranda gösterme
    static displayCourse() {
        const courses = Storage.getCourses();
        courses.forEach(course=>{
            const ui = new  UI();
            ui.addCourseToList(course);
        });
    }

    //kurs ekleme
    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    }

    //kurs silme
    static deleteCourse(element) {
        if(element.classList.contains('delete')){
            const id=element.getAttribute('data-id');
           const courses = Storage.getCourses();
           courses.forEach((course,index)=>{
               if(course.courseId==id){
                courses.splice(index,1);
               }
           })

           localStorage.setItem('courses',JSON.stringify(courses));
          return true;
        }
    }
}
//sayfa yüklendiginde listelenecek olan kursların alınması
document.addEventListener('DOMContentLoaded', Storage.displayCourse());

document.getElementById('new-course').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //kurs objesi oluşturma
    const course = new Course(title, instructor, image);
    //console.log(course);

    //ui oluşturma
    const ui = new UI();

    //boş alan uyarı mesajı
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('formda boş alan bırakmayınız!', 'warning');
    } else {
        //kurs ekleme 
        ui.addCourseToList(course);

        //Storage e kaydın eklenmesi
        Storage.addCourse(course);

        //formu temizleme
        ui.clearsControls();

        ui.showAlert('yeni kurs eklendi', 'success');
    }
    e.preventDefault();
});

document.getElementById("course-list").addEventListener('click', function (e) {

    const ui = new UI();
   

    //Storage den kurs silme
     if(Storage.deleteCourse(e.target)){
        ui.deleteCourse(e.target);
     }
    ui.showAlert('kurs silindi!', 'danger');

    e.preventDefault();
})