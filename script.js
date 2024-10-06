const paper = document.getElementById('paper');
const rock = document.getElementById('rock');
const scissors = document.getElementById('scissors');
const Triangle = document.getElementById("trai-image");
const RuleBtn = document.getElementById("rules");
const RuleWindow = document.getElementById("rules-box");
const CloseBtn = document.getElementById("close-button");
const OverlayEffect = document.getElementById("overlay-div");
const inputOptions = document.getElementsByClassName("option");
const scoreNumber = document.getElementById("score-text");
const labels = document.getElementById("hidden-label");
const secondStage = document.getElementById("hidden-step-div");
const finalStageResult = document.getElementById("result-div");
const finalResultText = document.getElementById("result-text");
const HouseChoice = document.getElementById("house-choice");
const UserChoice = document.getElementById("user-choice");
const TransitionState = document.getElementById("transition-state")
const PlayAgain = document.getElementById("play-button");
const options = ['paper', 'scissors', 'rock'];

const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let winTimes = 0;

RuleBtn.addEventListener('click', () => {
    RuleWindow.style.display = "flex";
    OverlayEffect.style.display = "block";    
});

CloseBtn.addEventListener('click', () => {
    RuleWindow.style.display = "none";
    OverlayEffect.style.display = "none";
});

function WinningCondition(option1, option2){
    let win = false;
    if(option1 === 'paper' && option2 === 'rock'){
        win = true;
    }
    else if(option1 === 'rock' && option2 === 'scissors'){
        win = true;
    }
    else if(option1 === 'scissors' && option2 === 'paper'){
        win = true;
    }
    return win;
}

function chooseOption(option, OptionNumber){
    let resultString;
    while(option === options[OptionNumber]){
        OptionNumber = randomInRange(0, 2);
    }
    if(WinningCondition(option, options[OptionNumber]) === true){
        
        resultString = "YOU WIN";
        winTimes ++;
    }
    else{
        resultString = "YOU LOSE";
    }
    SetChoice(option);
    SetChoice(options[OptionNumber], false);
    finalResultText.innerText = resultString;

}


function SetChoice(choice, user=true){
    Index = options.indexOf(choice);
    const classChoice = ['outer-paper-div', 'outer-scissor-div','outer-rock-div'];
    const innerClassChoice = ['paper-div', 'scissors-div', 'rock-div'];
    const Icon = document.createElement('img');
    const inner_div = document.createElement('div'); 
    Icon.src = `images/icon-${choice}.svg`;
    inner_div.appendChild(Icon);
    inner_div.classList.add(innerClassChoice[Index]);
    if(user){
        UserChoice.appendChild(inner_div);
        UserChoice.classList.add(classChoice[Index]);
        UserChoice.style.padding = `22.500px`;
    }
    else{
        HouseChoice.appendChild(inner_div);
        HouseChoice.classList.add(classChoice[Index]);
        HouseChoice.style.padding = `22.500px`;
    }
}

function RemoveElements(element){
    element.firstChild.removeChild(element.firstChild.firstChild);
    // element.firstChild.firstChild.remove();
    element.removeChild(element.firstChild);
    // element.firstChild.remove();
    element.classList.remove(...element.classList);
}


function SecondStep(){
    Triangle.style.display = "none";
    for(let i = 0; i < inputOptions.length; i++){
        inputOptions[i].style.display = "none";
    }
    secondStage.style.display = "flex";
    labels.style.display = "flex";
    TransitionState.style.display = "block";
    setTimeout(function() {
        TransitionState.style.display = "none";
        HouseChoice.style.display = "block";
    }, 900);
    setTimeout(displayResult, 1000);
}

function displayResult(){
    scoreNumber.innerText = winTimes.toString();
    finalStageResult.style.display = "flex";
    HouseChoice.classList.add('option');
    UserChoice.classList.add('option');
    secondStage.style.width = "50%";
    labels.style.width = "49%";
}

function resetGame(){
    finalStageResult.style.display = "none";
    RemoveElements(UserChoice);
    RemoveElements(HouseChoice);
    secondStage.style.display = "none";
    labels.style.display = "none";
    TransitionState.style.display = "none";
    HouseChoice.style.display = "none";
    secondStage.style.width = "36%";
    labels.style.width = "35%";
    Triangle.style.display = "block";
    for(let i = 0; i < inputOptions.length; i++){
        inputOptions[i].style.display = "block";
    }

}
for(let i = 0; i < inputOptions.length; i++){
    inputOptions[i].addEventListener('click', () => {
        let randomNumber = randomInRange(0, 2);
        chooseOption(inputOptions[i].id, randomNumber);
        SecondStep();  
    })
}

PlayAgain.addEventListener('click', resetGame);

