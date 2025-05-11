import {calculateTotal, deleteTransaction} from './transactions.js';
import { renderTransactionTable, renderTransactionDetails, setupForm } from './ui.js';
import { transactions } from './transactions.js';

function updateTotalAmount(total) {
    const totalElement = document.getElementById('total-amount');
    totalElement.textContent = total.toFixed(2);
    totalElement.classList.add('changed');
    setTimeout(() => totalElement.classList.remove('changed'), 700);

    if (total >= 0) {
        totalElement.style.color = '#2ecc71';
    } else {
        totalElement.style.color = '#e74c3c';
    }
}

function init() {
    setupForm();
    renderTransactionTable(transactions);
    calculateTotal();

    // Обработчик кликов по таблице
    const table = document.getElementById('transactions-table');
    if (table) {
        table.addEventListener('click', (e) => {
            // Обработка удаления
            if (e.target.classList.contains('delete-btn')) {
                const id = e.target.dataset.id;
                if (id) {
                    deleteTransaction(id);
                }
                return;
            }

            // Обработка показа деталей
            const row = e.target.closest('tr');
            if (row && row.dataset.id) {
                const transaction = transactions.find(t => t.id === row.dataset.id);
                if (transaction) {
                    renderTransactionDetails(transaction);
                }
            }
        });
    }
}

init();