const url = window.location.href;

fetch("http://localhost:5001/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url }),
})
  .then((res) => res.json())
  .then((data) => {
    const banner = document.createElement("div");
    banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    z-index: 99999;
    background-color: ${getBannerColor(data.grade)};
    color: white;
  `;
    banner.textContent = `Filtr | 신뢰도 ${data.grade}등급 (${data.score}점) — ${data.reason}`;
    document.body.prepend(banner);
  })
  .catch((err) => console.error("Filtr 오류:", err));

function getBannerColor(grade) {
  const colors = { A: "#2ecc71", B: "#3498db", C: "#f39c12", D: "#e74c3c" };
  return colors[grade] || "#95a5a6";
}
