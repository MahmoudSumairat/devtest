const elementsContainers = document.querySelectorAll(
	".main-page__game-elements"
);
const getStartedButton = document.querySelector("#getStartedButton");
const welcomeContainer = document.querySelector("#welcomeContainer");
const computerOptionsContainer = document.querySelector("#computerOptions");
const userOptionsContainer = document.querySelector("#userOptions");
const elementOptions = ["rock", "paper", "scissor"];
let gameState = "paused";
let userOption;

const whoWins = (userOption, computerOption) => {
	if (userOption === computerOption) {
		return "draw";
	}
	const computerWins = "you lost";
	const userWins = "you won!";
	switch (userOption) {
		case "rock":
			if (computerOption === "paper") return computerWins;
			if (computerOption === "scissor") return userWins;
		case "paper":
			if (computerOption === "scissor") return computerWins;
			if (computerOption === "rock") return userWins;
		case "scissor":
			if (computerOption === "rock") return computerWins;
			if (computerOption === "paper") return userWins;
	}
};

setOptionActive = (option, withPointer) => {
	option.style.opacity = 1;
	option.style.cursor = withPointer ? "pointer" : "default";
	option.style.transform = "scale(1.3)";
};

updateResult = (computerValue, value) => {
	userOption = value;
	welcomeContainer.style.display = "flex";
	welcomeContainer.querySelector("button").textContent = "Play again";
	welcomeContainer.querySelector("h1").textContent = whoWins(
		value,
		computerValue
	);
};

const getStarted = () => {
	if (gameState === "started") {
		elementsContainers.forEach((container) => {
			Array.from(container.childNodes).forEach((element) => {
				if (element.style) {
					element.style.transform = "scale(1)";
				}
			});
		});
		userOption = null;
	}
	elementsContainers.forEach((container) => {
		container.classList.remove("disabled");
	});
	userOptionsContainer.addEventListener("click", chooseElement);

	welcomeContainer.style.display = "none";
	gameState = "started";
};

const chooseElement = (event) => {
	const { target } = event;
	const { value } = target.dataset;

	if (value && !userOption) {
		const randomNumber = Math.floor(Math.random() * 3);
		setOptionActive(target);

		const computerChosenOption = Array.from(
			computerOptionsContainer.childNodes
		).find((node) => {
			return (
				node.dataset && node.dataset.value === elementOptions[randomNumber]
			);
		});
		setOptionActive(computerChosenOption, false);
		const computerValue = computerChosenOption.dataset.value;
		updateResult(computerValue, value);
	}
};

getStartedButton.addEventListener("click", getStarted);
