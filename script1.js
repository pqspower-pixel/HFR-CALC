/* ================= MASTER LAMINATION DATA =================
   Key format: MATERIAL_kVAR_DETUNING
   Example: ALU_50_7
   ========================================================= */

const LAMINATION_MAP = {

  // ---------- ALUMINIUM ----------
  "ALU_25_7":  { size: "200x40", limb: 3, yoke: 2 },
  "ALU_50_7":  { size: "230x50", limb: 3, yoke: 2 },
  "ALU_75_7":  { size: "250x50", limb: 4, yoke: 2 },

  "ALU_25_14": { size: "200x40", limb: 4, yoke: 2 },
  "ALU_50_14": { size: "230x50", limb: 4, yoke: 2 },
  "ALU_75_14": { size: "250x50", limb: 5, yoke: 2 },

  // ---------- COPPER ----------
  "CU_25_7":   { size: "200x40", limb: 3, yoke: 2 },
  "CU_50_7":   { size: "230x50", limb: 3, yoke: 2 },
  "CU_75_7":   { size: "250x50", limb: 4, yoke: 2 },

  "CU_25_14":  { size: "200x40", limb: 4, yoke: 2 },
  "CU_50_14":  { size: "230x50", limb: 4, yoke: 2 },
  "CU_75_14":  { size: "250x50", limb: 5, yoke: 2 }
};


/* ================= ORDER ITEMS ================= */
let orderItems = [];


/* ================= ADD ITEM ================= */
function addItem() {
  orderItems.push({
    material: "ALU",   // ALU | CU
    kvar: 25,
    detuning: 7,       // 7 | 14
    qty: 1
  });

  renderItems();
}


/* ================= RENDER INPUT TABLE ================= */
function renderItems() {
  const body = document.getElementById("itemBody");
  body.innerHTML = "";

  orderItems.forEach((item, i) => {
    body.innerHTML += `
      <tr>
        <td>
          <select onchange="orderItems[${i}].material=this.value; renderSummaryTable()">
            <option value="ALU" ${item.material==="ALU"?"selected":""}>ALU</option>
            <option value="CU" ${item.material==="CU"?"selected":""}>CU</option>
          </select>
        </td>

        <td>
          <select onchange="orderItems[${i}].kvar=Number(this.value); renderSummaryTable()">
            <option value="25" ${item.kvar===25?"selected":""}>25</option>
            <option value="50" ${item.kvar===50?"selected":""}>50</option>
            <option value="75" ${item.kvar===75?"selected":""}>75</option>
          </select>
        </td>

        <td>
          <select onchange="orderItems[${i}].detuning=Number(this.value); renderSummaryTable()">
            <option value="7" ${item.detuning===7?"selected":""}>7%</option>
            <option value="14" ${item.detuning===14?"selected":""}>14%</option>
          </select>
        </td>

        <td>
          <input type="number" min="1" value="${item.qty}"
            onchange="orderItems[${i}].qty=Number(this.value); renderSummaryTable()">
        </td>

        <td>
          <button onclick="removeItem(${i})">✕</button>
        </td>
      </tr>
    `;
  });

  renderSummaryTable();
}


/* ================= REMOVE ITEM ================= */
function removeItem(i) {
  orderItems.splice(i, 1);
  renderItems();
}


/* ================= CALCULATE SUMMARY ================= */
function calculateLaminationSummary() {
  const summary = {};

  orderItems.forEach(item => {
    const key = `${item.material}_${item.kvar}_${item.detuning}`;
    const data = LAMINATION_MAP[key];

    if (!data) return;

    if (!summary[data.size]) {
      summary[data.size] = { limb: 0, yoke: 0 };
    }

    summary[data.size].limb += data.limb * item.qty;
    summary[data.size].yoke += data.yoke * item.qty;
  });

  return summary;
}


/* ================= RENDER SUMMARY TABLE ================= */
function renderSummaryTable() {
  const summary = calculateLaminationSummary();
  const body = document.getElementById("summaryBody");

  body.innerHTML = "";

  Object.keys(summary).forEach(size => {
    body.innerHTML += `
      <tr>
        <td>${size}</td>
        <td>${summary[size].limb}</td>
        <td>${summary[size].yoke}</td>
      </tr>
    `;
  });
}


/* ================= INIT ================= */
addItem();

