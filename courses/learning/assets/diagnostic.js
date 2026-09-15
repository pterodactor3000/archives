const quizForm = document.querySelector("[data-diagnostic-quiz]");
const result = document.querySelector("[data-diagnostic-result]");
const reportButton = document.querySelector("[data-copy-report]");
const reportTemplate = document.querySelector("[data-report-template]");

if (quizForm instanceof HTMLFormElement && result instanceof HTMLElement) {
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const questions = [...quizForm.querySelectorAll("fieldset[data-answer]")];
    let score = 0;

    for (const question of questions) {
      if (!(question instanceof HTMLFieldSetElement)) {
        continue;
      }

      const selected = question.querySelector("input[type='radio']:checked");
      if (
        selected instanceof HTMLInputElement &&
        selected.value === question.dataset.answer
      ) {
        score += 1;
      }
    }

    result.textContent = `Knowledge check: ${score}/${questions.length}. Record this score, then finish the coding tasks before judging your baseline.`;
    result.focus();
  });
}

if (
  reportButton instanceof HTMLButtonElement &&
  reportTemplate instanceof HTMLTextAreaElement
) {
  reportButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(reportTemplate.value);
      reportButton.textContent = "Copied";
    } catch {
      reportTemplate.select();
      reportButton.textContent = "Selected. Copy manually";
    }
  });
}
