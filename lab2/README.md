1. Создание массива транзакций
   javascript
   Copy

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
// Добавьте другие транзакции...
];

2. Функции для анализа транзакций

   Уникальные типы транзакций

javascript
Copy

function getUniqueTransactionTypes(transactions) {
return [...new Set(transactions.map(t => t.transaction_type))];
}

    Общая сумма транзакций (с фильтрацией по дате)

javascript
Copy

function calculateTotalAmount(transactions, year, month, day) {
return transactions.filter(t => {
const date = new Date(t.transaction_date);
return (!year || date.getFullYear() === year) &&
(!month || date.getMonth() + 1 === month) &&
(!day || date.getDate() === day);
}).reduce((sum, t) => sum + t.transaction_amount, 0);
}

    Транзакции по типу (debit/credit)

javascript
Copy

function getTransactionByType(transactions, type) {
return transactions.filter(t => t.transaction_type === type);
}

    Транзакции в диапазоне дат

javascript
Copy

function getTransactionsInDateRange(transactions, startDate, endDate) {
const start = new Date(startDate);
const end = new Date(endDate);
return transactions.filter(t => {
const date = new Date(t.transaction_date);
return date >= start && date <= end;
});
}

    Транзакции по магазину

javascript
Copy

function getTransactionsByMerchant(transactions, merchantName) {
return transactions.filter(t => t.merchant_name === merchantName);
}

    Средняя сумма транзакций

javascript
Copy

function calculateAverageTransactionAmount(transactions) {
const total = transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
return total / transactions.length;
}

    Транзакции в диапазоне сумм

javascript
Copy

function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

    Общая сумма дебетовых транзакций

javascript
Copy

function calculateTotalDebitAmount(transactions) {
return transactions.filter(t => t.transaction_type === "debit")
.reduce((sum, t) => sum + t.transaction_amount, 0);
}

    Месяц с наибольшим количеством транзакций

javascript
Copy

function findMostTransactionsMonth(transactions) {
const monthCounts = {};
transactions.forEach(t => {
const month = new Date(t.transaction_date).getMonth() + 1;
monthCounts[month] = (monthCounts[month] || 0) + 1;
});
return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
}

    Месяц с наибольшим количеством дебетовых транзакций

javascript
Copy

function findMostDebitTransactionMonth(transactions) {
const debitTransactions = transactions.filter(t => t.transaction_type === "debit");
return findMostTransactionsMonth(debitTransactions);
}

    Каких транзакций больше (debit/credit/equal)

javascript
Copy

function mostTransactionTypes(transactions) {
const debitCount = transactions.filter(t => t.transaction_type === "debit").length;
const creditCount = transactions.filter(t => t.transaction_type === "credit").length;
if (debitCount > creditCount) return "debit";
if (creditCount > debitCount) return "credit";
return "equal";
}

    Транзакции до указанной даты

javascript
Copy

function getTransactionsBeforeDate(transactions, date) {
const endDate = new Date(date);
return transactions.filter(t => new Date(t.transaction_date) < endDate);
}

    Транзакция по ID

javascript
Copy

function findTransactionById(transactions, id) {
return transactions.find(t => t.transaction_id === id);
}

    Описания транзакций

javascript
Copy

function mapTransactionDescriptions(transactions) {
return transactions.map(t => t.transaction_description);
}

3. Тестирование функций
   javascript
   Copy

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

Итог:

    Массив транзакций создается с полями: transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type.

    Функции позволяют анализировать транзакции: фильтровать, суммировать, находить среднее, искать по дате, типу, магазину и т.д.

    Тестирование проводится через вывод результатов в консоль.