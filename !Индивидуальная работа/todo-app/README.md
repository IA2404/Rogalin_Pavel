# To-Do List на Vanilla JavaScript

Это простое веб-приложение "To-Do List", разработанное с использованием чистого JavaScript (Vanilla JS), HTML и CSS. Оно позволяет пользователям добавлять, удалять, редактировать, искать и фильтровать задачи, а также менять их порядок с помощью Drag and Drop.

## Функциональные возможности

- **Добавление задач**: Добавляйте новые задачи в список.
- **Удаление задач**: Удаляйте задачи из списка.
- **Редактирование задач**: Изменяйте текст существующих задач с помощью модального окна.
- **Отметка о выполнении**: Переключайте статус задачи между "активной" и "выполненной".
- **Поиск задач**: Ищите задачи по ключевым словам.
- **Фильтрация задач**: Фильтруйте задачи по статусу ("Все", "Активные", "Выполненные").
- **Drag and Drop**: Изменяйте порядок задач в списке с помощью перетаскивания.
- **Валидация ввода**: Предотвращает добавление пустых задач и задач слишком короткой длины, отображая сообщения об ошибках.
- **Сохранение данных**: Задачи сохраняются в локальном хранилище браузера, поэтому они остаются после закрытия страницы.
- **Адаптивный дизайн**: Интерфейс приложения адаптируется под различные размеры экранов.

## Технологии

- **HTML5**: Структура страницы.
- **CSS3**: Стилизация и адаптивный дизайн.
- **JavaScript (ES6+)**: Вся логика приложения, включая работу с DOM, обработку событий, валидацию, управление данными и модульную структуру.

## Структура проекта

To-Do List на Vanilla JavaScript

Это простое, но полнофункциональное веб-приложение "To-Do List", разработанное с использованием чистого JavaScript (Vanilla JS), HTML5 и CSS3. Оно предоставляет интуитивно понятный интерфейс для эффективного управления задачами, позволяя пользователям добавлять, удалять, редактировать, искать и фильтровать задачи, а также менять их порядок с помощью функции Drag and Drop.
✨ Основные функциональные возможности

    Добавление задач: Быстро добавляйте новые задачи в список с помощью поля ввода.
    HTML

<form id="task-form">
    <input type="text" id="task-input" placeholder="Добавить новую задачу..." required>
    <button type="submit">Добавить</button>
</form>

JavaScript

// js/app.js
import { addTask } from './modules/taskManager.js';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        // Обновить UI
    }
});

Удаление задач: Легко удаляйте ненужные задачи из списка одним кликом.
JavaScript

// js/modules/uiHandler.js (часть, где создается кнопка)
import { deleteTask } from './taskManager.js';

const deleteButton = document.createElement('button');
deleteButton.textContent = '🗑️';
deleteButton.classList.add('delete-button');
deleteButton.addEventListener('click', () => {
    deleteTask(task.id);
    // Обновить UI
});

JavaScript

// js/modules/taskManager.js
import { saveTasks } from '../utils/helpers.js';

let tasks = []; // Инициализация или загрузка

export const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
};

Редактирование задач: Изменяйте текст существующих задач через удобное модальное окно, обеспечивая гибкость в управлении списками.
HTML

<div id="modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Редактировать задачу</h2>
        <input type="text" id="edit-task-input">
        <button id="save-edit-button">Сохранить</button>
        <div id="edit-task-error" class="error-message"></div>
    </div>
</div>

JavaScript

// js/modules/uiHandler.js
import { updateTaskText } from './taskManager.js';

const modal = document.getElementById('modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveEditButton = document.getElementById('save-edit-button');
let currentEditingTaskId = null;

export const openEditModal = (taskId, taskText) => {
    currentEditingTaskId = taskId;
    editTaskInput.value = taskText;
    modal.style.display = 'flex';
};

saveEditButton.addEventListener('click', () => {
    const newText = editTaskInput.value.trim();
    if (newText && currentEditingTaskId) {
        updateTaskText(currentEditingTaskId, newText);
        modal.style.display = 'none';
        // Обновить UI
    }
});

Отметка о выполнении: Переключайте статус задачи между "активной" и "выполненной" с помощью чекбокса, помогая отслеживать прогресс.
JavaScript

// js/modules/uiHandler.js (часть, где создается чекбокс)
import { toggleTaskStatus } from './taskManager.js';

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.classList.add('task-checkbox');
checkbox.checked = task.completed;
checkbox.addEventListener('change', () => {
    toggleTaskStatus(task.id);
    // Обновить UI
});

Поиск задач: Мгновенно находите нужные задачи по ключевым словам благодаря функции поиска в реальном времени.
HTML

<input type="text" id="search-input" placeholder="Поиск задач...">

JavaScript

// js/app.js
const searchInput = document.getElementById('search-input');
// ...
searchInput.addEventListener('input', () => {
    window.currentSearchQuery = searchInput.value;
    updateDisplayedTasks(); // Функция, которая фильтрует и рендерит
});

JavaScript

// js/modules/taskManager.js
export const searchTasks = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) return tasks;
    return tasks.filter(task => task.text.toLowerCase().includes(lowerCaseQuery));
};

