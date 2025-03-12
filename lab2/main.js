const transactions = [
    {
        transaction_id: 1,
        transaction_date: "2025-10-01",
        transaction_amount: 100.50,
        transaction_type: "debit",
        transaction_description: "Покупка в магазине",
        merchant_name: "Kaufland",
        card_type: "debit"
    },
    {
        transaction_id: 2,
        transaction_date: "2025-10-02",
        transaction_amount: 200.75,
        transaction_type: "credit",
        transaction_description: "Оплата услуг",
        merchant_name: "StarNet",
        card_type: "credit"
    },
    {
        transaction_id: 3,
        transaction_date: "2025-10-03",
        transaction_amount: 150.00,
        transaction_type: "debit",
        transaction_description: "Покупка в магазине",
        merchant_name: "Puma",
        card_type: "debit"
    },
    {
        transaction_id: 4,
        transaction_date: "2025-09-01",
        transaction_amount: 300.00,
        transaction_type: "credit",
        transaction_description: "Оплата услуг",
        merchant_name: "Moldcell",
        card_type: "credit"
    },
    {
        transaction_id: 5,
        transaction_date: "2025-09-15",
        transaction_amount: 50.00,
        transaction_type: "debit",
        transaction_description: "Покупка в магазине",
        merchant_name: "N1",
        card_type: "debit"
    }
];

// 1. Возвращает массив уникальных типов транзакций
function getUniqueTransactionTypes(transactions) {
    const types = new Set(transactions.map(t => t.transaction_type));
    return Array.from(types);
}

// 2. Вычисляет сумму всех транзакций
function calculateTotalAmount(transactions, year, month, day) {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return (!year || date.getFullYear() === year) &&
            (!month || date.getMonth() + 1 === month) &&
            (!day || date.getDate() === day);
    }).reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 3. Возвращает транзакции указанного типа
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}

// 4. Возвращает транзакции в указанном диапазоне дат
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= start && date <= end;
    });
}

// 5. Возвращает транзакции по названию магазина
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}

// 6. Возвращает среднее значение транзакций
function calculateAverageTransactionAmount(transactions) {
    const total = transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
    return total / transactions.length;
}

// 7. Возвращает транзакции в заданном диапазоне сумм
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

// 8. Вычисляет общую сумму дебетовых транзакций
function calculateTotalDebitAmount(transactions) {
    return transactions.filter(t => t.transaction_type === "debit")
        .reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 9. Возвращает месяц с наибольшим количеством транзакций
function findMostTransactionsMonth(transactions) {
    const monthCounts = {};
    transactions.forEach(t => {
        const month = new Date(t.transaction_date).getMonth() + 1;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
}

// 10. Возвращает месяц с наибольшим количеством дебетовых транзакций
function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = transactions.filter(t => t.transaction_type === "debit");
    return findMostTransactionsMonth(debitTransactions);
}

// 11. Возвращает тип транзакций, которых больше всего
function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(t => t.transaction_type === "debit").length;
    const creditCount = transactions.filter(t => t.transaction_type === "credit").length;
    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
}

// 12. Возвращает транзакции до указанной даты
function getTransactionsBeforeDate(transactions, date) {
    const endDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < endDate);
}

// 13. Возвращает транзакцию по ID
function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}

// 14. Возвращает массив описаний транзакций
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций за октябрь 2025:", calculateTotalAmount(transactions, 2025, 10));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции за период с 2025-09-01 по 2025-10-01:", getTransactionsInDateRange(transactions, "2025-09-01", "2025-10-01"));
console.log("Транзакции в магазине 'Kaufland':", getTransactionsByMerchant(transactions, "Kaufland"));
console.log("Средняя сумма транзакций:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции в диапазоне сумм от 100 до 200:", getTransactionsByAmountRange(transactions, 100, 200));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("Каких транзакций больше всего:", mostTransactionTypes(transactions));
console.log("Транзакции до 2025-10-02:", getTransactionsBeforeDate(transactions, "2025-10-02"));
console.log("Транзакция с ID 3:", findTransactionById(transactions, 3));
console.log("Описания транзакций:", mapTransactionDescriptions(transactions));