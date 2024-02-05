let tableData = [];     // массив хранения данных

// функция для отрисовки таблицы
function renderTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    tableData.forEach((item, index) => {    // проход по каждому эллементу
    let row = tableBody.insertRow();
    
    for (let key in item) { // перебор ключей и внесение в таблицу в соответствии с ключом 
        if (key === 'id') {
            continue;
        } else if (key === 'name') {
            // добавление ячейки для имени и фамилии(разбиение на 2)
            let cellFirstName = row.insertCell();
            let cellLastName = row.insertCell();
            cellFirstName.appendChild(document.createTextNode(item.name.firstName));
            cellLastName.appendChild(document.createTextNode(item.name.lastName));
        } else if (key === 'phone') {
            let cellPhone = row.insertCell();
            cellPhone.appendChild(document.createTextNode(item.phone));
        } else if (key === 'about') {
            let cellAbout = row.insertCell();
            let aboutText = item[key];
            if (aboutText.length > 50) {        // обрезаем символы в about и ставим "..."
                aboutText = aboutText.substring(0, 70) + '...';
            }
            cellAbout.textContent = aboutText;
            cellAbout.setAttribute('title', item[key]);
            cellAbout.style.whiteSpace = 'pre-wrap';        // вывод подсказки
        } else if (key === 'eyeColor') {
            let cellEyeColor = row.insertCell();
            // Добавляем класс в зависимости от цвета глаз
            cellEyeColor.classList.add(item.eyeColor.toLowerCase()+ '-eye');
        }
}

    row.addEventListener('click', () => showEditForm(index));   // обработчик события при нажатии на ячейку
    });
}
  
function sortTable(column) {    // функция сортировки
    tableData.sort((a, b) => {
        if (column === 'firstName') {
            return a.name.firstName.localeCompare(b.name.firstName);
        } else if (column === 'lastName') {
                return a.name.lastName.localeCompare(b.name.lastName);
        } else {
            return a[column].localeCompare(b[column]);
        }
    });
    renderTable();
}

document.addEventListener('DOMContentLoaded', function() {  // загрузка данных из json
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        tableData = data;
        renderTable();
    });

    document.querySelectorAll('th').forEach(header => {     //  обработчик клика на заголовок для сортировки
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            sortTable(column);
        });
    });
});

function showEditForm(rowIndex) {       // функция для отображение формы редактирования
    const selectedRow = tableData[rowIndex];
    
    document.getElementById('editFirstName').value = selectedRow.name.firstName;
    document.getElementById('editLastName').value = selectedRow.name.lastName;
    document.getElementById('editPhone').value = selectedRow.phone;
    document.getElementById('editAbout').value = selectedRow.about;
    document.getElementById('editEyeColor').value = selectedRow.eyeColor;
    
    document.getElementById('editForm').style.display = 'block';        // отображение формы редактирования
}