Фильтрация задач: Сортируйте задачи по статусу ("Все", "Активные", "Выполненные") для более удобного просмотра.
HTML

<select id="filter-select">
    <option value="all">Все</option>
    <option value="active">Активные</option>
    <option value="completed">Выполненные</option>
</select>

JavaScript

// js/app.js
const filterSelect = document.getElementById('filter-select');
// ...
filterSelect.addEventListener('change', () => {
    window.currentFilter = filterSelect.value;
    updateDisplayedTasks(); // Функция, которая фильтрует и рендерит
});

JavaScript

// js/modules/taskManager.js
export const filterTasks = (filter) => {
    switch (filter) {
        case 'active': return tasks.filter(task => !task.completed);
        case 'completed': return tasks.filter(task => task.completed);
        default: return tasks;
    }
};

Drag and Drop: Интуитивно меняйте порядок задач в списке, перетаскивая их в нужное место.
JavaScript

// js/modules/uiHandler.js (частично)
const initDragAndDrop = (onUpdateUI) => {
    const taskItems = document.querySelectorAll('.task-item');
    let dragSrcEl = null;

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.id); // Передача ID
        this.classList.add('dragging');
    }

    function handleDrop(e) {
        e.stopPropagation();
        if (dragSrcEl !== this) {
            const draggedId = dragSrcEl.dataset.id;
            const targetId = this.dataset.id;

            const allTasks = [...window.filteredAndSearchedTasks];
            const draggedTaskIndex = allTasks.findIndex(t => t.id === draggedId);
            const targetTaskIndex = allTasks.findIndex(t => t.id === targetId);

            const [draggedTask] = allTasks.splice(draggedTaskIndex, 1);
            allTasks.splice(targetTaskIndex, 0, draggedTask);

            // Обновляем порядок задач в taskManager и вызываем перерисовку UI
            updateTaskOrder(allTasks);
            onUpdateUI();
        }
        return false;
    }

    taskItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragover', (e) => e.preventDefault(), false); // Важно для drop
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', () => item.classList.remove('dragging'), false);
    });
};

Валидация пользовательского ввода: Приложение предотвращает добавление пустых задач или задач с недостаточной длиной, отображая понятные сообщения об ошибках для пользователя.
JavaScript

// js/modules/validator.js
export const validateTextInput = (value, minLength = 3) => {
    if (!value || value.trim() === '') {
        return 'Поле не может быть пустым.';
    }
    if (value.trim().length < minLength) {
        return `Минимальная длина ${minLength} символа.`;
    }
    return null;
};

export const displayError = (errorElement, message) => {
    if (errorElement) {
        errorElement.textContent = message || '';
        errorElement.style.display = message ? 'block' : 'none';
    }
};

Сохранение данных: Все задачи автоматически сохраняются в локальном хранилище браузера, что гарантирует их сохранность даже после закрытия страницы или перезагрузки браузера.
JavaScript

// js/utils/helpers.js
const STORAGE_KEY = 'todoListTasks';

export const loadTasks = () => {
    try {
        const tasks = localStorage.getItem(STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    } catch (e) {
        console.error("Ошибка загрузки задач:", e);
        return [];
    }
};

export const saveTasks = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error("Ошибка сохранения задач:", e);
    }
};

Адаптивный дизайн: Интерфейс приложения полностью адаптирован под различные размеры экранов, обеспечивая комфортное использование как на десктопах, так и на мобильных устройствах.
CSS

/* css/style.css */
/* Базовые стили */
body { /* ... */ }
.container { /* ... */ }

/* Медиазапросы для адаптивности */
@media (max-width: 600px) {
    .task-form {
        flex-direction: column;
    }
    .controls {
        flex-direction: column;
    }
    .task-item {
        flex-direction: column;
        align-items: flex-start;
    }
    .task-buttons {
        margin-left: 0;
        width: 100%;
        justify-content: flex-end;
    }
}