// ===== Main JS =====
document.addEventListener('DOMContentLoaded', () => {
    // ===== Global State =====
    window.state = {
        saldoVisible: true,
        transactions: JSON.parse(localStorage.getItem('transactions')) || [],
        anggota: JSON.parse(localStorage.getItem('anggota')) || ['Jeri', 'Budi', 'Sari'],
        editingIndex: null,
        currentPage: 1,
        rowsPerPage: 9,
        filteredTransactions: []
    };

    // ===== Utility Functions =====
    window.toRupiah = function(angka) {
        if (angka === null || angka === undefined || isNaN(Number(angka))) return 'Rp 0';
        return 'Rp ' + Number(angka).toLocaleString('id-ID');
    };

    window.animateValue = function(element, endValue, duration = 500) {
        const target = Math.max(0, Number(endValue) || 0);
        const startValue = parseFloat((element.textContent.replace(/[^\d.-]/g, '') || 0));
        const steps = 30;
        const delta = target - startValue;
        if (delta === 0) { element.textContent = window.toRupiah(target); return; }
        let step = 0;
        const interval = Math.max(16, Math.floor(duration / steps));
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const valueNow = Math.round(startValue + delta * progress);
            element.textContent = window.toRupiah(valueNow);
            if (step >= steps) clearInterval(timer);
        }, interval);
    };

    // ===== Summary Update =====
    window.updateSummary = function(animated = false) {
        const totalP = window.state.transactions.filter(t => t.type === 'Pemasukan').reduce((s, t) => s + Number(t.amount || 0), 0);
        const totalPeng = window.state.transactions.filter(t => t.type === 'Pengeluaran').reduce((s, t) => s + Number(t.amount || 0), 0);
        const saldo = totalP - totalPeng;

        const cardSaldo = document.getElementById('card-saldo');
        const cardPemasukan = document.getElementById('card-pemasukan');
        const cardPengeluaran = document.getElementById('card-pengeluaran');

        if (animated) {
            window.animateValue(cardSaldo, saldo);
            window.animateValue(cardPemasukan, totalP);
            window.animateValue(cardPengeluaran, totalPeng);
        } else {
            cardSaldo.textContent = window.state.saldoVisible ? window.toRupiah(saldo) : 'Rp ****';
            cardPemasukan.textContent = window.state.saldoVisible ? window.toRupiah(totalP) : 'Rp ****';
            cardPengeluaran.textContent = window.state.saldoVisible ? window.toRupiah(totalPeng) : 'Rp ****';
        }
    };

    window.toggleSummaryVisibility = function() {
        window.state.saldoVisible = !window.state.saldoVisible;
        window.updateSummary(false);
    };

    // ===== Save Transactions =====
    window.saveTransactions = function() {
        localStorage.setItem('transactions', JSON.stringify(window.state.transactions));
    };

    // ===== Set Today Date =====
    window.setTodayDate = function() {
        const transactionDate = document.getElementById('transactionDate');
        if (!transactionDate) return;
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        transactionDate.value = `${yyyy}-${mm}-${dd}`;
    };

    // ===== Expose Functions Globally =====
    window.renderTable = window.renderTable || null;
    window.renderFilterOptions = window.renderFilterOptions || null;
    window.renderDropdown = window.renderDropdown || null;
    window.attachCheckboxes = window.attachCheckboxes || null;
});
