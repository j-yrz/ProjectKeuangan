// ===== Filter Transaksi =====
document.addEventListener('DOMContentLoaded', () => {
    const searchNoteInput = document.getElementById('searchNote');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const filterAnggota = document.getElementById('filterAnggota');
    const filterType = document.getElementById('filterType');
    const applyFilterBtn = document.getElementById('applyFilter');
    const resetFilterBtn = document.getElementById('resetFilter');

    function applyFilter() {
        if (!window.state) return;
        const search = searchNoteInput.value.toLowerCase();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const anggotaFilter = filterAnggota.value;
        const typeFilter = filterType.value;

        window.state.filteredTransactions = window.state.transactions.filter(t => {
            let matches = true;
            if (search && !t.note.toLowerCase().includes(search)) matches = false;
            if (startDate && t.date < startDate) matches = false;
            if (endDate && t.date > endDate) matches = false;
            if (anggotaFilter && t.anggota !== anggotaFilter) matches = false;
            if (typeFilter && t.type !== typeFilter) matches = false;
            return matches;
        });

        window.state.currentPage = 1;
        if (window.renderTable) window.renderTable();
    }

    function resetFilter() {
        searchNoteInput.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        filterAnggota.value = '';
        filterType.value = '';
        if (!window.state) return;
        window.state.filteredTransactions = [];
        window.state.currentPage = 1;
        if (window.renderTable) window.renderTable();
    }

    applyFilterBtn.addEventListener('click', applyFilter);
    resetFilterBtn.addEventListener('click', resetFilter);

    // Expose functions for external calls if needed
    window.applyFilter = applyFilter;
    window.resetFilter = resetFilter;
});
