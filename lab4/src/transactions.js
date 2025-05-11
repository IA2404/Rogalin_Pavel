import { renderTransactionTable, updateTotalAmount } from './ui.js';
import { generateId, formatDate } from './utils.js';

let transactions = [];

function addTransaction(amount, category, description) {
    // Преобразуем amount в число с двумя знаками после запятой
    const amountNumber = parseFloat(amount).toFixed(2);

    const transaction = {
        id: generateId(),
        date: new Date(),
        amount: parseFloat(amountNumber), // Двойное преобразование для надежности
        category,
        description
    };

    transactions.push(transaction);
    renderTransactionTable(transactions);
    calculateTotal();
    return transaction;
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    renderTransactionTable(transactions);
    calculateTotal();
}

function calculateTotal() {
    const total = transactions.reduce((sum, t) => {
        // Гарантируем, что amount - число
        const amount = typeof t.amount === 'number' ? t.amount : parseFloat(t.amount);
        return sum + amount;
    }, 0);

    updateTotalAmount(total);
    return total;
}

export { addTransaction, deleteTransaction, calculateTotal, transactions };