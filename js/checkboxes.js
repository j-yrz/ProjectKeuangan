// ===== Checkboxes & Delete Selected =====
document.addEventListener('DOMContentLoaded', () => {
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');
    const deleteSelectedBtn = document.getElementById('deleteSelected');
    const checkAll = document.getElementById('checkAll');

    function updateDeleteButton() {
        const checked = transactionsTableBody.querySelectorAll('input[type="checkbox"]:checked');
        deleteSelectedBtn.style.display = checked.length ? 'block' : 'none';
    }

    function attachCheckboxes() {
        const checkboxes = transactionsTableBody.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.addEventListener('change', updateDeleteButton));
    }

    deleteSelectedBtn.addEventListener('click', () => {
        const checked = transactionsTableBody.querySelectorAll('input[type="checkbox"]:checked');
        checked.forEach(cb => {
            const idx = Number(cb.dataset.index);
            if (!isNaN(idx) && window.state) {
                window.state.transactions.splice(idx, 1);
            }
        });
        localStorage.setItem('transactions', JSON.stringify(window.state.transactions));
        if (window.renderTable) window.renderTable();
    });

    if (checkAll) {
        checkAll.addEventListener('change', () => {
            const checkboxes = transactionsTableBody.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = checkAll.checked);
            updateDeleteButton();
        });
    }

    // Expose attachCheckboxes for main table rendering
    window.attachCheckboxes = attachCheckboxes;
});
