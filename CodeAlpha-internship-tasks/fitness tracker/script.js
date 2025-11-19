function loadEntries() {
    return JSON.parse(localStorage.getItem("entries") || "[]");
}

function saveEntries(list) {
    localStorage.setItem("entries", JSON.stringify(list));
}


const entryForm = document.getElementById("entryForm");
const entriesList = document.getElementById("entriesList");

const stepsInput   = document.getElementById("stepsInput");
const minutesInput = document.getElementById("minutesInput");
const calInput     = document.getElementById("calInput");
const dateInput    = document.getElementById("dateInput");

const metricSteps   = document.getElementById("metricSteps");
const metricMinutes = document.getElementById("metricMinutes");
const metricCal     = document.getElementById("metricCal");

const progressSteps   = document.getElementById("progressSteps");
const progressMinutes = document.getElementById("progressMinutes");
const progressCal     = document.getElementById("progressCal");

let entries = loadEntries();


entryForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const entry = {
        id: Date.now(),
        date: dateInput.value,
        steps: Number(stepsInput.value),
        minutes: Number(minutesInput.value),
        calories: Number(calInput.value)
    };

    entries.push(entry);
    saveEntries(entries);
    renderEntries();
    updateDashboard();

    entryForm.reset();
});


function renderEntries() {
    entriesList.innerHTML = "";

    if (entries.length === 0) {
        entriesList.innerHTML = "<p class='empty'>لا يوجد سجلات بعد.</p>";
        return;
    }

    entries.forEach((e) => {
        const li = document.createElement("li");
        li.className = "entry-item";

        li.innerHTML = `
            <div>
                <strong>${e.date}</strong>
                <p>خطوات: ${e.steps}</p>
                <p>دقائق التمرين: ${e.minutes}</p>
                <p>السعرات: ${e.calories}</p>
            </div>
            <button onclick="deleteEntry(${e.id})" class="delete-btn">حذف</button>
        `;

        entriesList.appendChild(li);
    });
}


function deleteEntry(id) {
    entries = entries.filter(e => e.id !== id);
    saveEntries(entries);
    renderEntries();
    updateDashboard();
}

document.getElementById("clearAll").addEventListener("click", () => {
    if (confirm("هل أنت متأكد أنك تريد مسح كل السجلات؟")) {
        entries = [];
        saveEntries(entries);
        renderEntries();
        updateDashboard();
    }
});