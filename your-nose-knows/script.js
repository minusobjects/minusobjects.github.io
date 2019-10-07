let currentPage = 'onboarding';
const onboarding = document.querySelector('#onboarding');
const sidePanel = document.querySelector('#SidePanel');
const popup = document.querySelector('#popup');

	    const panel = document.querySelector('acc-side-panel');
	    const content = document.querySelector('acc-content');
	    content.addEventListener('shortcut', ()=> console.log('content shortcut', content.shortcut));

	    const inputModeSelect = document.querySelector('acc-input-mode-select');
	    const cursor = document.querySelector('#cursor');
	    const cursorSize = cursor.clientWidth;

	    inputModeSelect.addEventListener('input', function(event) {
	        const input = event.target;
	        cursor.style.left = `${input.contentX - (cursorSize/2)}px`;
	        cursor.style.top = `${input.contentY - (cursorSize/2)}px`;

					if (currentPage === 'onboarding') {
						checkPositionOnboarding(input.contentX, input.contentY);
					} else if (currentPage === 'main') {
						checkPositionMain(input.contentX, input.contentY);
					} else if (currentPage === 'popup') {
						checkPositionPopup(input.contentX, input.contentY);
					}
	    });
	
let idx = 1;
let counter = 0;
let timer;
let divHasChanged = null;
let answer1;
let answer2;
let answer3;
let answerY;
const leftX = 800;
const rightX = 1180;
let currentDraggingDiv = null;
let answerSet;
const cancelDiv = document.getElementById('cancel');
const main = document.querySelector('#main');
const mainDrop = document.querySelector('#MainDrop');

function setAnswers() {
	answerSet = [`set${idx}-1`,`set${idx}-2`,`set${idx}-3`];
	answer1 = document.getElementById(answerSet[0]);
	answer2 = document.getElementById(answerSet[1]);
	answer3 = document.getElementById(answerSet[2]);
	answerY = [[16,208,answer1],[264,456,answer2],[510,702,answer3]];
}

setAnswers();

function reset() {
	clearInterval(timer);
  counter = 0;
	divHasChanged = null;
  currentDraggingDiv = null;
}

function checkY(y) {
  let div;
  answerY.forEach(function(arr) {
    if (y >= arr[0] && y <= arr[1]) {
      div = arr[2];
    }
  });
  return div;
}

function answerQuestion(div) {
  const isCorrect = div.getAttribute('correct') === 'true';
	if (isCorrect) {
		currentDraggingDiv.style.removeProperty('left');
		currentDraggingDiv.style.removeProperty('top');
		currentDraggingDiv.classList.add('answered');
		currentDraggingDiv.classList.remove('draggable');
		mainDrop.classList.add('filled');
		cancelDiv.classList.remove('show');
		noseWrap.classList.remove('readytomove');
		setTimeout(function() {
			noseWrap.classList.add('correct');
		}, 50);
		setTimeout(function() {
			noseWrap.classList.remove('correct');
			popup.classList.add('active');
			currentPage = 'popup';
		}, 800);
	} else {
		rejectAnswer(currentDraggingDiv);
	}
	currentDraggingDiv = null;
	setTimeout(function () {
		reset();
		setAnswers();
	}, 1000);
}

function modifyDiv(div) {
	// should just add once:
	div.classList.add('cursor-hover');
	if (!timer) {
			timer = setInterval(function() {
				counter += 200;
				console.warn(counter);
			}, 200);
	}
  if (counter >= 2200 && !currentDraggingDiv) {
		currentDraggingDiv = div;
		counter = 0;
		clearInterval(timer);
		timer = null;
  }
}

function resetDiv() {
	clearInterval(timer);
	timer = null;
  counter = 0;
	if (divHasChanged) { 	
		divHasChanged.classList.remove('cursor-hover');
	}
  divHasChanged = null;
}

