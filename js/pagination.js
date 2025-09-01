// ===== Pagination =====
document.addEventListener('DOMContentLoaded', () => {
    const paginationContainer = document.getElementById('pagination');

    function renderPagination(list) {
        if (!paginationContainer || !window.state) return;
        const totalPages = Math.ceil(list.length / window.state.rowsPerPage);
        paginationContainer.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Prev';
        prevBtn.disabled = window.state.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (window.state.currentPage > 1) {
                window.state.currentPage--;
                if (window.renderTable) window.renderTable();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = window.state.currentPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (window.state.currentPage < totalPages) {
                window.state.currentPage++;
                if (window.renderTable) window.renderTable();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Expose renderPagination globally
    window.renderPagination = renderPagination;
});
