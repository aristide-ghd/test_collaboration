// 1. Sélections du DOM
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const historyList = document.getElementById('history-list');

// Éléments de résumé
const totalRevenusEl = document.getElementById('total-revenus');
const totalDepensesEl = document.getElementById('total-depenses');

// 2. État de l'application (Source de vérité)
let transactions = [];

// 3. Fonctions de logique
function updateSummary() {
    // Calcul strict des revenus uniquement
    const totalRevenus = transactions
        .filter(t => t.type === 'revenu')
        .reduce((acc, t) => acc + t.amount, 0);

    // Calcul strict des dépenses uniquement
    const totalDepenses = transactions
        .filter(t => t.type === 'depense')
        .reduce((acc, t) => acc + t.amount, 0);

    // Mise à jour de l'affichage (double vérification de la synchronisation)
    totalRevenusEl.textContent = `${totalRevenus.toFixed(2)} €`;
    totalDepensesEl.textContent = `${totalDepenses.toFixed(2)} €`;
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

// 4. Écouteur d'événement
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation simple
    if (descriptionInput.value.trim() === '' || amountInput.value === '') return;

    const transaction = {
        id: Date.now(),
        description: descriptionInput.value.trim(),
        amount: Math.abs(parseFloat(amountInput.value)), // On force une valeur positive
        type: typeInput.value,
        category: categoryInput.value
    };

    // Mise à jour synchrone
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateSummary();

    // Reset du formulaire
    transactionForm.reset();
    descriptionInput.focus();
});