// Sélection des éléments
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');

// Gestion de l'ajout
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Création de l'objet transaction
    const newTransaction = {
        id: Date.now(),
        description: descriptionInput.value.trim(),
        amount: parseFloat(amountInput.value),
        type: typeInput.value,
        category: categoryInput.value,
        date: new Date().toLocaleDateString()
    };

    // Log pour vérification (en attendant la branche Historique/Calculs)
    console.log("Nouvelle transaction ajoutée :", newTransaction);

    // Réinitialisation du formulaire
    transactionForm.reset();
    descriptionInput.focus();
});