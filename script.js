window.addEventListener("load", () => {
	setTimeout(() => {
		greetMe();
	}, 100);
});

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
	let textSpeak = new SpeechSynthesisUtterance(text);
	textSpeak.rate = 1;
	textSpeak.pitch = 1;
	textSpeak.volume = 1;
	textSpeak.lang = "hi";  
	window.speechSynthesis.speak(textSpeak);
}

function greetMe() {
	let day = new Date();
	let hours = day.getHours();
	if (hours >= 0 && hours <= 12) {
		speak("Good Morning Sir");
	} else if (hours >= 12 && hours <= 17) {
		speak("Good Afternoon Sir");
	} else if (hours >= 17 && hours <= 19) {
		speak("Good Evening Sir");
	} else {
		speak("Good Night Sir");
	}
}

let speechRecognization =
	window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognization();
recognition.onresult = (event) => {
	let currentIndex = event.resultIndex;
	let transcript = event.results[currentIndex][0].transcript;
	content.innerText = transcript;
	takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
	recognition.start();
	btn.style.display = "none";
	voice.style.display = "block";
});

function takeCommand(msg) {
	btn.style.display = "flex";
	voice.style.display = "none";

	if (msg.includes("hello")) {
		speak("Hello , How Are You , What Can I Do For You?");
	} else if (msg.includes("who are you")) {
		speak("I am virtual assistant , created by Mayank Sir");
	} else if (msg.includes("open youtube")) {
		speak("Opening Youtube");
		window.open("https://www.youtube.com");
	} else if (msg.includes("how are you")) {
		speak("I am fine what about you?");
	} else if (msg.includes("open instagram")) {
		speak("Opening instagram");
		window.open("https://www.instagram.com");
	} else if (msg.includes("open facebook")) {
		speak("Opening facebook");
		window.open("https://www.facebook.com");
	} else if (msg.includes("open linkedin") || msg.includes("open linkdin")) {
		speak("Opening LinkedIn");
		window.open("https://www.linkedin.com");
	} else if (msg.includes("open google")) {
		speak("Opening google");
		window.open("https://www.google.com");
	} else if (msg.includes("open calculator")) {
		speak("Opening calculator");
		window.open("calculator://");
	} else if (msg.includes("open whatsapp")) {
		speak("Opening whatsapp");
		window.open("whatsapp://");
	} else if (msg.includes("time")) {
		let timer = new Date().toLocaleString(undefined, {
			hour: "numeric",
			minute: "numeric",
		});
		speak(timer);
	} else if (msg.includes("date")) {
		let date = new Date().toLocaleString(undefined, {
			day: "numeric",
			month: "short",
		});
		speak(date);
	} else {
		let finalText = msg.replace("tyson", "") || msg.replace("python", "");
		speak(`this is what i found on internet regarding ${finalText}`);
		window.open(`https://www.google.com/search?q=${finalText}`);
	}
}
