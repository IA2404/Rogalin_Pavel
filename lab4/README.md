1. index.html (главная страница)
   html

<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Мета-информация и настройки страницы -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Финансовый менеджер</title>
    <!-- Подключение стилей -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Основной контейнер приложения -->
    <div class="container">
        <!-- Заголовок приложения -->
        <h1>Учет транзакций</h1>

        <!-- Форма для добавления новых транзакций -->
        <form id="transaction-form">
            <!-- Группа поля для суммы -->
            <div class="form-group">
                <label for="amount">Сумма:</label>
                <input type="number" id="amount" required>
            </div>
            
            <!-- Группа поля для категории -->
            <div class="form-group">
                <label for="category">Категория:</label>
                <select id="category" required>
                    <option value="">Выберите категорию</option>
                    <option value="Продукты">Продукты</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Жилье">Жилье</option>
                    <option value="Развлечения">Развлечения</option>
                    <option value="Здоровье">Здоровье</option>
                    <option value="Доход">Доход</option>
                </select>
            </div>
            
            <!-- Группа поля для описания -->
            <div class="form-group">
                <label for="description">Описание:</label>
                <textarea id="description" required></textarea>
            </div>
            
            <!-- Кнопка отправки формы -->
            <button type="submit" id="submit-btn">Добавить транзакцию</button>
        </form>
        
        <!-- Блок с общей суммой транзакций -->
        <div class="summary">
            <h2>Общий баланс: <span id="total-amount">0</span></h2>
        </div>
        
        <!-- Таблица для отображения списка транзакций -->
        <table id="transactions-table">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Описание</th>
                    <th>Сумма</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody></tbody> <!-- Сюда будут добавляться строки с транзакциями -->
        </table>
        
        <!-- Блок для отображения деталей транзакции -->
        <div id="transaction-details"></div>
    </div>
    
    <!-- Подключение главного JavaScript-файла -->
    <script src="src/index.js" type="module"></script>
</body>
</html>

2. style.css (стили приложения)
   css

/* Основные стили для body */
body {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
line-height: 1.6;
margin: 0;
padding: 20px;
background-color: #f5f9ff;
/* Анимация плавного появления страницы */
animation: fadeIn 0.8s ease-out;
}

/* Анимация появления страницы */
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

/* Стили для основного контейнера */
.container {
max-width: 1000px;
margin: 0 auto;
background: white;
padding: 25px;
border-radius: 12px;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
/* Эффекты при наведении на контейнер */
transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Стили для заголовков */
h1, h2 {
color: #2c3e50;
/* Анимация появления заголовков */
animation: slideDown 0.6s ease-out;
}

/* Стили для формы */
.form-group {
margin-bottom: 20px;
/* Анимация появления полей формы */
animation: fadeInUp 0.5s ease-out;
}

/* Стили для таблицы транзакций */
table {
width: 100%;
border-collapse: separate;
border-spacing: 0;
margin-top: 25px;
border-radius: 10px;
overflow: hidden;
/* Анимация появления таблицы */
animation: scaleIn 0.5s ease-out;
}

/* Стили для строк доходов */
.income {
background-color: rgba(46, 204, 113, 0.08);
/* Пульсирующая анимация для новых доходов */
animation: pulseGreen 1.5s ease-in-out;
}

/* Стили для строк расходов */
.expense {
background-color: rgba(231, 76, 60, 0.08);
/* Пульсирующая анимация для новых расходов */
animation: pulseRed 1.5s ease-in-out;
}

/* Стили для блока с деталями транзакции */
#transaction-details {
margin-top: 25px;
padding: 20px;
background-color: #f8f9fa;
border-radius: 10px;
border-left: 5px solid #2ecc71;
/* Анимация разворачивания блока */
animation: fadeInExpand 0.6s ease-out;
}

3. src/index.js (главный модуль)
   javascript

// Импорт функций из других модулей
import { addTransaction, deleteTransaction, transactions, calculateTotal } from './transactions.js';
import { renderTransactionTable, renderTransactionDetails, setupForm } from './ui.js';

// Основная функция инициализации приложения
function init() {
// Настройка формы добавления транзакции
setupForm();

    // Первоначальная отрисовка таблицы транзакций
    renderTransactionTable(transactions);
    
    // Расчет и отображение общего баланса
    calculateTotal();
    
    // Обработчик кликов по таблице
    document.getElementById('transactions-table').addEventListener('click', (e) => {
        // Если кликнули по кнопке удаления
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            deleteTransaction(id);
            return;
        }
        
        // Если кликнули по строке транзакции
        const row = e.target.closest('tr');
        if (row && row.dataset.id) {
            const transaction = transactions.find(t => t.id === row.dataset.id);
            if (transaction) renderTransactionDetails(transaction);
        }
    });
}

// Запуск приложения
init();

4. src/transactions.js (логика работы с транзакциями)
   javascript

// Импорт необходимых функций
import { renderTransactionTable, updateTotalAmount } from './ui.js';
import { generateId } from './utils.js';

// Массив для хранения всех транзакций
let transactions = [];

