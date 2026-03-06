const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const historyList = document.getElementById('history-list');

const totalRevenusEl = document.getElementById('total-revenus');
const totalDepensesEl = document.getElementById('total-depenses');
const soldeEl = document.getElementById('solde');

let transactions = [];

function updateSummary() {
    const totalRevenus = transactions
        .filter(t => t.type === 'revenu')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalDepenses = transactions
        .filter(t => t.type === 'depense')
        .reduce((acc, t) => acc + t.amount, 0);

    const solde = totalRevenus - totalDepenses;

    totalRevenusEl.textContent = `${totalRevenus.toFixed(2)} €`;
    totalDepensesEl.textContent = `${totalDepenses.toFixed(2)} €`;
    soldeEl.textContent = `${solde.toFixed(2)} €`;

    if (solde > 0) {
        soldeEl.style.color = '#2ecc71';
    } else if (solde < 0) {
        soldeEl.style.color = '#e74c3c';
    } else {
        soldeEl.style.color = '#2c3e50';
    }
}

function addTransactionToDOM(transaction) {
    const li = document.createElement('li');
    li.classList.add('transaction-item', transaction.type);

    li.innerHTML = `
        <div class="info">
            <strong>${transaction.description}</strong>
            <span>${transaction.category}</span>
        </div>
        <div class="amount">
            ${transaction.type === 'revenu' ? '+' : '-'} ${transaction.amount.toFixed(2)} €
        </div>
    `;

    historyList.prepend(li);
}

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (descriptionInput.value.trim() === '' || amountInput.value === '') return;

    const transaction = {
        id: Date.now(),
        description: descriptionInput.value.trim(),
        amount: Math.abs(parseFloat(amountInput.value)),
        type: typeInput.value,
        category: categoryInput.value
    };

    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateSummary();

    transactionForm.reset();
    descriptionInput.focus();
});