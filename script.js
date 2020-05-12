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
        question: "What are the technical and additional skills that are needed to be a front-end developer?",
        options: [ "HTML, CSS Javascript", "Joomla, CSS, CMS", "Java, JavaScript, Ruby" ],
        answer: 0   
    }, 
    {
        question: "How do you deal with browser-specific style incompatibility?",

        options: ["to utilize a for loop in the body tag of your HTML to recognize the browser and load an external stylesheet",
        "to utilize a conditional statement in the head tag of your HTML to recognize the browser and load an external stylesheet",
        "to utilize a function statement in the head tag of your HTML to recognize the browser and load an inline stylesheet",],
        answer: 1
    }, 
    {
        question: "When would you utilize CSS float?",
        options: ["when you need to make an element of your web page be pushed to the center and make other elements cover around it.", 
         "when you need to make an element of your web page be pushed to the top and bottom and make other elements cover around it.",
         "when you need to make an element of your web page be pushed to the right or left and make other elements cover around it."],
        answer: 2
    }, 
    {
        question: "How would you center a div?",
        options: ["By setting a height and setting margin to 50%",
        "By setting a width and setting margin to auto",
        "By setting a width and setting padding to auto "],
        answer: 1
    }, 
    {
        question: "What is the difference between classes and IDs?",
        options: ["The id's are commonly used to style elements that only look once on a page, classes are utilized to style different elements in the same fashion",
            "The classes are commonly used to style elements that only look once on a page, id's are utilized to style different elements in the same fashion", 
          "The classes are used to style the page while id's are used to select the element"],
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
        displayScore();
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
        console.log(score);
        
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

function displayScore() {
    finalScore.innerHTML=score;

}
