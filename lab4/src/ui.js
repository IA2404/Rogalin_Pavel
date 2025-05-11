import { addTransaction, deleteTransaction } from './transactions.js';
import { formatDate } from './utils.js';

function setupForm() {
    const form = document.getElementById('transaction-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const amountInput = document.getElementById('amount');
        const categoryInput = document.getElementById('category');
        const descriptionInput = document.getElementById('description');

        // Проверка заполнения полей
        if (!amountInput.value || !categoryInput.value || !descriptionInput.value) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        addTransaction(amountInput.value, categoryInput.value, descriptionInput.value);
        form.reset();
    });
}

function renderTransactionTable(transactions) {
    const tbody = document.querySelector('#transactions-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.dataset.id = transaction.id;

        row.className = transaction.amount >= 0 ? 'income' : 'expense';

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

function renderTransactionDetails(transaction) {
    const detailsDiv = document.getElementById('transaction-details');
    if (!detailsDiv) return;

    detailsDiv.innerHTML = `
        <h3>Детали транзакции</h3>
        <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
        <p><strong>Категория:</strong> ${transaction.category}</p>
        <p><strong>Сумма:</strong> ${transaction.amount.toFixed(2)}</p>
        <p><strong>Полное описание:</strong> ${transaction.description}</p>
    `;
}

function updateTotalAmount(total) {
    const totalElement = document.getElementById('total-amount');
    if (!totalElement) return;

    totalElement.textContent = total.toFixed(2);
    totalElement.style.color = total >= 0 ? 'green' : 'red';
}

function getShortDescription(description) {
    if (!description) return '';
    const words = description.split(' ');
    return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
}

export {
    renderTransactionTable,
    renderTransactionDetails,
    setupForm,
    updateTotalAmount
};