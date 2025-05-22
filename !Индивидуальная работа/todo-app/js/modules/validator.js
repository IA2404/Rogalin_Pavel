// js/modules/validator.js
/**
 * Модуль для валидации пользовательского ввода.
 */

/**
 * Валидирует текстовое поле на пустоту и минимальную длину.
 * @param {string} value - Значение текстового поля.
 * @param {number} minLength - Минимальная допустимая длина.
 * @returns {string|null} Сообщение об ошибке, если ввод невалиден, иначе null.
 */
export const validateTextInput = (value, minLength = 3) => {
    if (!value || value.trim() === '') {
        return 'Поле не может быть пустым.';
    }
    if (value.trim().length < minLength) {
        return `Минимальная длина ${minLength} символа.`;
    }
    return null; // Валидация успешна
};

/**
 * Отображает сообщение об ошибке в указанном элементе.
 * @param {HTMLElement} errorElement - Элемент для отображения ошибки.
 * @param {string|null} message - Сообщение об ошибке. Если null, сообщение очищается.
 */
export const displayError = (errorElement, message) => {
    if (errorElement) {
        errorElement.textContent = message || '';
        errorElement.style.display = message ? 'block' : 'none'; // Показать/скрыть элемент
    }
};