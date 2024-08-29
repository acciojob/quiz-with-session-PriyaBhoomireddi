const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const quizElement = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

// Load saved progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Render the quiz questions and options
function renderQuestions() {
  quizElement.innerHTML = '';
  questions.forEach((question, i) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    question.choices.forEach((choice, j) => {
      const choiceLabel = document.createElement('label');
      const choiceInput = document.createElement('input');
      choiceInput.setAttribute('type', 'radio');
      choiceInput.setAttribute('name', `question-${i}`);
      choiceInput.setAttribute('value', choice);

      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      choiceInput.addEventListener('change', () => {
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
    });

    quizElement.appendChild(questionDiv);
  });
}

// Calculate and display the user's score
function calculateScore() {
  let score = 0;
  userAnswers.forEach((answer, i) => {
    if (answer === questions[i].answer) {
      score++;
    }
  });

  localStorage.setItem('score', score);
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
}

// Event listener for the submit button
submitButton.addEventListener('click', () => {
  calculateScore();
});

// Render the quiz on page load
renderQuestions();

// Display score if it exists in local storage
const storedScore = localStorage.getItem('score');
if (storedScore !== null) {
  scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}`;
}
