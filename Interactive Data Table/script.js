document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { name: 'Gowtham', age: 20, country: 'IND' },
        { name: 'Bala Teja', age: 21, country: 'UK' },
        { name: 'Vamsi', age: 19, country: 'Canada' },
        { name: 'Bhavana', age: 20, country: 'IND' },
        { name: 'Sravani', age: 11, country: 'China' },
        { name: 'Mahendra', age: 12, country: 'Japan' },
        { name: 'Ashruth', age: 27, country: 'IND' },
        { name: 'Aditya', age: 25, country: 'Spain' },
        { name: 'Manohar', age: 13, country: 'USA' },
        { name: 'Ram', age: 26, country: 'SAE' },
        { name: 'Charan', age: 20, country: 'UAE' },
        { name: 'Kiran', age: 10, country: 'USA' },
        { name: 'Satya', age: 20, country: 'UAE' },
        { name: 'vikram', age: 41, country: 'USA' },
        { name: 'tarun', age: 59, country: 'Canada' },
        { name: 'krishna', age: 20, country: 'IND' },
        { name: 'Praveen', age: 29, country: 'Japan' },
        { name: 'Mani', age: 19, country: 'Spain' },
    ];

    let currentPage = 1;
    const rowsPerPage = 5;
    let filteredData = data;

    function renderTable(data, page = 1) {
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';

        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        document.getElementById('pageInfo').textContent = `Page ${page} of ${Math.ceil(data.length / rowsPerPage)}`;
    }

    function sortTable(column, order) {
        filteredData.sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];
            return order === 'asc' ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
        });
        renderTable(filteredData, currentPage);
    }

    function filterTable() {
        const filterInput = document.getElementById('filterInput').value.toLowerCase();
        filteredData = data.filter(row => {
            return Object.values(row).some(value => value.toString().toLowerCase().includes(filterInput));
        });
        currentPage = 1;
        renderTable(filteredData, currentPage);
    }

    document.getElementById('filterInput').addEventListener('input', filterTable);

    document.querySelectorAll('#dataTable th').forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const order = this.getAttribute('data-order');
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            this.setAttribute('data-order', newOrder);
            sortTable(column, newOrder);
        });
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(filteredData, currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
            currentPage++;
            renderTable(filteredData, currentPage);
        }
    });

    // Initial render
    renderTable(data, currentPage);
});
