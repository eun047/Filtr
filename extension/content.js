chrome.runtime.sendMessage(
  { type: "analyze", url: window.location.href },
  (data) => {
    if (!data) return;

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
    transition: opacity 1s ease;
  `;
    banner.textContent = `Filtr | 신뢰도 ${data.grade}등급 (${data.score}점) — ${data.reason}`;
    document.body.prepend(banner);

    setTimeout(() => {
      banner.style.opacity = "0";
      setTimeout(() => banner.remove(), 1000);
    }, 1000);
  },
);

function getBannerColor(grade) {
  const colors = { A: "#2ecc71", B: "#3498db", C: "#f39c12", D: "#e74c3c" };
  return colors[grade] || "#95a5a6";
}
