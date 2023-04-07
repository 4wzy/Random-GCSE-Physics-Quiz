const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let currentQuestionIndex;
let askedQuestions = []; // this array is used to keep track of the questions already asked

let score = 0;
let wrongQuestions = [];
let correctQuestions = [];

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', setNextQuestion)

function startGame() {
    // Randomise the answer option order
    questions.forEach(question => {
        // Sort with a random comparison function to shuffle the order of answers
        question.answers.sort(() => Math.random() - 0.5);
    })

    document.getElementById("result").innerHTML = "";
    score = 0;
    askedQuestions = []; // Reset asked questions
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    if (askedQuestions.length == questions.length) {
        endGame();
        return;
    }

    let randomIndex = Math.floor(Math.random() * questions.length);
    // check if the question has been asked before
    while (askedQuestions.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * questions.length); // if yes, generate another random index
    }
    currentQuestionIndex = randomIndex;
    askedQuestions.push(currentQuestionIndex)
    showQuestion(currentQuestionIndex);
}

function showQuestion(currentIndex) {
    const question = questions[currentIndex];
    const questionNumber = (currentIndex + 1).toString(); // use the index to calculate the question number
    questionElement.innerText = `Q${questionNumber}) ${question.question}`; // append the question number to the text
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

    currentQuestionIndex++;
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (correct) {
        correctQuestions.push(currentQuestionIndex);
        score++;
    } else {
        wrongQuestions.push(currentQuestionIndex);
    }

    if (questions.length > currentQuestionIndex - 1) {
        nextButton.classList.remove('hide')
    } else {
        endGame()
    }
}

function endGame() {
    questionContainerElement.classList.add('hide');
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');

    const scorePercent = ((score / questions.length) * 100).toFixed(0);

    let result = `<p>Your final score is: ${score}/${questions.length} (${scorePercent}%)</p><ul>`;
    if (wrongQuestions.length > 0) {
        // Sort the wrong questions array in ascending order
        wrongQuestions.sort((a, b) => a - b)
        result += "<p>You got these questions wrong:</p>";
        wrongQuestions.forEach((wrongQuestion) => {
            result += `<li class="no-bullet-point"><span class="index-number" id="q${wrongQuestion}">${wrongQuestion})</span> ${questions[wrongQuestion - 1].question}<br></li>`;
        });
    }
    if (correctQuestions.length > 0) {
        // Sort the correct questions array in ascending order
        correctQuestions.sort((a, b) => a - b)
        result += "<p>You got these questions right:</p>";
        correctQuestions.forEach((correctQuestion) => {
            result += `<li class="no-bullet-point"><span class="index-number" id="q${correctQuestion}">${correctQuestion})</span> ${questions[correctQuestion - 1].question}<br></li>`;
        });
    }
    result += "</ul>";
    document.getElementById("result").innerHTML = result;

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }

}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Describe the model of the atom proposed by Dalton model.',
        answers: [
            { text: 'Atoms are made of indivisible spheres.', correct: true },
            { text: 'An atom is ball of positive charge with electrons distributed inside.', correct: false },
            { text: 'An atom has a nucleus with orbiting electrons.', correct: false },
            { text: 'Electrons in an atom orbit in fixed energy levels.', correct: false }
        ]
    },

    {
        question: 'Describe the model of the atom proposed by Thomson.',
        answers: [

            { text: 'An atom is ball of positive charge with electrons distributed inside.', correct: true },
            { text: 'An atom has a nucleus with orbiting electrons.', correct: false },
            { text: 'Electrons in an atom orbit in fixed energy levels.', correct: false },
            { text: 'Atoms are made of indivisible spheres.', correct: false }
        ]
    },

    {
        question: 'What was expected to happen in the gold foil experiment?',
        answers: [
            { text: 'The alpha particles would bounce back.', correct: false },
            { text: 'The alpha particles would go straight through.', correct: true },
            { text: 'The alpha particles would be deflected.', correct: false },
            { text: 'The alpha particles would spiral into the gold foil and then dissapear.', correct: false }

        ]
    },

    {
        question: 'What is the Bohr model of the atom.',
        answers: [
            { text: 'Atoms are made of indivisible spheres.', correct: false },
            { text: 'Electrons in an atom orbit in fixed energy levels.', correct: true },
            { text: 'An atom is ball of positive charge with electrons distributed inside.', correct: false },
            { text: 'An atom has a nucleus with orbiting electrons.', correct: false }

        ]
    },

    {
        question: 'What is specific heat capacity?',
        answers: [
            { text: 'The temperature required to raise the energy of 1kg of a substance by 1 degree', correct: false },
            { text: 'The energy required to raise the temperature of 10kg of a substance by 1 degree', correct: false },
            { text: 'The energy required to raise the temperature of 1kg of a substance by 1 degree', correct: true },
            { text: 'The capacity of an object to specifically store heat.', correct: false }

        ]
    },

    {
        question: 'How do gas particles move?',
        answers: [
            { text: 'Randomly', correct: true },
            { text: 'Slowly', correct: false },
            { text: 'Quickly', correct: false },
            { text: 'Happily', correct: false }

        ]
    },

    {
        question: 'What is pressure?',
        answers: [
            { text: 'Area/Force', correct: false },
            { text: 'Force/Area', correct: true },
            { text: 'Mass * Acceleration', correct: false },
            { text: 'Mass * Velocity', correct: false }

        ]
    },

    {
        question: 'How does the random motion of a gas exert pressure in a container?',
        answers: [
            { text: 'Particles collide with other gas particles.', correct: false },
            { text: 'Particles vibrate with zero-point energy.', correct: false },
            { text: 'Particles collide with the walls of the container, exerting a force over an area.', correct: true },
            { text: 'There is no random motion', correct: false }

        ]
    },

    {
        question: 'What happens to pressure as you ascend into the atmosphere?',
        answers: [
            { text: 'Changes randomly', correct: false },
            { text: 'Remains constant', correct: false },
            { text: 'Decreases', correct: true },
            { text: 'Increases', correct: false }

        ]
    },

    {
        question: 'Why does pressure decrease with height?',
        answers: [
            { text: 'There are fewer particles above you.', correct: true },
            { text: 'There are more particles above you.', correct: false },
            { text: 'There is less gravity.', correct: false },
            { text: 'The temperature is decreasing.', correct: false }

        ]
    },

    {
        question: 'What happens to pressure when you dive deeper into the ocean?',
        answers: [
            { text: 'Changes randomly', correct: false },
            { text: 'Remains constant', correct: false },
            { text: 'Decreases', correct: false },
            { text: 'Increases', correct: true }

        ]
    },

    {
        question: 'Why does pressure decrease when you dive into the ocean?',
        answers: [
            { text: 'There are fewer particles above you.', correct: false },
            { text: 'There are more particles above you.', correct: true },
            { text: 'There is less gravity.', correct: false },
            { text: 'The temperature is increasing.', correct: false }

        ]
    },

    {
        question: 'Explain how objects float?',
        answers: [
            { text: 'Upthrust > weight.', correct: false },
            { text: 'Upthrust < weight.', correct: false },
            { text: 'Upthrust = weight.', correct: true },
            { text: 'Upthrust > gravity.', correct: false }

        ]
    },

]