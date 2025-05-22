// js/modules/helpers.js
/**
 * Вспомогательный модуль для работы с локальным хранилищем.
 */

const STORAGE_KEY = 'todoListTasks';

/**
 * Загружает задачи из локального хранилища.
 * @returns {Array<Object>} Массив задач.
 */
export const loadTasks = () => {
    try {
        const tasks = localStorage.getItem(STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    } catch (e) {
        console.error("Ошибка загрузки задач из локального хранилища:", e);
        return [];
    }
};

/**
 * Сохраняет задачи в локальное хранилище.
 * @param {Array<Object>} tasks - Массив задач для сохранения.
 */
export const saveTasks = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error("Ошибка сохранения задач в локальное хранилище:", e);
    }
};