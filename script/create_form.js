function createMainTags() {
  const studentsContainer = document.getElementById("students");

  //create form
  const labelFormCreateClasses = ["form__label", "col-md-6"];
  const inputFormCreateClasses = [
    "form__input",
    "form-create__input",
    "form-control",
  ];
  const errorClasses = ["form__error-message"];
  const studentsCreateTitleClasses = ["form__title"];
  const studentsFormCreateClasses = ["form", "form-create", "row", "g-4"];
  const studentsFormCreateButtonClasses = [
    "form__button",
    "col-3",
    "btn",
    "btn-primary",
    "btn-lg",
  ];
  const studentsFormCreateButtonClassesTest = [
    "form__button",
    "col-6",
    "btn",
    "btn-primary",
    "btn-lg",
  ];

  const studentFormCreateElements = [
    {
      type: "text",
      name: "surname",
      placeholder: "Фамилия",
      errorMessage: "Введите фамилию",
    },
    {
      type: "text",
      name: "name",
      placeholder: "Имя",
      errorMessage: "Введите имя",
    },
    {
      type: "text",
      name: "patronymic",
      placeholder: "Отчество",
      errorMessage: "Введите отчество",
    },
    {
      type: "date",
      name: "date",
      placeholder: "Дата начала обучения",
      errorMessage: "Некорректная дата",
    },
    {
      type: "text",
      name: "year",
      placeholder: "Год начала обучения",
      errorMessage: "Введите год начала обучения",
    },
    {
      type: "text",
      name: "faculty",
      placeholder: "Факультет",
      errorMessage: "Некорректный факультет",
    },
  ];

  //filter form
  const labelFormFilterClasses = ["form__label", "col-md-3", "mb-3"];
  const inputFormFilterClasses = [
    "form__input",
    "form-filter__input",
    "form-control",
  ];
  const studentsFormFilterClasses = ["form", "filter-form", "row"];
  const studentFormFilterElements = [
    {
      type: "text",
      name: "fullName",
      placeholder: "Фильтер по ФИО",
      errorMessage: "Некорректная фамилия",
    },
    {
      type: "text",
      name: "faculty",
      placeholder: "Фильтр по факультету",
      errorMessage: "Некорректное Имя",
    },
    {
      type: "text",
      name: "date",
      placeholder: "Фильтр по дате рождения",
      errorMessage: "Некорректное отчество",
    },
    {
      type: "text",
      name: "year",
      placeholder: "Фильтр по году обучения",
      errorMessage: "Некорректное отчество",
    },
  ];

  //filter button
  const studentsButtonFilterClasses = ["btn-title", "col-3", "btn", "btn-lg"];
  const studentsContainerButtonFilterClasses = ["table-titles", "row"];
  const studentsButtonFiltersElements = [
    { text: "Фильтр по ФИО", id: "btn-name" },
    { text: "Факультет", id: "btn-faculty" },
    { text: "Дата рождения", id: "btn-date" },
    { text: "Годы обучения", id: "btn-year" },
  ];

  //functions
  function createElement(parent, tag, classes, text = 0, id = 0) {
    const el = document.createElement(tag);
    el.classList.add(...classes);
    if (text) {
      el.textContent = text;
    }
    if (id) {
      el.id = id;
    }
    parent.append(el);
    return el;
  }

  function createLabel(
    type,
    parent,
    labelClasses,
    inputClasses,
    errorClasses,
    name,
    placeholder = 0,
    errorMessage = "Некорректное поле",
    isRequired = false
  ) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const errorDiv = document.createElement("div");

    label.classList.add(...labelClasses);
    input.classList.add(...inputClasses);
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    if (type !== "date") {
      input.setAttribute("placeholder", placeholder);
    }
    input.required = isRequired;
    errorDiv.classList.add(...errorClasses);
    errorDiv.textContent = errorMessage;

    label.append(errorDiv, input);
    parent.append(label);

    return label;
  }

  //create elements
  createElement(
    studentsContainer,
    "h2",
    studentsCreateTitleClasses,
    "Форма добавления студента"
  );
  const studentsCreateForm = createElement(
    studentsContainer,
    "form",
    studentsFormCreateClasses
  );
  studentFormCreateElements.forEach((el) => {
    createLabel(
      el.type,
      studentsCreateForm,
      labelFormCreateClasses,
      inputFormCreateClasses,
      errorClasses,
      el.name,
      el.placeholder,
      el.errorMessage
    );
  });
  createElement(
    studentsCreateForm,
    "button",
    studentsFormCreateButtonClasses,
    "Добавить студента"
  );

  createElement(
    studentsContainer,
    "button",
    studentsFormCreateButtonClassesTest,
    "Добавить 10 студентов (кнопка для тестирования)",
    "btn-test"
  );

  const titleFilterStudents = createElement(
    studentsContainer,
    "h2",
    studentsCreateTitleClasses,
    "Фильтры по столбцам"
  );
  const studentsFilterForm = createElement(
    studentsContainer,
    "form",
    studentsFormFilterClasses
  );
  studentFormFilterElements.forEach((el) => {
    createLabel(
      el.type,
      studentsFilterForm,
      labelFormFilterClasses,
      inputFormFilterClasses,
      errorClasses,
      el.name,
      el.placeholder,
      el.errorMessage
    );
  });

  const studentsContainerButtonFilter = createElement(
    studentsContainer,
    "div",
    studentsContainerButtonFilterClasses
  );
  studentsButtonFiltersElements.forEach((el) => {
    createElement(
      studentsContainerButtonFilter,
      "button",
      studentsButtonFilterClasses,
      el.text,
      el.id
    );
  });
  return;
}
export default createMainTags;
