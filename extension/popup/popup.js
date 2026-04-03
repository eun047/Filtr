const API_URL = "http://localhost:5001";

const GRADE_STYLES = {
  A: { bg: "#EAF3DE", color: "#3B6D11", trust: "높음", cite: "가능" },
  B: { bg: "#E6F1FB", color: "#185FA5", trust: "보통", cite: "가능" },
  C: { bg: "#FAEEDA", color: "#854F0B", trust: "낮음", cite: "주의" },
  D: { bg: "#FCEBEB", color: "#A32D2D", trust: "매우 낮음", cite: "비권장" },
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;
  const hostname = new URL(url).hostname;
  document.getElementById("domain").textContent = hostname;

  fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => res.json())
    .then((data) => {
      const style = GRADE_STYLES[data.grade] || GRADE_STYLES["C"];

      document.getElementById("grade-box").style.background = style.bg;
      document.getElementById("grade-letter").style.color = style.color;
      document.getElementById("grade-letter").textContent = data.grade;
      document.getElementById("score").textContent = data.score + "점";
      document.getElementById("reason").textContent = data.reason;
      document.getElementById("trust").textContent = style.trust;
      document.getElementById("trust").style.color = style.color;
      document.getElementById("cite").textContent = style.cite;
      document.getElementById("cite").style.color = style.color;
    })
    .catch(() => {
      document.getElementById("reason").textContent = "분석 실패";
    });
});
