const personName = document.querySelector('#personName');
const personEmail = document.querySelector('#personEmail');
const personPhone = document.querySelector('#personPhone');
const parag = document.querySelector('#parag');
const btnSubmit = document.querySelector('#btnSubmit');
const btnClear = document.querySelector('#clear');
const createDiv = document.createElement('div');
const content = [];

content.push(parag.textContent);
btnSubmit.addEventListener('click', toggleSubmit)
btnClear.addEventListener('click', clearAll)

// Регулярные выражения для проверки почты и номера телефона
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_REGEXP = /^\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

function isValidName() {
    let valName = personName.value.replace(/\s+/g, ' ').trim()
    const arrValName = valName.split(' ')
    valName = arrValName.map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
    return valName;
}

// Валидация почты
function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}

function onInputEmail() {
    let valEmail = personEmail.value
    return isEmailValid(valEmail) ? true : message("Неверно указан формат почты")
}

// Валидация номера телефона
function isPhoneValid(value) {
    return PHONE_REGEXP.test(value)
}

function onInputPhone() {
    let valPhone = personPhone.value;
    return isPhoneValid(valPhone) ? true : message("Неверно указан формат телефона");
}

function clearInput() {
    personName.value = '';
    personEmail.value = '';
    personPhone.value = '';
}

// Выполняем валидацию перед отрисовкой
function toggleSubmit() {
    // if (personName.value == '') return alert('Поле имя незаполнено');
    if (personName.value == '') return message('Поле имя незаполнено');
    if (personEmail.value == '') return message('Поле почты незаполнено');
    if (personPhone.value == '') return message('Поле телефона незаполнено');

    if (onInputEmail() && onInputPhone()) {
        createFields();
        clearInput();
    }
}

// Отрисовка на странице полей

// Создаем элемент и очищаем абзац
function createFields() {
    parag.innerText = '';
    createDiv.innerHTML = '';

    let firstField = document.createElement('p');
    let secondField = document.createElement('p');
    let thirdField = document.createElement('p');
    let fourthField = document.createElement('p');
    let fifthField = document.createElement('p');

    let service = personEmail.value.split('@');
    let toSumOf = personPhone.value.replace(/[^0-9]/g, '');
    let sum = Array.from(toSumOf).map(v => parseFloat(v)).reduce((acc, num) => acc + num, 0);
    let lengthName = personName.value;

    firstField.innerText = `Привет, ${isValidName()}`;
    secondField.innerText = `Моя почта ${service[0]} в сервисе ${service[1]}`;
    thirdField.innerText = `Сумма цифр в моём телефоне равна ${sum}`;
    fourthField.innerText = `Длина моего имени ${(lengthName.length % 2 == 0) ? 'четная' : 'нечетная'}`;
    fifthField.innerText = `Сегодня: ${new Date().toLocaleDateString()}`;

    createDiv.insertAdjacentElement('beforeend', firstField);
    createDiv.insertAdjacentElement('beforeend', secondField);
    createDiv.insertAdjacentElement('beforeend', thirdField);
    createDiv.insertAdjacentElement('beforeend', fourthField);
    createDiv.insertAdjacentElement('beforeend', fifthField);

    parag.insertAdjacentElement('beforeend', createDiv);
    btnClear.style.display = 'block';
}

function clearAll() {
    createDiv.remove();
    parag.innerHTML = content[0];
    btnClear.style.display = 'none';
}

// Функция вывода сообщений об ошибке
function message(str) {
    let errName = document.querySelector('#errName');
    let errEmail = document.querySelector('#errEmail');
    let errPhone = document.querySelector('#errPhone');

    errName.innerText = `${str}`;
    errEmail.innerText = `${str}`;
    errPhone.innerText = `${str}`;

    errName.style.display = 'block';
    errEmail.style.display = 'block';
    errPhone.style.display = 'block';

}