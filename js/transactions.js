// ===== Transactions Table =====
document.addEventListener('DOMContentLoaded', () => {
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');
    const historyEditTableBody = document.getElementById('historyEditTable');

    function renderTable() {
        if (!transactionsTableBody || !window.state) return;

        transactionsTableBody.innerHTML = '';
        const list = window.state.filteredTransactions.length ? window.state.filteredTransactions : window.state.transactions;
        const startIdx = (window.state.currentPage - 1) * window.state.rowsPerPage;
        const pageItems = list.slice(startIdx, startIdx + window.state.rowsPerPage);

        pageItems.forEach((t, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox" data-index="${i + startIdx}"></td>
                <td>${i + 1 + startIdx}</td>
                <td>${t.date}</td>
                <td>${t.anggota}</td>
                <td>${t.type}</td>
                <td>${t.sumberDana || ''}</td>
                <td>${t.note || ''}</td>
                <td>${t.deskripsi || ''}</td>
                <td>${window.toRupiah(t.amount)}</td>
                <td>
                    <button data-index="${i + startIdx}" class="editBtn">Edit</button>
                    <button data-index="${i + startIdx}" class="historyBtn">Riwayat</button>
                </td>
            `;
            transactionsTableBody.appendChild(tr);
        });

        if (window.updateSummaryCards) window.updateSummaryCards(true);
        if (window.renderPagination) window.renderPagination(list);
        if (window.attachCheckboxes) window.attachCheckboxes();
        attachEditButtons();
        attachHistoryButtons();
    }

    function attachEditButtons() {
        document.querySelectorAll('.editBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.dataset.index);
                const t = window.state.transactions[idx];
                const transactionForm = document.getElementById('transactionForm');
                if (!transactionForm) return;

                document.getElementById('transactionDate').value = t.date;
                document.getElementById('transactionAnggotaInput').value = t.anggota;
                document.getElementById('amount').value = t.amount;
                document.getElementById('type').value = t.type;
                document.getElementById('sumberDana').value = t.sumberDana;
                document.getElementById('note').value = t.note;
                document.getElementById('deskripsi').value = t.deskripsi;

                const formModal = document.getElementById('formModal');
                if (formModal) formModal.style.display = 'flex';
                window.state.editingIndex = idx;
            });
        });
    }

    function attachHistoryButtons() {
        document.querySelectorAll('.historyBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.dataset.index);
                const t = window.state.transactions[idx];
                if (!historyEditTableBody) return;

                historyEditTableBody.innerHTML = '';
                for (const key in t) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${key}</td><td>${t[key]}</td>`;
                    historyEditTableBody.appendChild(tr);
                }

                const historyEditModal = document.getElementById('historyEditModal');
                if (historyEditModal) historyEditModal.style.display = 'flex';
            });
        });
    }

    // Expose globally
    window.renderTable = renderTable;
});
