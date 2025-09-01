// ===== Dropdown Anggota =====
document.addEventListener('DOMContentLoaded', () => {
    const transactionAnggotaInput = document.getElementById('transactionAnggotaInput');
    const parent = transactionAnggotaInput.parentElement;
    const anggotaDropdown = document.createElement('div');
    anggotaDropdown.id = 'anggotaDropdown';
    parent.appendChild(anggotaDropdown);

    function renderDropdown() {
        if (!window.state) return;
        anggotaDropdown.innerHTML = '';
        window.state.anggota.forEach(a => {
            const div = document.createElement('div');
            div.textContent = a;
            const span = document.createElement('span');
            span.textContent = '✖';
            span.addEventListener('click', e => {
                e.stopPropagation();
                window.state.anggota = window.state.anggota.filter(n => n !== a);
                localStorage.setItem('anggota', JSON.stringify(window.state.anggota));
                renderDropdown();
                if (window.renderFilterOptions) window.renderFilterOptions();
            });
            div.appendChild(span);
            div.addEventListener('click', () => { 
                transactionAnggotaInput.value = a; 
                anggotaDropdown.classList.remove('show'); 
            });
            anggotaDropdown.appendChild(div);
        });

        const addNew = document.createElement('div');
        addNew.textContent = '+ Tambah Anggota Baru';
        addNew.style.textAlign = 'center';
        addNew.style.background = '#eee';
        addNew.addEventListener('click', () => {
            const name = prompt('Masukkan nama anggota baru:');
            if (name && !window.state.anggota.includes(name.trim())) {
                window.state.anggota.push(name.trim());
                localStorage.setItem('anggota', JSON.stringify(window.state.anggota));
                renderDropdown();
                if (window.renderFilterOptions) window.renderFilterOptions();
            } else {
                alert('Nama kosong atau sudah ada!');
            }
        });
        anggotaDropdown.appendChild(addNew);
    }

    transactionAnggotaInput.addEventListener('focus', () => {
        anggotaDropdown.classList.add('show');
        const rect = transactionAnggotaInput.getBoundingClientRect();
        anggotaDropdown.style.top = transactionAnggotaInput.offsetTop + transactionAnggotaInput.offsetHeight + 'px';
        anggotaDropdown.style.left = transactionAnggotaInput.offsetLeft + 'px';
        anggotaDropdown.style.width = transactionAnggotaInput.offsetWidth + 'px';
    });

    document.addEventListener('click', e => { 
        if (!transactionAnggotaInput.contains(e.target) && !anggotaDropdown.contains(e.target)) {
            anggotaDropdown.classList.remove('show');
        }
    });

    renderDropdown();

    // Expose renderDropdown for other scripts
    window.renderDropdown = renderDropdown;
});
