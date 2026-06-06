---
title: 'Analisis Benchmark: Base64 vs URL Eksternal'
description: 'Studi komparasi performa, token, dan biaya antara Base64 dengan URL eksternal menggunakan model gemini-3.1-flash-lite pada dokumen 13 halaman.'
pubDate: 'May 23 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

>Dokumen: [MuSE Promoter](https://www.sciencedirect.com/science/article/pii/S3117702626000022) — 13 Halaman | Model: `gemini-3.1-flash-lite`

---

## Hipotesis Awal

Sebelum benchmark dijalankan, ada beberapa asumsi awal yang digunakan sebagai dasar pengujian. Asumsi-asumsi tersebut didasarkan pada pemahaman umum saya tentang cara kerja encoding Base64 dan mekanisme pengiriman gambar ke API.

| # | Dimensi | Hipotesis |
|---|---------|-----------|
| 1 | **Payload size** | Base64 akan menghasilkan payload yang jauh lebih besar dibanding URL eksternal, karena encoding Base64 secara matematis memperbesar data sebesar ~33% dari ukuran biner aslinya. |
| 2 | **Prompt Tokens** | Payload yang lebih besar akan menghasilkan prompt token yang lebih banyak, sehingga Base64 akan lebih "mahal" dalam hitungan token. |
| 3 | **Total Duration** | Base64 akan lebih lambat karena harus mengirim payload yang jauh lebih besar melalui jaringan sebelum server mulai memproses. |
| 4 | **TTFT** | Base64 akan memiliki TTFT (Time to First Token) yang lebih tinggi karena server harus menunggu seluruh payload diterima sebelum bisa mulai menghasilkan output. |
| 5 | **Throughput** | Base64 akan menghasilkan TPS (token per detik) yang lebih rendah akibat beban jaringan yang lebih tinggi. |
| 6 | **Biaya** | Base64 akan lebih mahal karena token yang lebih banyak akan meningkatkan biaya API secara proporsional. |

Hasil aktual dari setiap hipotesis ini dapat dilihat di bagian [Ringkasan Temuan](#3-ringkasan-temuan).

---

## 1. Data Mentah

#### Mode Paralel

<div class="table-wrapper">
  <table class="benchmark-table" style="min-width: 1100px;">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Total Duration (s)</th>
        <th class="num">Avg TTFT (s)</th>
        <th class="num">TPS</th>
        <th class="num">CPS</th>
        <th class="num">Avg Upload (s)</th>
        <th class="num">Prompt Tokens</th>
        <th class="num">Completion Tokens</th>
        <th class="num">Avg Payload KB</th>
        <th class="num">Payload Efficiency</th>
        <th class="num">Est. Cost (USD)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>21.50</strong></td>
        <td class="num">2.95</td>
        <td class="num"><strong>859.6</strong></td>
        <td class="num"><strong>3,623.9</strong></td>
        <td class="num"><strong>0.05</strong></td>
        <td class="num">20,891</td>
        <td class="num">18,158</td>
        <td class="num">523.76</td>
        <td class="num">-33.3%</td>
        <td class="num"><strong>0.000000</strong></td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">28.39</td>
        <td class="num"><strong>2.05</strong></td>
        <td class="num">646.2</td>
        <td class="num">2,719.1</td>
        <td class="num">3.08</td>
        <td class="num">20,891</td>
        <td class="num">18,165</td>
        <td class="num"><strong>0.07</strong></td>
        <td class="num"><strong>100.0%</strong></td>
        <td class="num"><strong>0.000000</strong></td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">33.16</td>
        <td class="num">4.17</td>
        <td class="num">540.7</td>
        <td class="num">2,309.9</td>
        <td class="num">0.08</td>
        <td class="num">20,890</td>
        <td class="num">17,776</td>
        <td class="num">523.77</td>
        <td class="num">-33.3%</td>
        <td class="num">0.031886</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">24.33</td>
        <td class="num">2.66</td>
        <td class="num">754.4</td>
        <td class="num">3,187.6</td>
        <td class="num">1.37</td>
        <td class="num">20,892</td>
        <td class="num">18,118</td>
        <td class="num">0.39</td>
        <td class="num">99.9%</td>
        <td class="num">0.032400</td>
      </tr>
    </tbody>
  </table>
</div>

#### Mode Sequential

<div class="table-wrapper">
  <table class="benchmark-table" style="min-width: 1100px;">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Total Duration (s)</th>
        <th class="num">Avg TTFT (s)</th>
        <th class="num">TPS</th>
        <th class="num">CPS</th>
        <th class="num">Avg Upload (s)</th>
        <th class="num">Prompt Tokens</th>
        <th class="num">Completion Tokens</th>
        <th class="num">Avg Payload KB</th>
        <th class="num">Payload Efficiency</th>
        <th class="num">Est. Cost (USD)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>81.53</strong></td>
        <td class="num"><strong>2.42</strong></td>
        <td class="num"><strong>242.2</strong></td>
        <td class="num"><strong>1,020.4</strong></td>
        <td class="num"><strong>0.05</strong></td>
        <td class="num">20,891</td>
        <td class="num">18,441</td>
        <td class="num">523.77</td>
        <td class="num">-33.3%</td>
        <td class="num"><strong>0.000000</strong></td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">127.73</td>
        <td class="num">2.93</td>
        <td class="num">222.6</td>
        <td class="num">936.8</td>
        <td class="num">3.21</td>
        <td class="num">20,891</td>
        <td class="num">18,159</td>
        <td class="num"><strong>0.07</strong></td>
        <td class="num"><strong>100.0%</strong></td>
        <td class="num"><strong>0.000000</strong></td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">88.80</td>
        <td class="num">3.06</td>
        <td class="num">217.0</td>
        <td class="num">916.5</td>
        <td class="num">0.07</td>
        <td class="num">20,894</td>
        <td class="num">18,102</td>
        <td class="num">523.77</td>
        <td class="num">-33.3%</td>
        <td class="num">0.032377</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">128.13</td>
        <td class="num">2.74</td>
        <td class="num">189.3</td>
        <td class="num">797.2</td>
        <td class="num">1.62</td>
        <td class="num">20,886</td>
        <td class="num">18,172</td>
        <td class="num">0.39</td>
        <td class="num">99.9%</td>
        <td class="num">0.032480</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Visualisasi Data

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

<div class="charts-grid">

  <!-- Chart 1: Total Duration -->
  <div class="chart-card">
    <h4 class="chart-title">Total Duration (detik) — lebih rendah lebih baik</h4>
    <div class="chart-wrap">
      <canvas id="chartDuration"></canvas>
    </div>
  </div>

  <!-- Chart 2: TTFT -->
  <div class="chart-card">
    <h4 class="chart-title">Avg TTFT (detik) — lebih rendah lebih baik</h4>
    <div class="chart-wrap">
      <canvas id="chartTTFT"></canvas>
    </div>
  </div>

  <!-- Chart 3: Upload Time -->
  <div class="chart-card">
    <h4 class="chart-title">Avg Upload Time (detik) — lebih rendah lebih baik</h4>
    <div class="chart-wrap">
      <canvas id="chartUpload"></canvas>
    </div>
  </div>

  <!-- Chart 4: Throughput TPS -->
  <div class="chart-card">
    <h4 class="chart-title">Throughput TPS — lebih tinggi lebih baik</h4>
    <div class="chart-wrap">
      <canvas id="chartTPS"></canvas>
    </div>
  </div>

  <!-- Chart 5: Prompt Tokens -->
  <div class="chart-card">
    <h4 class="chart-title">Prompt Tokens — semua skenario</h4>
    <div class="chart-wrap">
      <canvas id="chartTokens"></canvas>
    </div>
  </div>

</div>

<style>
  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .chart-card:last-child {
    grid-column: 1 / -1;
  }
  .chart-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 1.25rem 1.5rem 1.5rem;
  }
  .chart-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary, #a0a8b8);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0 0 1rem 0;
  }
  .chart-wrap {
    position: relative;
    height: 260px;
  }
  @media (max-width: 640px) {
    .charts-grid { grid-template-columns: 1fr; }
    .chart-card:last-child { grid-column: 1; }
  }
