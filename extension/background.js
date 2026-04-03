chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "analyze") {
    fetch("http://localhost:5001/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: request.url }),
    })
      .then((res) => res.json())
      .then((data) => sendResponse(data))
      .catch(() => sendResponse(null));
    return true;
  }
});
