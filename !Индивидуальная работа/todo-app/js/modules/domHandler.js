// js/modules/domHandler.js
/**
 * Модуль для работы с DOM: создание, изменение, удаление элементов, получение ссылок.
 */

/**
 * Получает ссылку на HTML-элемент по его ID.
 * @param {string} id - ID элемента.
 * @returns {HTMLElement} Ссылка на HTML-элемент.
 */
export const getElement = (id) => document.getElementById(id);

/**
 * Создает новый HTML-элемент.
 * @param {string} tagName - Имя тега (e.g., 'div', 'li').
 * @param {Object} [attributes={}] - Объект с атрибутами элемента (e.g., { class: 'my-class', id: 'my-id' }).
 * @param {string} [textContent=''] - Текстовое содержимое элемента.
 * @returns {HTMLElement} Созданный HTML-элемент.
 */
export const createElement = (tagName, attributes = {}, textContent = '') => {
    const element = document.createElement(tagName);
    for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
};

/**
 * Добавляет дочерний элемент к родительскому.
 * @param {HTMLElement} parent - Родительский элемент.
 * @param {HTMLElement} child - Дочерний элемент.
 */
export const appendChild = (parent, child) => {
    if (parent && child) {
        parent.appendChild(child);
    }
};

/**
 * Удаляет элемент из DOM.
 * @param {HTMLElement} element - Элемент для удаления.
 */
export const removeElement = (element) => {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};

/**
 * Добавляет или удаляет класс у элемента.
 * @param {HTMLElement} element - Элемент.
 * @param {string} className - Имя класса.
 * @param {boolean} add - Если true, класс добавляется; если false, удаляется.
 */
export const toggleClass = (element, className, add) => {
    if (element) {
        if (add) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }
};

/**
 * Устанавливает или очищает текстовое содержимое элемента.
 * @param {HTMLElement} element - Элемент.
 * @param {string} text - Текст для установки. Если пустая строка, текст очищается.
 */
export const setElementText = (element, text) => {
    if (element) {
        element.textContent = text;
    }
};