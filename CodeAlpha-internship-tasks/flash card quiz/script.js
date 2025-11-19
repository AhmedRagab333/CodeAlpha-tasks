let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

let index = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

function renderCard() {
    if (flashcards.length === 0) {
        questionEl.textContent = "No flashcards added yet.";
        answerEl.textContent = "";
        answerEl.classList.add("hidden");
        return;
    }

    questionEl.textContent = flashcards[index].question;
    answerEl.textContent = flashcards[index].answer;
    answerEl.classList.add("hidden");
}

document.getElementById("show").addEventListener("click", () => {
    answerEl.classList.toggle("hidden");
});

document.getElementById("next").addEventListener("click", () => {
    if (flashcards.length === 0) return;
    index = (index + 1) % flashcards.length;
    renderCard();
});

document.getElementById("prev").addEventListener("click", () => {
    if (flashcards.length === 0) return;
    index = (index - 1 + flashcards.length) % flashcards.length;
    renderCard();
});

document.getElementById("add").addEventListener("click", () => {
    let q = document.getElementById("newQuestion").value;
    let a = document.getElementById("newAnswer").value;

    if (q.trim() === "" || a.trim() === "") {
        alert("Please fill both fields!");
        return;
    }

    flashcards.push({ question: q, answer: a });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));

    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";

    index = flashcards.length - 1;
    renderCard();
});

document.getElementById("delete").addEventListener("click", () => {
    if (flashcards.length === 0) return;

    flashcards.splice(index, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));

    if (index > 0) index--;
    renderCard();
});

renderCard();