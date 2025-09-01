// ===== Summary Cards =====
document.addEventListener('DOMContentLoaded', () => {
    const toggleSummaryBtn = document.getElementById('toggleSummary');
    const cardSaldo = document.getElementById('card-saldo');
    const cardPemasukan = document.getElementById('card-pemasukan');
    const cardPengeluaran = document.getElementById('card-pengeluaran');

    function updateSummaryCards(animated = false) {
        if (!window.state) return;

        const totalP = window.state.transactions.filter(t => t.type === 'Pemasukan').reduce((s, t) => s + Number(t.amount || 0), 0);
        const totalPeng = window.state.transactions.filter(t => t.type === 'Pengeluaran').reduce((s, t) => s + Number(t.amount || 0), 0);
        const saldo = totalP - totalPeng;

        if (animated) {
            if (window.animateValue) {
                window.animateValue(cardSaldo, saldo);
                window.animateValue(cardPemasukan, totalP);
                window.animateValue(cardPengeluaran, totalPeng);
            }
        } else {
            cardSaldo.textContent = window.state.saldoVisible ? window.toRupiah(saldo) : 'Rp ****';
            cardPemasukan.textContent = window.state.saldoVisible ? window.toRupiah(totalP) : 'Rp ****';
            cardPengeluaran.textContent = window.state.saldoVisible ? window.toRupiah(totalPeng) : 'Rp ****';
        }
    }

    function toggleSummaryVisibility() {
        if (!window.state) return;
        window.state.saldoVisible = !window.state.saldoVisible;
        updateSummaryCards(false);
    }

    if (toggleSummaryBtn) toggleSummaryBtn.addEventListener('click', toggleSummaryVisibility);

    // Expose function globally for table updates
    window.updateSummaryCards = updateSummaryCards;
});
