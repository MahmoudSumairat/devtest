const elementsContainers = document.querySelectorAll(
	".main-page__game-elements"
);
const getStartedButton = document.querySelector("#getStartedButton");
const welcomeContainer = document.querySelector("#welcomeContainer");
const computerOptionsContainer = document.querySelector("#computerOptions");
const userOptionsContainer = document.querySelector("#userOptions");
const elementOptions = ["rock", "paper", "scissor"];

const chooseElement = (event) => {
	const { target } = event;
	const { value } = target.dataset;

	if (value) {
		const randomNumber = Math.floor(Math.random() * 3);
		userOptions.classList.add("disabled");
		computerOptionsContainer.classList.add("disabled");
		target.style.opacity = 1;
		target.style.cursor = "pointer";
		target.style.transform = "scale(1.3)";

		const computerChosenOption = Array.from(
			computerOptionsContainer.childNodes
		).find((node) => {
			return (
				node.dataset && node.dataset.value === elementOptions[randomNumber]
			);
		});

		computerChosenOption.style.opacity = 1;
		computerChosenOption.style.cursor = "pointer";
		computerChosenOption.style.transform = "scale(1.3)";
	}
};

const getStarted = () => {
	elementsContainers.forEach((container) => {
		container.classList.remove("disabled");
		container.addEventListener("click", chooseElement);
	});
	welcomeContainer.style.display = "none";
};

getStartedButton.addEventListener("click", getStarted);
