// elements
const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const quizContainerElement = document.querySelector('.quiz-container');
const questionNumber = document.querySelector('.question-num-value');
const questionElement = document.querySelector('#question');
const options = document.querySelector('.options').children;
const optionA = document.querySelector('.optionA');
const optionB = document.querySelector('.optionB');
const optionC = document.querySelector('.optionC');
const scoreTrackers = document.querySelector('.score-trackers');
const correctAnswerElement = document.querySelector('.correct-answer');
const finalScore = document.querySelector('.final-score');
const gameOver = document.querySelector('.game-over');
let currentQuestionIndex;
let questionNumberIndex = 0;
let score=0;
let myArray = [];
let myArr=[];

const questions = [
    {
        question: "WHo invented A?",
        options: [ "que", "amet", "quart" ],
        answer: 0   
    }, 
    {
        question: "WHo invented B?",
        options: ["un", "deux", "trois"],
        answer: 1
    }, 
    {
        question: "WHo invented C?",
        options: ["lorem", "ipsum", "dolor"],
        answer: 2
    }, 
    {
        question: "WHo invented BB?",
        options: ["Her", "She", "They"],
        answer: 1
    }, 
    {
        question: "WHo invented AA?",
        options: ["Me", "You", "Them"],
        answer: 0
    }
]

startButton.addEventListener('click', startGame); 

nextButton.addEventListener('click', nextQuestion);

// START GAME
function startGame() {
    startButton.classList.add('hide');
    quizContainerElement.classList.remove('hide');
}

//Set questions and options and question number
function load() {
    questionNumber.innerHTML = questionNumberIndex+1;
    questionElement.innerHTML = questions[currentQuestionIndex].question;
    optionA.innerHTML = questions[currentQuestionIndex].options[0];
    optionB.innerHTML = questions[currentQuestionIndex].options[1];
    optionC.innerHTML = questions[currentQuestionIndex].options[2];
    questionNumberIndex++;
}

//Shuffle questions
function shuffleQuestions(){
    let randomNumber = Math.floor(Math.random()*5);
    let hitDuplicate = 0;
    if(questionNumberIndex==5) {
        console.log('gameover');
        quizContainerElement.classList.add('hide');
        gameOver.classList.remove('hide');
        //gameOver();
    } else {
        if(myArray.length>0) {
            for (let i = 0; i < myArray.length; i++) {
                if(myArray[i]==randomNumber) {
                    hitDuplicate = 1;  
                    break;
                }
            }
            if(hitDuplicate==1) {
                shuffleQuestions();
            } else {
                currentQuestionIndex = randomNumber;
                load();
                myArr.push(currentQuestionIndex);
            }
        }
        if(myArray.length==0) {
            currentQuestionIndex = randomNumber;
            load();
            myArr.push(currentQuestionIndex);
        }
        console.log(myArr);
    }
    myArray.push(randomNumber);
    // currentQuestionIndex = randomNumber;
    // load();
}

window.onload=function(){
    shuffleQuestions();
    scoreTracker();
}

// Check if selected answer is right or wrong
function check(element) {
    if(element.id==questions[currentQuestionIndex].answer) {
        element.classList.add('correct');
        updateScoreTracker('correct');
        score++;
        
    } else {
        element.classList.add('wrong');
        updateScoreTracker('wrong');
    }
    disableOptions();
}

// Disable other options and 
// show correct option if selectedanswer is wrong
function disableOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        if(options[i].id==questions[currentQuestionIndex].answer) {
            options[i].classList.add('correct');
        }    
    }  
}

function enableOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('disabled', 'correct', 'wrong');  
    }  
}

function scoreTracker() {
    for (let i = 0; i < 5; i++) {
        const divs = document.createElement('div');
         scoreTrackers.appendChild(divs);        
    }
}

function updateScoreTracker(name) {
    scoreTrackers.children[questionNumberIndex-1].classList.add(name);
}

// function nextQuestion() {
//     validateAnswer();

//  }

function nextQuestion() {
    //if user presses without choosing an option let him fail and move to next question
    if (!options[0].classList.contains('disabled')){
        // updateScoreTracker('wrong');
        // enableOptions();
        // shuffleQuestions();
        alert('Please select an option')
    } else {
        enableOptions();
        shuffleQuestions();
    }
}

