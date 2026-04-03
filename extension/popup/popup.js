const API_URL = "http://localhost:5001";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;

  fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("result").innerHTML = `
      <div class="grade">${data.grade}</div>
      <div>점수: ${data.score}점</div>
      <div class="reason">${data.reason}</div>
    `;
    })
    .catch(() => {
      document.getElementById("result").textContent = "분석 실패";
    });
});
