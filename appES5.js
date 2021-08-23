
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}


function UI() {

}

//yeni kayıt ekleme
UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById('course-list');
    var html = `
                <tr>
                <td><img src="img/${course.image}" width="100" /></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class="btn btn-danger btn-sm">Düzenle</a></td>
                </tr>
                `;
    list.innerHTML+=html;
}
UI.prototype.clearsControls = function () {
    const title = document.getElementById('title').value="";
    const instructor = document.getElementById('instructor').value="";
    const image = document.getElementById('image').value="";

}

document.getElementById('new-course').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //kurs objesi oluşturma
    const course = new Course(title, instructor, image);
    //console.log(course);
    //veri tabanına kayıt

    //ui oluşturma
    const ui = new UI();

    //kurs ekleme 
    ui.addCourseToList(course);

    //formu temizleme
    ui.clearsControls();


    e.preventDefault();
});