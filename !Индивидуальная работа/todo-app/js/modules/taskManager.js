// js/modules/taskManager.js
/**
 * Модуль для управления задачами: добавление, удаление, редактирование, изменение статуса, поиск, фильтрация, сортировка.
 */

import { saveTasks, loadTasks } from '../utils/helpers.js';

let tasks = loadTasks(); // Загружаем задачи при инициализации модуля

/**
 * Возвращает текущий список задач.
 * @returns {Array<Object>} Массив объектов задач.
 */
export const getTasks = () => [...tasks]; // Возвращаем копию, чтобы избежать прямого изменения извне

/**
 * Добавляет новую задачу в список.
 * @param {string} text - Текст задачи.
 * @returns {Object} Добавленная задача.
 */
export const addTask = (text) => {
    const newTask = {
        id: Date.now().toString(), // Простой уникальный ID
        text: text.trim(),
        completed: false,
        order: tasks.length // Используем для dragNdrop
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
};

/**
 * Удаляет задачу по её ID.
 * @param {string} id - ID задачи.
 * @returns {boolean} True, если задача удалена, иначе false.
 */
export const deleteTask = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    return tasks.length < initialLength;
};

/**
 * Обновляет текст задачи по её ID.
 * @param {string} id - ID задачи.
 * @param {string} newText - Новый текст задачи.
 * @returns {boolean} True, если задача обновлена, иначе false.
 */
export const updateTaskText = (id, newText) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.text = newText.trim();
        saveTasks(tasks);
        return true;
    }
    return false;
};

/**
 * Переключает статус выполнения задачи (completed/active) по её ID.
 * @param {string} id - ID задачи.
 * @returns {boolean} True, если статус изменен, иначе false.
 */
export const toggleTaskStatus = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        return true;
    }
    return false;
};

/**
 * Фильтрует задачи по статусу.
 * @param {string} filter - 'all', 'active' или 'completed'.
 * @returns {Array<Object>} Отфильтрованный массив задач.
 */
export const filterTasks = (filter) => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'all':
        default:
            return tasks;
    }
};

/**
 * Ищет задачи по текстовому запросу (без учета регистра).
 * @param {string} query - Поисковый запрос.
 * @returns {Array<Object>} Массив задач, соответствующих запросу.
 */
export const searchTasks = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
        return tasks; // Если запрос пуст, возвращаем все задачи
    }
    return tasks.filter(task =>
        task.text.toLowerCase().includes(lowerCaseQuery)
    );
};

/**
 * Сортирует задачи по порядку, заданному drag-n-drop.
 * @param {Array<Object>} sortedTasks - Массив задач в новом порядке.
 */
export const updateTaskOrder = (sortedTasks) => {
    tasks = sortedTasks.map((task, index) => ({ ...task, order: index }));
    saveTasks(tasks);
};