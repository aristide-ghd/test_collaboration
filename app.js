// 1. Sélections du DOM
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const historyList = document.getElementById('history-list');
const totalRevenusEl = document.getElementById('total-revenus');

// 2. État de l'application
let transactions = [];

// 3. Fonctions de logique
function updateRevenus() {
    const total = transactions
        .filter(t => t.type === 'revenu')
        .reduce((sum, t) => sum + t.amount, 0);

    totalRevenusEl.textContent = `${total.toFixed(2)} €`;
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

// 4. Écouteurs d'événements
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        description: descriptionInput.value.trim(),
        amount: parseFloat(amountInput.value),
        type: typeInput.value,
        category: categoryInput.value
    };

    // Mise à jour de l'état et de l'interface
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateRevenus();

    // Reset du formulaire
    transactionForm.reset();
    descriptionInput.focus();
});