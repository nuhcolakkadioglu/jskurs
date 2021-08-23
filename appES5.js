
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
                <td><a href="#" class="btn btn-danger btn-sm delete">sil</a></td>
                </tr>
                `;
    list.innerHTML += html;
}
//form kontrollerinin kayıtdan sonra temizlenmesi 
UI.prototype.clearsControls = function () {
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";

}
//kurs silme

UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
}

//kullanıcı bilgilendirme mesajlarının oluşturulması
UI.prototype.showAlert = function (message, className) {

    var html = `
                <div class="alert alert-${className}">
                    ${message}
                </div>
                `;

    const row = document.querySelector(".row");
    row.insertAdjacentHTML('beforeBegin',html);

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);

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

    //boş alan uyarı mesajı
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('formda boş alan bırakmayınız!', 'warning');
    } else {
        //kurs ekleme 
        ui.addCourseToList(course);

        //formu temizleme
        ui.clearsControls();

        ui.showAlert('yeni kurs eklendi', 'success');
    }
    e.preventDefault();
});

document.getElementById("course-list").addEventListener('click', function (e) {

    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('kurs silindi!', 'danger');

    e.preventDefault();
})