</style>

<script>
(function () {
  const COLORS = {
    gBase64:  'rgba(99, 179, 237, 0.85)',
    gFiles:   'rgba(154, 117, 234, 0.85)',
    orBase64: 'rgba(72, 199, 142, 0.85)',
    orSupa:   'rgba(251, 191, 36, 0.85)',
  };
  const BORDER = {
    gBase64:  'rgba(99, 179, 237, 1)',
    gFiles:   'rgba(154, 117, 234, 1)',
    orBase64: 'rgba(72, 199, 142, 1)',
    orSupa:   'rgba(251, 191, 36, 1)',
  };
  const LABELS = [
    'Google\nBase64',
    'Google\nFiles API',
    'OpenRouter\nBase64',
    'OpenRouter\nSupabase',
  ];
  const BG    = Object.values(COLORS);
  const BORD  = Object.values(BORDER);

  const defaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15,20,35,0.92)',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid:  { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid:  { color: 'rgba(255,255,255,0.08)' },
        beginAtZero: true,
      },
    },
  };

  function makeBar(id, data, unit = '') {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: LABELS,
        datasets: [{
          data,
          backgroundColor: BG,
          borderColor: BORD,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        ...defaults,
        plugins: {
          ...defaults.plugins,
          tooltip: {
            ...defaults.plugins.tooltip,
            callbacks: {
              label: ctx => ` ${ctx.parsed.y}${unit}`,
            },
          },
        },
      },
    });
  }

  function makeGroupedBar(id, datasets, unit = '') {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: LABELS,
        datasets,
      },
      options: {
        ...defaults,
        plugins: {
          ...defaults.plugins,
          legend: {
            display: true,
            labels: { color: '#94a3b8', font: { size: 11 }, boxWidth: 12, padding: 10 },
          },
          tooltip: {
            ...defaults.plugins.tooltip,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}${unit}`,
            },
          },
        },
      },
    });
  }

  // Chart 1 — Total Duration (grouped Paralel vs Sequential)
  makeGroupedBar('chartDuration', [
    {
      label: 'Paralel (s)',
      data: [21.50, 28.39, 33.16, 24.33],
      backgroundColor: BG.map(c => c.replace('0.85', '0.9')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
    {
      label: 'Sequential (s)',
      data: [81.53, 127.73, 88.80, 128.13],
      backgroundColor: BG.map(c => c.replace('0.85', '0.4')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
      borderDash: [4, 4],
    },
  ], ' s');

  // Chart 2 — TTFT (grouped Paralel vs Sequential)
  makeGroupedBar('chartTTFT', [
    {
      label: 'Paralel (s)',
      data: [2.95, 2.05, 4.17, 2.66],
      backgroundColor: BG.map(c => c.replace('0.85', '0.9')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
    {
      label: 'Sequential (s)',
      data: [2.42, 2.93, 3.06, 2.74],
      backgroundColor: BG.map(c => c.replace('0.85', '0.4')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
  ], ' s');

  // Chart 3 — Upload Time (grouped Paralel vs Sequential)
  makeGroupedBar('chartUpload', [
    {
      label: 'Paralel (s)',
      data: [0.05, 3.08, 0.08, 1.37],
      backgroundColor: BG.map(c => c.replace('0.85', '0.9')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
    {
      label: 'Sequential (s)',
      data: [0.05, 3.21, 0.07, 1.62],
      backgroundColor: BG.map(c => c.replace('0.85', '0.4')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
  ], ' s');

  // Chart 4 — Throughput TPS (grouped)
  makeGroupedBar('chartTPS', [
    {
      label: 'Paralel (TPS)',
      data: [859.6, 646.2, 540.7, 754.4],
      backgroundColor: BG.map(c => c.replace('0.85', '0.9')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
    {
      label: 'Sequential (TPS)',
      data: [242.2, 222.6, 217.0, 189.3],
      backgroundColor: BG.map(c => c.replace('0.85', '0.4')),
      borderColor: BORD,
      borderWidth: 1.5,
      borderRadius: 6,
    },
  ], ' tok/s');

  // Chart 5 — Prompt Tokens (paralel cukup, identik dengan sequential)
  makeBar('chartTokens', [20891, 20891, 20890, 20892], ' tok');

})();
</script>

---

## 2. Analisis Per Dimensi
### 2.1 Payload Size

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Metode</th>
        <th class="num">Avg Payload KB</th>
        <th class="num">Avg Image KB</th>
        <th class="num">Rasio Beban Tambahan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Base64</td>
        <td class="num">523.76 KB</td>
        <td class="num">392.80 KB</td>
        <td class="num">+33.4%</td>
      </tr>
      <tr>
        <td>Files API / Supabase</td>
        <td class="num">0.07–0.39 KB</td>
        <td class="num">392.96 KB</td>
        <td class="num">~0%</td>
      </tr>
    </tbody>
  </table>
</div>

Hipotesis awal: Base64 akan menghasilkan payload yang jauh lebih besar dibanding URL eksternal.

>Base64 mengirimkan sekitar 524 KB per halaman karena data gambar dienkode langsung di dalam body request, sedangkan URL eksternal hanya mengirimkan string alamat sebesar 0.07–0.39 KB. Selisih sebesar 33.3% ini sesuai dengan sifat matematis encoding Base64.

---

### 2.2 Prompt Tokens

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Prompt Tokens</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Google — Base64 (Paralel)</td>
        <td class="num">20,891</td>
      </tr>
      <tr>
        <td>Google — Files API (Paralel)</td>
        <td class="num">20,891</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64 (Paralel)</td>
        <td class="num">20,890</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase (Paralel)</td>
        <td class="num">20,892</td>
      </tr>
    </tbody>
  </table>
</div>

Hipotesis awal: Payload yang lebih besar akan menghasilkan total token yang lebih banyak.

>Prompt token identik di semua metode, berkisar antara 20,890–20,894. Ini membuktikan bahwa gambar tidak dikonversi menjadi token teks oleh model, gambar diproses melalui sistem visual tersendiri. Jumlah token lebih dipengaruhi oleh resolusi dan kompleksitas gambar, bukan oleh besar kecilnya payload yang dikirim. Dengan kata lain, payload yang lebih besar tidak berarti token yang lebih banyak.

---

### 2.3 Total Duration

#### Mode Paralel

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Total Duration</th>
        <th>Urutan</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>21.50 s</strong></td>
        <td>Tercepat</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">24.33 s</td>
        <td>Kedua</td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">28.39 s</td>
        <td>Ketiga</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">33.16 s</td>
        <td>Terlambat</td>
      </tr>
    </tbody>
  </table>
</div>

Base64 via Google API justru menjadi yang paling cepat di mode paralel. Files API 32% lebih lambat, kemungkinan karena server Google perlu mengambil file dari storage eksternal terlebih dahulu sebelum dapat memprosesnya — proses ini menambah jeda jaringan yang tidak ada pada Base64.

#### Mode Sequential

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Total Duration</th>
        <th>Urutan</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>81.53 s</strong></td>
        <td>Tercepat</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">88.80 s</td>
        <td>Kedua</td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">127.73 s</td>
        <td>Ketiga</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">128.13 s</td>
        <td>Terlambat</td>
      </tr>
    </tbody>
  </table>
</div>

Pola yang sama terulang di mode Sequential: Base64 lebih cepat 36–57% dibandingkan URL eksternal.

---

### 2.4 TTFT (Time to First Token) — Hasil Campuran

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Avg TTFT (s)</th>
        <th>Mode</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Files API</strong></td>
        <td class="num"><strong>2.05</strong></td>
        <td>Paralel — Tercepat</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">2.66</td>
        <td>Paralel</td>
      </tr>
      <tr>
        <td>Google — Base64</td>
        <td class="num">2.95</td>
        <td>Paralel</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">4.17</td>
        <td>Paralel — Terlambat</td>
      </tr>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>2.42</strong></td>
        <td>Sequential — Tercepat</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">2.74</td>
        <td>Sequential</td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">2.93</td>
        <td>Sequential</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">3.06</td>
        <td>Sequential</td>
      </tr>
    </tbody>
  </table>
</div>

Untuk TTFT, Files API lebih unggul di mode paralel — model mulai menghasilkan output lebih cepat. Namun Total Duration Base64 tetap lebih pendek secara keseluruhan, yang menunjukkan bahwa throughput Base64 lebih tinggi setelah token pertama muncul.

---

### 2.5 Throughput (TPS & CPS)

#### Mode Paralel

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">TPS</th>
        <th class="num">CPS</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>859.6</strong></td>
        <td class="num"><strong>3,623.9</strong></td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">754.4</td>
        <td class="num">3,187.6</td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">646.2</td>
        <td class="num">2,719.1</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">540.7</td>
        <td class="num">2,309.9</td>
      </tr>
    </tbody>
  </table>
</div>

Base64 via Google unggul di throughput tertinggi, menghasilkan lebih banyak token dan karakter per detik dibanding semua skenario lainnya.

---

### 2.6 Upload Time (Client-side)

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Skenario</th>
        <th class="num">Avg Upload (s)</th>
        <th>Catatan</th>
      </tr>
    </thead>
    <tbody>
      <tr class="winner">
        <td><strong>Google — Base64</strong></td>
        <td class="num"><strong>0.05 s</strong></td>
        <td>Payload besar (~524 KB/hal) namun upload singkat</td>
      </tr>
      <tr>
        <td>OpenRouter — Base64</td>
        <td class="num">0.08 s</td>
        <td>Sedikit lebih lama</td>
      </tr>
      <tr>
        <td>OpenRouter — Supabase</td>
        <td class="num">1.37–1.62 s</td>
        <td>Perlu resolusi URL dan pre-signed link</td>
      </tr>
      <tr>
        <td>Google — Files API</td>
        <td class="num">3.08–3.21 s</td>
        <td>Tertinggi — proses unggah via Files API SDK</td>
      </tr>
    </tbody>
  </table>
</div>

Meski payload Base64 jauh lebih besar, waktu upload-nya justru paling singkat karena data dikirim langsung ke endpoint API tanpa proses tambahan. URL eksternal memerlukan waktu ekstra untuk resolusi alamat dan autentikasi sebelum transfer data dimulai.

---

### 2.7 Biaya (Est. Cost USD)

<div class="table-wrapper compact">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Provider</th>
        <th>Metode</th>
        <th class="num">Cost (Paralel)</th>
        <th class="num">Cost (Sequential)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Google</td>
        <td>Base64</td>
        <td class="num">$0.000000</td>
        <td class="num">$0.000000</td>
      </tr>
      <tr>
        <td>Google</td>
        <td>Files API</td>
        <td class="num">$0.000000</td>
        <td class="num">$0.000000</td>
      </tr>
      <tr>
        <td>OpenRouter</td>
        <td>Base64</td>
        <td class="num">$0.031886</td>
        <td class="num">$0.032377</td>
      </tr>
      <tr>
        <td>OpenRouter</td>
        <td>Supabase</td>
        <td class="num">$0.032400</td>
        <td class="num">$0.032480</td>
      </tr>
    </tbody>
  </table>
</div>

Biaya identik antara Base64 dan URL eksternal di provider yang sama, mengkonfirmasi bahwa token dihitung dengan cara yang sama terlepas dari metode pengiriman gambar.

---

## 3. Ringkasan Temuan

<div class="table-wrapper">
  <table class="benchmark-table">
    <thead>
      <tr>
        <th>Dimensi</th>
        <th>Hipotesis Awal</th>
        <th>Hasil Aktual</th>
        <th>Verdict</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Payload size</td>
        <td>Base64 lebih besar</td>
        <td>Base64 +33.3% lebih besar</td>
        <td>Terbukti</td>
      </tr>
      <tr class="winner">
        <td>Prompt Tokens</td>
        <td>Base64 lebih banyak token</td>
        <td>Token identik semua metode</td>
        <td>Tidak Terbukti</td>
      </tr>
      <tr class="winner">
        <td>Total Duration</td>
        <td>Base64 lebih lambat</td>
        <td>Base64 justru tercepat</td>
        <td>Terbantahkan</td>
      </tr>
      <tr>
        <td>TTFT</td>
        <td>Base64 lebih lambat</td>
        <td>Files API lebih cepat TTFT, tapi Base64 lebih cepat secara total</td>
        <td>Sebagian Terbukti</td>
      </tr>
      <tr class="winner">
        <td>Throughput</td>
        <td>Base64 lebih rendah</td>
        <td>Base64 TPS tertinggi</td>
        <td>Terbantahkan</td>
      </tr>
      <tr class="winner">
        <td>Biaya</td>
        <td>Base64 lebih mahal</td>
        <td>Biaya identik</td>
        <td>Tidak Terbukti</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 4. Kesimpulan

### Apa yang Terbukti dari Hipotesis Awal

Ukuran data Base64 memang menjadi lebih besar, sekitar 33,3% dibanding file gambar asli. Dalam pengujian ini, gambar berukuran ~392 KB berubah menjadi ~524 KB setelah diubah ke format Base64. Ini memang merupakan karakteristik normal dari Base64.

### Apa yang Tidak Terbukti

Ukuran payload yang lebih besar ternyata tidak menyebabkan:

1. Penggunaan token lebih banyak — jumlah token tetap ditentukan oleh resolusi gambar, bukan ukuran payload.
2. Proses lebih lambat — Base64 justru menghasilkan Total Duration yang 36–57% lebih cepat.
3. Biaya lebih mahal — biaya tetap sama pada provider yang sama.

### Mengapa Base64 Bisa Lebih Cepat

* Data gambar sudah langsung ikut dikirim di dalam request, sehingga server tidak perlu mengambil file dari alamat eksternal terlebih dahulu.
* Pada metode Files API dan Supabase, server masih harus mengambil file dari Google Cloud Storage atau Supabase CDN sebelum mulai memproses gambar.
* Base64 juga tidak bergantung pada kecepatan atau kestabilan layanan penyimpanan pihak ketiga.

### Kesimpulan Akhir

>Anggapan awal saya bahwa Base64 kurang efisien memang benar jika dilihat dari ukuran payload yang lebih besar. Tetapi dalam pengujian ini, hal tersebut tidak membuat proses menjadi lebih lambat atau lebih mahal. Justru, Base64 menjadi metode yang paling efisien untuk kecepatan pemrosesan secara keseluruhan.

👉🏼 **[msyamsudin/PustakaKu-MD](https://github.com/msyamsudin/PustakaKu-MD)**