async function send() {
  let input = document.getElementById("msg");
  let chat = document.getElementById("chat");

  let userText = input.value;
  if (!userText) return;

  chat.innerHTML += `<div class="user"><b>You:</b> ${userText}</div>`;
  input.value = "";

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi:2.7b",
      prompt: `
You are CUHP AI Chatbot.
Role:
- Teach Undergraduate & Postgraduate students
- Explain step-by-step
- Use academic tone
- Focus on Physics, Maths, Science

Question: ${userText}
`,
      stream: false
    })
  });

  const data = await response.json();
  chat.innerHTML += `<div class="bot"><b>AI:</b> ${data.response}</div>`;
  chat.scrollTop = chat.scrollHeight;
}
