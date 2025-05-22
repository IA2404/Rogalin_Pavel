// js/modules/uiHandler.js
import { createElement, appendChild, removeElement, toggleClass, getElement, setElementText } from './domHandler.js';
import { deleteTask, toggleTaskStatus, updateTaskText, updateTaskOrder } from './taskManager.js';
import { validateTextInput, displayError } from './validator.js';

const taskList = getElement('task-list');
const noTasksMessage = getElement('no-tasks-message');
const modal = getElement('modal');
const closeButton = modal ? modal.querySelector('.close-button') : null;
const editTaskInput = getElement('edit-task-input');
const saveEditButton = getElement('save-edit-button');
const editTaskError = getElement('edit-task-error');

let currentEditingTaskId = null;
let updateAppUI = null; // Будет инициализировано из app.js

/**
 * Инициализирует UI-обработчик, передавая функцию для полного обновления UI из основного приложения.
 * @param {function} appUpdateCallback - Функция, которая полностью обновляет UI приложения (например, updateDisplayedTasks из app.js).
 */
export const initUIHandler = (appUpdateCallback) => {
    updateAppUI = appUpdateCallback;

    if (closeButton) {
        closeButton.addEventListener('click', closeEditModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEditModal();
            }
        });
    }
    if (saveEditButton) {
        saveEditButton.addEventListener('click', () => handleSaveEdit());
    }
    if (editTaskInput) {
        editTaskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSaveEdit();
            }
        });
    }
};

export const createTaskElement = (task) => {
    const listItem = createElement('li', {
        class: `task-item ${task.completed ? 'completed' : ''}`,
        'data-id': task.id,
        draggable: 'true'
    });

    const checkbox = createElement('input', {
        type: 'checkbox',
        class: 'task-checkbox',
        checked: task.completed
    });
    checkbox.addEventListener('change', () => {
        toggleTaskStatus(task.id);
        updateAppUI(); // Вызываем переданный колбэк для обновления всего UI
    });

    const taskText = createElement('span', { class: 'task-text' }, task.text);

    const buttonsContainer = createElement('div', { class: 'task-buttons' });

    const editButton = createElement('button', { class: 'edit-button' }, '✏️');
    editButton.addEventListener('click', () => {
        openEditModal(task.id, task.text);
    });

    const deleteButton = createElement('button', { class: 'delete-button' }, '🗑️');
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
        updateAppUI(); // Вызываем переданный колбэк для обновления всего UI
    });

    appendChild(buttonsContainer, editButton);
    appendChild(buttonsContainer, deleteButton);
    appendChild(listItem, checkbox);
    appendChild(listItem, taskText);
    appendChild(listItem, buttonsContainer);

    return listItem;
};

export const renderTasks = (tasks) => {
    if (!taskList) {
        console.error("Элемент 'task-list' не найден.");
        return;
    }

    taskList.innerHTML = '';

    if (tasks.length === 0) {
        setElementText(noTasksMessage, 'Пока нет задач. Добавьте первую!');
        toggleClass(noTasksMessage, 'hidden', false);
    } else {
        setElementText(noTasksMessage, '');
        toggleClass(noTasksMessage, 'hidden', true);
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            appendChild(taskList, taskElement);
        });
    }

    initDragAndDrop(); // Инициализация Drag and Drop
};

export const openEditModal = (taskId, taskText) => {
    if (modal && editTaskInput) {
        currentEditingTaskId = taskId;
        editTaskInput.value = taskText;
        modal.style.display = 'flex';
        displayError(editTaskError, null);
        editTaskInput.focus();
    }
};

export const closeEditModal = () => {
    if (modal) {
        modal.style.display = 'none';
        currentEditingTaskId = null;
        displayError(editTaskError, null);
    }
};

export const handleSaveEdit = () => { // Удален параметр updateCallback
    if (currentEditingTaskId && editTaskInput) {
        const newText = editTaskInput.value.trim();
        const errorMessage = validateTextInput(newText);

        if (errorMessage) {
            displayError(editTaskError, errorMessage);
            return;
        }

        if (updateTaskText(currentEditingTaskId, newText)) {
            closeEditModal();
            updateAppUI(); // Вызываем переданный колбэк для обновления всего UI
        } else {
            displayError(editTaskError, "Не удалось обновить задачу.");
        }
    }
};


const initDragAndDrop = () => {
    const taskItems = taskList.querySelectorAll('.task-item');
    let dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        toggleClass(this, 'dragging', true);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl !== this) {
            const draggedId = dragSrcEl.dataset.id;
            const targetId = this.dataset.id;

            // Нужно получить актуальный список задач из taskManager.js
            // Или передать его сюда при инициализации
            // Для простоты, здесь мы используем window.filteredAndSearchedTasks,
            // но более строго было бы получать актуальный список из taskManager.js
            // и передавать его здесь.
            const allTasks = [...window.filteredAndSearchedTasks]; // Копируем текущий отображаемый список

            const draggedTaskIndex = allTasks.findIndex(task => task.id === draggedId);
            const targetTaskIndex = allTasks.findIndex(task => task.id === targetId);

            if (draggedTaskIndex > -1 && targetTaskIndex > -1) {
                const [draggedTask] = allTasks.splice(draggedTaskIndex, 1);
                allTasks.splice(targetTaskIndex, 0, draggedTask);

                updateTaskOrder(allTasks); // Обновляем порядок в taskManager
                updateAppUI(); // Вызываем колбэк для обновления UI
            }
        }
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        taskItems.forEach(item => {
            item.classList.remove('over');
            toggleClass(item, 'dragging', false);
        });
    }

    taskItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
};