// Функция добавления новой транзакции
function addTransaction(amount, category, description) {
// Форматирование суммы (2 знака после запятой)
const amountNumber = parseFloat(amount).toFixed(2);

    // Создание объекта транзакции
    const transaction = {
        id: generateId(), // Генерация уникального ID
        date: new Date(), // Текущая дата и время
        amount: parseFloat(amountNumber), // Сумма как число
        category, // Категория транзакции
        description // Описание транзакции
    };
    
    // Добавление транзакции в массив
    transactions.push(transaction);
    
    // Обновление таблицы и общего баланса
    renderTransactionTable(transactions);
    calculateTotal();
    
    return transaction;
}

// Функция удаления транзакции
function deleteTransaction(id) {
// Фильтрация массива (удаление транзакции с указанным ID)
transactions = transactions.filter(t => t.id !== id);

    // Обновление таблицы и общего баланса
    renderTransactionTable(transactions);
    calculateTotal();
}

// Функция расчета общего баланса
function calculateTotal() {
// Суммирование всех транзакций
const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Обновление отображения общей суммы
    updateTotalAmount(total);
    
    return total;
}

// Экспорт функций и данных
export { addTransaction, deleteTransaction, calculateTotal, transactions };

5. src/ui.js (пользовательский интерфейс)
   javascript

// Импорт необходимых функций
import { addTransaction, deleteTransaction } from './transactions.js';
import { formatDate } from './utils.js';

// Настройка формы добавления транзакции
function setupForm() {
const form = document.getElementById('transaction-form');

    // Обработчик отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получение значений из формы
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        
        // Проверка заполнения всех полей
        if (!amount || !category || !description) {
            alert('Заполните все поля');
            return;
        }
        
        // Добавление новой транзакции
        addTransaction(amount, category, description);
        
        // Сброс формы
        form.reset();
    });
}

// Отрисовка таблицы транзакций
function renderTransactionTable(transactions) {
const tbody = document.querySelector('#transactions-table tbody');
tbody.innerHTML = ''; // Очистка таблицы

    // Добавление строк для каждой транзакции
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.dataset.id = transaction.id; // Сохранение ID в атрибуте
        
        // Класс для стилизации (доход/расход)
        row.className = transaction.amount >= 0 ? 'income' : 'expense';
        
        // Заполнение строки данными
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.category}</td>
            <td>${getShortDescription(transaction.description)}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Отображение деталей транзакции
function renderTransactionDetails(transaction) {
const detailsDiv = document.getElementById('transaction-details');
detailsDiv.innerHTML = `
        <h3>Детали транзакции</h3>
        <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
        <p><strong>Категория:</strong> ${transaction.category}</p>
        <p><strong>Сумма:</strong> ${transaction.amount.toFixed(2)}</p>
        <p><strong>Описание:</strong> ${transaction.description}</p>
    `;
}

// Обновление отображения общей суммы
function updateTotalAmount(total) {
const totalElement = document.getElementById('total-amount');
totalElement.textContent = total.toFixed(2);

    // Анимация изменения суммы
    totalElement.classList.add('changed');
    setTimeout(() => totalElement.classList.remove('changed'), 700);
    
    // Цвет в зависимости от значения (положительное/отрицательное)
    totalElement.style.color = total >= 0 ? '#2ecc71' : '#e74c3c';
}

// Получение краткого описания (первые 4 слова)
function getShortDescription(description) {
const words = description.split(' ');
return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
}

// Экспорт функций
export { renderTransactionTable, renderTransactionDetails, setupForm, updateTotalAmount };

6. src/utils.js (вспомогательные функции)
   javascript

// Генерация уникального ID для транзакции
function generateId() {
// Используем текущую метку времени и случайное число
return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Форматирование даты в читаемый вид
function formatDate(date) {
const d = new Date(date);

    // Получение компонентов даты с добавлением ведущих нулей
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    
    // Формат: ДД.ММ.ГГГГ ЧЧ:ММ
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Экспорт функций
export { generateId, formatDate };


Заключение

Каждый файл в проекте имеет четкое назначение:

    index.html - структура страницы

    style.css - визуальное оформление и анимации

    index.js - точка входа и основная логика приложения

    transactions.js - работа с данными транзакций

    ui.js - взаимодействие с пользовательским интерфейсом

    utils.js - вспомогательные утилиты




1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
   Доступ к элементу на веб-странице можно получить с помощью методов DOM API, таких как:

   document.getElementById("id") — выбирает элемент по его id.

   document.getElementsByClassName("class") — выбирает все элементы с заданным классом.

   document.getElementsByTagName("tag") — выбирает все элементы с заданным тегом.

   document.querySelector("selector") — выбирает первый элемент, соответствующий CSS-селектору.

   document.querySelectorAll("selector") — выбирает все элементы, соответствующие CSS-селектору.


2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
   Делегирование событий — это техника, при которой обработчик события назначается не каждому отдельному элементу, а общему родительскому элементу. Это возможно благодаря тому, что события в DOM распространяются (всплывают) от вложенных элементов вверх по дереву.

Преимущества:

    Меньше обработчиков → выше производительность.

    Можно обрабатывать элементы, добавленные динамически.

3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
   Содержимое можно изменить следующими способами:

   element.innerHTML = "новый HTML" — изменяет HTML-содержимое.

   element.textContent = "новый текст" — изменяет только текст, без интерпретации HTML.

   element.innerText = "новый текст" — также изменяет текст, но учитывает стили.

4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript?
   Процесс добавления нового элемента:

   Создать элемент: document.createElement("tag")

   (Опционально) Добавить текст или атрибуты.

   Вставить в DOM: parent.appendChild(element) или parent.insertBefore(...)