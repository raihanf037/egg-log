// Dummy data for demo purposes
window.dummyData = {
  egg: [
    { tanggal: '2026-01-01', jumlah: 30 },
    { tanggal: '2026-01-02', jumlah: 28 },
    { tanggal: '2026-01-03', jumlah: 32 },
    { tanggal: '2026-01-04', jumlah: 29 },
  ],
  feed: [
    { tanggal: '2026-01-01', jumlah_kg: 5 },
    { tanggal: '2026-01-02', jumlah_kg: 4.8 },
    { tanggal: '2026-01-03', jumlah_kg: 5.2 },
    { tanggal: '2026-01-04', jumlah_kg: 5 },
  ],
  finance: [
    { tanggal: '2026-01-01', tipe: 'pemasukan', jumlah: 150000, deskripsi: 'Penjualan telur' },
    { tanggal: '2026-01-02', tipe: 'pengeluaran', jumlah: 50000, deskripsi: 'Pakan' },
    { tanggal: '2026-01-03', tipe: 'pemasukan', jumlah: 160000, deskripsi: 'Penjualan telur' },
    { tanggal: '2026-01-04', tipe: 'pengeluaran', jumlah: 52000, deskripsi: 'Listrik' },
  ]
};

// Utility to format numbers as currency (Rupiah)
function fmtRupiah(num) {
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ;
}

// Render Egg table
function renderEggTable() {
  const tbody = document.querySelector('#egg-table tbody');
  tbody.innerHTML = '';
  dummyData.egg.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="border px-2 py-1">${row.tanggal}</td><td class="border px-2 py-1 text-center">${row.jumlah}</td>`;
    tbody.appendChild(tr);
  });
}

// Render Feed table
function renderFeedTable() {
  const tbody = document.querySelector('#feed-table tbody');
  tbody.innerHTML = '';
  dummyData.feed.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="border px-2 py-1">${row.tanggal}</td><td class="border px-2 py-1 text-center">${row.jumlah_kg} kg</td>`;
    tbody.appendChild(tr);
  });
}

// Render Finance table
function renderFinanceTable() {
  const tbody = document.querySelector('#finance-table tbody');
  tbody.innerHTML = '';
  dummyData.finance.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="border px-2 py-1">${row.tanggal}</td><td class="border px-2 py-1">${row.tipe}</td><td class="border px-2 py-1 text-right">${row.jumlah}</td><td class="border px-2 py-1">${row.deskripsi}</td>`;
    tbody.appendChild(tr);
  });
}

// Chart for egg production
function initEggChart() {
  const ctx = document.getElementById('eggChart').getContext('2d');
  const labels = dummyData.egg.map(d => d.tanggal);
  const data = dummyData.egg.map(d => d.jumlah);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Telur per Hari',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// Chart for finance (income vs expense)
function initFinanceChart() {
  const ctx = document.getElementById('financeChart').getContext('2d');
  const labels = dummyData.finance.map(d => d.tanggal);
  const income = dummyData.finance.map(d => d.tipe === 'pemasukan' ? d.jumlah : 0);
  const expense = dummyData.finance.map(d => d.tipe === 'pengeluaran' ? d.jumlah : 0);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Pemasukan', data: income, backgroundColor: 'rgba(34, 197, 94, 0.6)' },
        { label: 'Pengeluaran', data: expense, backgroundColor: 'rgba(239, 68, 68, 0.6)' },
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// Form handlers (add new entries)
function addEggEntry(e) {
  e.preventDefault();
  const tanggal = e.target.tanggal.value;
  const jumlah = parseInt(e.target.jumlah.value, 10);
  dummyData.egg.push({ tanggal, jumlah });
  renderEggTable();
  // update chart data
  initEggChart();
  e.target.reset();
}
function addFeedEntry(e) {
  e.preventDefault();
  const tanggal = e.target.tanggal.value;
  const jumlah_kg = parseFloat(e.target.jumlah_kg.value);
  dummyData.feed.push({ tanggal, jumlah_kg });
  renderFeedTable();
  e.target.reset();
}
function addFinanceEntry(e) {
  e.preventDefault();
  const tanggal = e.target.tanggal.value;
  const tipe = e.target.tipe.value;
  const jumlah = parseInt(e.target.jumlah.value, 10);
  const deskripsi = e.target.deskripsi.value;
  dummyData.finance.push({ tanggal, tipe, jumlah, deskripsi });
  renderFinanceTable();
  // Update balance display
  const income = dummyData.finance.filter(t => t.tipe === 'pemasukan').reduce((a, b) => a + b.jumlah, 0);
  const expense = dummyData.finance.filter(t => t.tipe === 'pengeluaran').reduce((a, b) => a + b.jumlah, 0);
  document.getElementById('balance').textContent = fmtRupiah(income - expense);
  // Update finance chart if present
  if (document.getElementById('financeChart')) initFinanceChart();
  e.target.reset();
}

// Initialize page-specific content after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('egg-table')) renderEggTable();
  if (document.getElementById('feed-table')) renderFeedTable();
  if (document.getElementById('finance-table')) renderFinanceTable();
  if (document.getElementById('eggChart')) initEggChart();
  if (document.getElementById('financeChart')) initFinanceChart();

  // Attach form listeners if forms exist
  const eggForm = document.getElementById('egg-form');
  if (eggForm) eggForm.addEventListener('submit', addEggEntry);
  const feedForm = document.getElementById('feed-form');
  if (feedForm) feedForm.addEventListener('submit', addFeedEntry);
  const financeForm = document.getElementById('finance-form');
  if (financeForm) financeForm.addEventListener('submit', addFinanceEntry);
});
