function calculateFootprint() {
    let electricity = document.getElementById('electricity').value * 0.5; // 0.5 kg CO2 per kWh
    let petrol = document.getElementById('petrol').value * 2.3; // 2.3 kg CO2 per km (petrol)
    let diesel = document.getElementById('diesel').value * 2.7; // 2.7 kg CO2 per km (diesel)
    let meat = document.getElementById('meat').value * 27; // 27 kg CO2 per kg of meat
    let gas = document.getElementById('gas').value * 2.3; // 2.3 kg CO2 per liter of gas
    let garbage = document.getElementById('garbage').value * 0.5; // 0.5 kg CO2 per kg of garbage
    
    let totalMonthly = (electricity + petrol + diesel + meat + gas + garbage).toFixed(2);
    let totalDaily = (totalMonthly / 30).toFixed(2);
    
    document.getElementById('result-monthly').innerText = totalMonthly;
    document.getElementById('result-daily').innerText = totalDaily;
}
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

const apiKey = "AIzaSyCoKBEr7LjkYr0mmzlM9goskd6Lmv5HP3I";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

document.addEventListener("DOMContentLoaded", () => {
document.getElementById("sendBtn").addEventListener("click", generateResponse);
document.getElementById("userInput").addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    generateResponse();
}
});
});

async function generateResponse() {
const inputValue = "give suggestion about reduced use of electricity";
if (!inputValue) {
document.getElementById("output").textContent = "Please enter a query.";
return;
}

document.getElementById("output").textContent = "Getting response...";

try {
const result = await model.generateContent(inputValue);
const response = await result.response.text();
document.getElementById("output").innerHTML = formatTextResponse(response);
} catch (error) {
console.error("Error:", error);
document.getElementById("output").textContent = "Failed to load response.";
}
}

function formatTextResponse(responseText) {
return responseText
.replace(/\*\*(.*?)\*\*/g, "<h2>$1</h2>")
.replace(/\*(.*?)\*/g, "<strong>$1</strong>")
.replace(/- (.*?)\n/g, "<li>$1</li>")
.replace(/\n\n/g, "<br><br>")
.replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>");
}