const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

// Define questions array directly in the code
let questions = [
  {
    question: "Which of the following is the correct syntax of including a user defined header files in C++?",
    correct_answer: "#include “userdefined” ",
    incorrect_answers: ["#include [userdefined]", "#include <userdefined.h>", "#include <userdefined>"],
  },
  {
    question: " Which of the following is used for comments in C++?",
    correct_answer: "both // comment or /* comment */",
    incorrect_answers: ["// comment", " // comment */", "/* comment */"],
  },
  {
    question: "Which of the following user-defined header file extension used in c++?",
    correct_answer: "h” ",
    incorrect_answers: ["cpp", "hg", " hf"],
  },
  {
    question: " Which of the following is a correct identifier in C++?",
    correct_answer: "VAR_1234",
    incorrect_answers: ["$var_name", " 7VARNAME", "7var_name"],
  },
  {
    question: " Which of the following correctly declares an array in C++?",
    correct_answer: "int array[10];",
    incorrect_answers: ["int array;", " array array[10];", "array{10};"],
  },
  {
    question: " Which of the following is used to terminate the function declaration in C++?",
    correct_answer: "; ",
    incorrect_answers: ["]", ")", ":"],
  },
  {
    question: " Which keyword is used to define the macros in c++?",
    correct_answer: "#define",
    incorrect_answers: ["macro", " #macro", "define"],
  },
  {
    question: "The C++ code which causes abnormal termination/behaviour of a program should be written under _________ block.",
    correct_answer: "try ",
    incorrect_answers: ["finally", "throw", " catch"],
  },
  {
    question: "  Which of the following symbol is used to declare the preprocessor directives in C++?",
    correct_answer: "#",
    incorrect_answers: ["$", " ^", "*"],
  },
  {
    question: " What is the size of wchat_t is ?",
    correct_answer: "Depends on number of bits in system",
    incorrect_answers: ["2", " 4", "2 or 4"],
  },
  // Add more questions as needed
];

let time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
  const num = numQuestions.value,
    cat = category.value,
    diff = difficulty.value;
  loadingAnimation();

  setTimeout(() => {
    startScreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 1;
    showQuestion(questions[0]);
  }, 1000);
};

startBtn.addEventListener("click", startQuiz);

// Rest of your code...

// Rest of your code...


const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};


const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  if (score >= 5) {
    // Redirect to file1.html
    window.location.href = 'Intermediate.html';
} else{
    // Redirect to file2.html
    window.location.href = 'Beginners.html';
}
});

const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};




