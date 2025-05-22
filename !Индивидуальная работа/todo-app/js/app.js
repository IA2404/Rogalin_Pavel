// js/app.js
import { getElement, setElementText, toggleClass } from './modules/domHandler.js';
import { addTask, getTasks } from './modules/taskManager.js';
import { renderTasks, initUIHandler } from './modules/uiHandler.js'; // Добавим initUIHandler
import { validateTextInput, displayError } from './modules/validator.js';

const taskForm = getElement('task-form');
const taskInput = getElement('task-input');
const taskInputError = getElement('task-input-error');
const searchInput = getElement('search-input');
const filterSelect = getElement('filter-select');

window.currentFilter = 'all';
window.currentSearchQuery = '';
window.filteredAndSearchedTasks = [];

/**
 * Обновляет отображаемый список задач, применяя текущие фильтры и поисковые запросы.
 */
const updateDisplayedTasks = () => {
    let tasksToDisplay = getTasks(); // Получаем все задачи

    // Применяем поиск
    const lowerCaseQuery = window.currentSearchQuery.toLowerCase().trim();
    if (lowerCaseQuery) {
        tasksToDisplay = tasksToDisplay.filter(task =>
            task.text.toLowerCase().includes(lowerCaseQuery)
        );
    }

    // Применяем фильтрацию
    tasksToDisplay = tasksToDisplay.filter(task => {
        if (window.currentFilter === 'active') {
            return !task.completed;
        } else if (window.currentFilter === 'completed') {
            return task.completed;
        }
        return true; // 'all'
    });

    // Обновляем глобальный список для Drag-n-Drop и других модулей
    window.filteredAndSearchedTasks = tasksToDisplay;

    renderTasks(tasksToDisplay); // Вызываем рендеринг
};

const handleAddTask = (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    const errorMessage = validateTextInput(taskText);

    if (errorMessage) {
        displayError(taskInputError, errorMessage);
        return;
    }

    addTask(taskText);
    taskInput.value = '';
    displayError(taskInputError, null);
    updateDisplayedTasks(); // Обновляем список задач
};

const handleSearchInput = () => {
    window.currentSearchQuery = searchInput.value;
    updateDisplayedTasks();
};

const handleFilterChange = () => {
    window.currentFilter = filterSelect.value;
    updateDisplayedTasks();
};

// Добавление обработчиков событий
if (taskForm) {
    taskForm.addEventListener('submit', handleAddTask);
} else {
    console.error("Элемент 'task-form' не найден.");
}

if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
} else {
    console.error("Элемент 'search-input' не найден.");
}

if (filterSelect) {
    filterSelect.addEventListener('change', handleFilterChange);
} else {
    console.error("Элемент 'filter-select' не найден.");
}

// Инициализация UI-обработчика, передавая ему функцию для обновления UI
initUIHandler(updateDisplayedTasks);

// Инициализация: отображение задач при загрузке страницы
document.addEventListener('DOMContentLoaded', updateDisplayedTasks);