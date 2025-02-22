async function askAI() {    
    const input = document.getElementById('userInput').value;
    const outputElement = document.getElementById('output');

    outputElement.innerText = "Waiting for response...";
    const genAI = new GoogleGenerativeAI("AIzaSyAI_dJ5cuc_eRJvjhPofnPIB4oTZGBwgps");
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const prompt = "Essay about archit from nitt mech";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}


