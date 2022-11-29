import createMainTags from './create_form.js'
createMainTags()

// кнопка для теста
const testArray =[
  {surname:"Иванов", name: "Иван", patronymic: "Иванович", faculty: "Психологии",  date: "1998-08-15", year: "2020"},
  {surname:"Иванов", name: "Сергей", patronymic: "Генадьевич", faculty: "Математики",  date: "1994-04-09", year: "2021"},
  {surname:"Попов", name: "Андрей", patronymic: "Иванович", faculty: "Экономики",  date: "1997-04-05", year: "2015"},
  {surname:"Сергеев", name: "Сергей", patronymic: "Сергеевич", faculty: "Бизнеса",  date: "1991-04-03", year: "2019"},
  {surname:"Сергеева", name: "Екатерина", patronymic: "Андреевна", faculty: "Строительства",  date: "1993-06-14", year: "2021"},
  {surname:"Иванова", name: "Алена", patronymic: "Сергеевна", faculty: "Бизнеса",  date: "1990-05-10", year: "2010"},
  {surname:"Попов", name: "Сергей", patronymic: "Антонович", faculty: "Математики",  date: "2005-12-01", year: "2020"},
  {surname:"Антонов", name: "Георгий", patronymic: "Федорович", faculty: "Психологии",  date: "2002-11-25", year: "2018"},
  {surname:"Федоров", name: "Иван", patronymic: "Сергеевич", faculty: "Экономики",  date: "2000-10-09", year: "2017"},
  {surname:"Туснин", name: "Анатолий", patronymic: "Анатольевич", faculty: "Психологии",  date: "1984-08-20", year: "2007"},
]
const btnTest = document.getElementById('btn-test')
btnTest.addEventListener('click', () => {

  testArray.forEach(e => {
    convertDataStudentCreate(e)
    createStudent(e)})
  studentsArray.push(...testArray)
  filterStudents()
 })


function createElement(parent, tag, classes, text = 0, id = 0) {
  const el = document.createElement(tag);
  el.classList.add(...classes)
  if(text) {el.textContent = text}
  parent.append(el)
  return el
}

const studentsArray = [];
const studentColumnClasses = ['students__data', 'col-3', 'text-center']
const studentsListClasses = ['students__list']
const studentsItemClasses = ['students__item', 'row']
const createForm = document.querySelector('.form-create');
const studentsContainer = document.getElementById('students');
const fomrFilterStudents = document.querySelector('.filter-form')
const inputFilter = document.querySelectorAll('.form-filter__input')
const inputCreate = document.querySelectorAll('.form-create__input')

const studentsList = createElement(studentsContainer, 'ul', studentsListClasses )

function convertDataStudentCreate(obj) {
  obj.fullName = obj.surname.trim() + ' ' + obj.name.trim() + ' ' + obj.patronymic.trim();
  obj.sortDate = +new Date(obj.date)
  obj.fullYearStudy = new Date().getMonth() >= 8 ?  new Date().getFullYear() - obj.year + 1  :  new Date().getFullYear() - obj.year;
  obj.outputYear = (obj.fullYearStudy > 4) ?
    (obj.year + '-' + (+obj.year + 4) +' (закончил)') :
    obj.year + '-' + new Date().getFullYear() + ' (' + obj.fullYearStudy +  ' курс)';
  obj.outputDate = obj.date.split('-').reverse().join('.') + ' (' + getAge(obj.date)  + ' лет)';
}

function createStudent(obj) {
  const studentsItem = createElement(studentsList, 'li', studentsItemClasses)
  createElement(studentsItem, 'div', studentColumnClasses, obj.fullName )
  createElement(studentsItem, 'div', studentColumnClasses, obj.faculty )
  createElement(studentsItem, 'div', studentColumnClasses, obj.outputDate)
  createElement(studentsItem, 'div', studentColumnClasses, obj.outputYear )
  return obj
}

function clearStudentsItem() {
  document.querySelectorAll('li').forEach(e => e.remove())
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

createForm.setAttribute('novalidate', '')
function formValidation() {
  let errorInputAmount = 0;
  inputCreate.forEach((input) => {
    if(input.value.trim() === '') {
      input.previousSibling.classList.add('form__error-message--active')
      errorInputAmount++
      } else {
        input.previousSibling.classList.remove('form__error-message--active')
      }

    switch(input.name) {
      case 'date':
        if (new Date(input.value) == 'Invalid Date') {
          input.previousSibling.textContent = 'Введите корректную дату'
          input.previousSibling.classList.add('form__error-message--active')
          errorInputAmount++
        } else {
          console.log(new Date(input.value) > new Date('1900-01-01') && new Date(input.value) < Date.now())
        }
      break

      case 'year':
        if (isNaN(+input.value) || input.value.trim() === '') {
          input.previousSibling.textContent = 'Введите год начала обучения'
          input.previousSibling.classList.add('form__error-message--active')
          errorInputAmount++
        } else {
          if (input.value >= 2000 && input.value <= new Date().getFullYear()) {
            input.previousSibling.classList.remove('form__error-message--active')
          } else {
            input.previousSibling.textContent = 'Год начала обучения должен находится в диапазоне от 2000-го до текущего года'
            input.previousSibling.classList.add('form__error-message--active')
            errorInputAmount++
          }
      }
      break
    }
  })

 if (errorInputAmount === 0) {
  return true}
  else {
    return false}

}

createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (formValidation()) {

    const fields = document.querySelectorAll('.form-create__input');
    const values = {}

    fields.forEach(field => {
      const {name, value} = field
      values [name] = value
      field.value =''
    })

    convertDataStudentCreate(values)
    createStudent(values)
    studentsArray.push(values)
    filterStudents()
  }
 })

 // сортировка массива
 const buttonSortName = document.getElementById('btn-name')
 const buttonSortfaculty = document.getElementById('btn-faculty')
 const buttonSortDate = document.getElementById('btn-date')
 const buttonSortYear = document.getElementById('btn-year')

 function sortStudentsList (btn, property) {
  btn.addEventListener('click', () => {
    clearStudentsItem()
    studentsArray.sort((a,b) => {
      if(typeof(a[property]) === 'string') {
        if (a[property] > b[property]) return 1;
        if (a[property] == b[property]) return 0;
        if (a[property] < b[property]) return -1;}
      return a[property] - b[property]
     })
     studentsArray.forEach(e => createStudent(e))
     filterStudents()
   })
 }

 sortStudentsList(buttonSortName, 'fullName')
 sortStudentsList(buttonSortfaculty, 'faculty')
 sortStudentsList(buttonSortDate, 'sortDate')
 sortStudentsList(buttonSortYear, 'year')

 //Фильтр массива
inputFilter.forEach((input) => {input.addEventListener('input', filterStudents)})
function filterStudents() {
  const studentsArrayFiltered = studentsArray.slice()
   inputFilter.forEach((input) => {

    if(input.value) {
      for ( let i = studentsArrayFiltered.length - 1; i >= 0; i= i - 1 ){
        const student = studentsArrayFiltered[i]

        if(!student[input.name].toLowerCase().includes(input.value.toLowerCase())){
          studentsArrayFiltered.splice(i, 1)
          }
      }
    }
    clearStudentsItem()
    studentsArrayFiltered.forEach(e => {
      createStudent(e)})
  })
}