function rejectAnswer(div) {
	cancelDiv.classList.remove('show');
	mainDrop.classList.remove('ready');
	div.classList.add('in-motion');
	div.classList.remove('draggable');
	noseWrap.classList.remove('readytomove');
	div.style.removeProperty('left');
	div.style.removeProperty('top');
	setTimeout(function() {
		div.classList.remove('in-motion');
		currentDraggingDiv = null;
	}, 310);
}

function dragAndDrop(x, y) {
	currentDraggingDiv.style.left = (x - 200) + 'px';
	currentDraggingDiv.style.top = (y - 110) + 'px';
	if (y >= 440 && y <= 700 && x >= 80 && x <= 640) {
		answerQuestion(currentDraggingDiv);
	} else if (x >= 1220 && y >= 300 && y <= 560) {
			rejectAnswer(currentDraggingDiv);
		}
}

function checkPositionMain(x, y) {
  if (currentDraggingDiv) {
		// need to just set these once:
		currentDraggingDiv.classList.add('draggable');
		mainDrop.classList.add('ready');
		noseWrap.classList.add('readytomove');
		cancelDiv.classList.add('show');
		dragAndDrop(x, y)
    return;
	}
  let currentDiv;
	if (x >= leftX && x <= rightX) {
    currentDiv = checkY(y);
  }
  if (currentDiv) {
    if (divHasChanged && currentDiv != divHasChanged) {
      resetDiv();
    }
		if (divHasChanged != currentDiv) {
			divHasChanged = currentDiv;
		}
    modifyDiv(currentDiv);
  } else if (divHasChanged) {
    resetDiv();
  }
}

// onboarding:

let currentOnboardingDiv;
let onboardingStep = 1;
const squareDragBox = document.querySelector('#SquareDragBox');
const dragBoxText = document.querySelector('#DragBoxText');
const squareDropZone = document.querySelector('#SquareDropZone');
const goButton = document.querySelector('#GoButton');
const onboardingPrompt = document.querySelector('#prompt');
const onboardingQuestion = document.querySelector('#question');
const onboardingTitle = document.querySelector('#title');
const noseWrap = document.querySelector('#NoseWrap');
const onboardingBoxes = [
	[990, 1170, 190, 365, squareDragBox],
	[570, 750, 345, 520, squareDropZone],
	[460, 850, 560, 680, goButton]
];
		
function checkPositionOnboarding(x, y) {
	currentOnboardingDiv = null;
	for (let i = 0; i < onboardingBoxes.length; i++) {
		let arr = onboardingBoxes[i];
		if (x >= arr[0] && x <= arr[1] && y >= arr[2] && y <= arr[3]) {
			currentOnboardingDiv = arr[4];
			break;
		}
	}
		onbardingAction(x, y);
}

function onboardingReset(div) {
	div.classList.remove('cursor-hover');
	clearInterval(timer);
	timer = null;
	counter = 0;
}

function onbardingAction(x, y) {
	if (onboardingStep === 1 && !currentOnboardingDiv) {
		onboardingReset(squareDragBox)
	} else if (onboardingStep === 1 && currentOnboardingDiv === squareDragBox) {
		squareDragBox.classList.add('cursor-hover');
		if (!timer) {
				timer = setInterval(function() {
					counter += 200;
					console.warn(counter);
				}, 200);
		}
	  if (counter >= 2000) {
			counter = 0;
			clearInterval(timer);
			timer = null;
			squareDragBox.classList.add('draggable');
			squareDropZone.classList.add('ready');
			noseWrap.classList.add('readytomove');
			dragBoxText.innerText = 'Move now!';
			onboardingStep = 2;
	  }
	} else if (onboardingStep === 2) {
			squareDragBox.style.left = (x - 110) + 'px';
			squareDragBox.style.top = (y - 110) + 'px';
			if (currentOnboardingDiv === squareDropZone) {
				onboardingStep = 3;
				squareDragBox.style.transition = 'all 300ms ease';
				squareDragBox.classList.remove('draggable');
				squareDragBox.style.left = '575px';
				squareDragBox.style.top = '350px';
				squareDropZone.classList.add('filled');
				noseWrap.classList.remove('readytomove');
				dragBoxText.innerText = 'Good job!';
				setTimeout(function() {
					noseWrap.classList.add('correct');
				}, 50);
				setTimeout(function() {
					squareDragBox.classList.add('fade');
					squareDropZone.classList.add('fade');
					onboardingPrompt.classList.add('fade');
					goButton.classList.add('active');
					onboardingQuestion.classList.add('active');
					noseWrap.classList.remove('correct');
				}, 800);
			}
	} else if (onboardingStep === 3 && !currentOnboardingDiv) {
		onboardingReset(goButton);
	} else if (onboardingStep === 3 && currentOnboardingDiv === goButton) {
		goButton.classList.add('cursor-hover');
		if (!timer) {
				timer = setInterval(function() {
					counter += 200;
					console.warn(counter);
				}, 200);
		}
	  if (counter >= 1800) {
			clearInterval(timer);
			counter = 0;
			timer = null;
			goButton.classList.remove('active');
			onboardingQuestion.classList.remove('active');
			onboardingTitle.classList.add('fade');
			onboardingStep = 4;
			setTimeout(function() {
				currentPage = 'main';
				main.removeAttribute('hidden');
				onboarding.setAttribute('hidden', true);
			}, 400);
	  }
	}
}

// popup

let over = false;
const wow = document.querySelector('#wow');
const popupText = document.querySelector('#PopupText');
const playAgain = document.querySelector('#PlayAgain');

const popupBoxes = [
	[510, 870, 40, 190, wow],
	[380, 1080, 230, 470, popupText],
	[470, 870, 510, 610, playAgain]
];

function checkPositionPopup(x, y) {
	if (over) {
		return;
	}
	let currentPopupDiv;
	for (let i = 0; i < popupBoxes.length; i++) {
		let arr = popupBoxes[i];
		if (x >= arr[0] && x <= arr[1] && y >= arr[2] && y <= arr[3]) {
			currentPopupDiv = arr[4];
			break;
		}
	}
		popupAction(currentPopupDiv);
}

function popupAction(div) {
	if (!div) {
		resetPopup();
	}
	if (div === wow) {
		wow.classList.add('cursor-hover');
	}
	if (div === popupText) {
		popupText.classList.add('cursor-hover');
	}
	if (div === playAgain) {
		playAgain.classList.add('cursor-hover');
		if (!timer) {
				timer = setInterval(function() {
					counter += 200;
					console.warn(counter);
				}, 200);
		}
	  if (counter >= 1800) {
			over = true;
			clearInterval(timer);
			counter = 0;
			timer = null;
			playAgain.classList.remove('cursor-hover');
			main.setAttribute('hidden', true);
			popup.classList.remove('active');
			squareDropZone.classList.remove('ready');
			squareDropZone.classList.remove('filled');
			goButton.classList.remove('active');
			goButton.classList.remove('cursor-hover');
			squareDragBox.classList.remove('cursor-hover');
			squareDragBox.style.removeProperty('left');
			squareDragBox.style.removeProperty('top');
			squareDragBox.style.removeProperty('transition');
			dragBoxText.innerText = 'Hold still';
			mainDrop.classList.remove('filled');
			mainDrop.classList.remove('ready');
			answer2.classList.remove('answered');
			setTimeout(function() {
				currentPage = 'onboarding';
				onboarding.removeAttribute('hidden');
				currentOnboardingDiv = null;
				onboardingStep = 1;
				title.classList.remove('fade');
				onboardingPrompt.classList.remove('fade');
				squareDropZone.classList.remove('fade');
				squareDragBox.classList.remove('fade');
				over = false;
			}, 400);
	  }
	}
}

function resetPopup() {
	counter = 0;
	clearInterval(timer);
	timer = null;
	wow.classList.remove('cursor-hover');
	popupText.classList.remove('cursor-hover');
	playAgain.classList.remove('cursor-hover');
}

// side panel

function hideSidePanel() {
	sidePanel.style.display = 'none';
}
function showSidePanel() {
	sidePanel.style.display = 'block';
}
