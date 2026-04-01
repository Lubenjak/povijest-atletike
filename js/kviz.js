const quizData = [
  {
    question: "Koji sportaš drži svjetski rekord na 100 metara?",
    options: ["Carl Lewis", "Justin Gatlin", "Usain Bolt", "Maurice Greene"],
    correct: 2,
  },
  {
    question: "Koje godine su održane prve moderne Olimpijske igre?",
    options: ["1900.", "1896.", "1904.", "1912."],
    correct: 1,
  },
  {
    question: "Koliko iznosi svjetski rekord Usaina Bolta na 200m?",
    options: [
      "19.32 sekundi",
      "19.91 sekundi",
      "19.22 sekundi",
      "19.19 sekundi",
    ],
    correct: 3,
  },
  {
    question: "Koja nije bacačka disciplina u atletici?",
    options: [
      "Bacanje koplja",
      "Bacanje motke",
      "Bacanje kugle",
      "Bacanje diska",
    ],
    correct: 1,
  },
  {
    question: "Iz koje zemlje je Usain Bolt?",
    options: ["SAD", "Trinidad i Tobago", "Jamajka", "Kanada"],
    correct: 2,
  },
  {
    question: "Koja je najduža standardna atletska disciplina na Olimpijadi?",
    options: ["Maraton", "10.000 m", "50 km hodanje", "3000 m prepreke"],
    correct: 2,
  },
  {
    question: "Tko je aktualni svjetski rekorder u skoku u vis?",
    options: [
      "Mutaz Essa Barshim",
      "Ivan Ukhov",
      "Javier Sotomayor",
      "Derek Drouin",
    ],
    correct: 2,
  },
  {
    question: "Koliko olimpijskih zlatnih medalja osvojio je Usain Bolt?",
    options: ["6", "9", "7", "8"],
    correct: 3,
  },
  {
    question: "Koja disciplina spada u skakačke?",
    options: ["400m prepone", "Skok u dalj", "Bacanje kugle", "Maraton"],
    correct: 1,
  },
  {
    question: "Kada je osnovana Međunarodna atletska federacija (IAAF)?",
    options: ["1896.", "1921.", "1912.", "1908."],
    correct: 2,
  },
  {
    question: "Koji atletičar je poznat kao 'Kralj sprinta'?",
    options: ["Jesse Owens", "Carl Lewis", "Maurice Greene", "Usain Bolt"],
    correct: 3,
  },
  {
    question: "Koja je dužina maratonske trke?",
    options: ["42.915 km", "42 km", "42.195 km", "50 km"],
    correct: 2,
  },
  {
    question: "Tko je svjetski rekorder u bacanju koplja?",
    options: [
      "Thomas Röhler",
      "Andreas Thorkildsen",
      "Jan Železný",
      "Johannes Vetter",
    ],
    correct: 2,
  },
  {
    question: "Koja disciplina uključuje prepreke i vodu?",
    options: [
      "400 m prepone",
      "100 m prepone",
      "110 m prepone",
      "3000 m prepreke",
    ],
    correct: 3,
  },
  {
    question: "Koji je glavni element u bacanju kugle?",
    options: ["Brzina", "Izdržljivost", "Snaga i tehnika", "Koordinacija"],
    correct: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const quizResult = document.getElementById("quizResult");
const progressFill = document.getElementById("progressFill");

function loadQuestion() {
  answered = false;
  const question = quizData[currentQuestion];
  questionText.textContent = `Pitanje ${currentQuestion + 1}/${quizData.length}: ${question.question}`;

  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "quiz-option";
    optionElement.textContent = option;
    optionElement.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(optionElement);
  });

  updateProgress();
  nextButton.style.display = "none";
  quizResult.style.display = "none";
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const question = quizData[currentQuestion];
  const options = document.querySelectorAll(".quiz-option");

  options.forEach((option, index) => {
    option.onclick = null;
    if (index === question.correct) {
      option.classList.add("correct");
    } else if (index === selectedIndex) {
      option.classList.add("incorrect");
    }
  });

  if (selectedIndex === question.correct) {
    score++;
  }

  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("questionContainer").style.display = "none";
  nextButton.style.display = "none";

  const percentage = Math.round((score / quizData.length) * 100);
  let message = "";
  let emoji = "";

  if (percentage >= 90) {
    message = "Savršeno! Vi ste pravi stručnjak za atletiku!";
    emoji = "🏆";
  } else if (percentage >= 75) {
    message = "Odlično! Imate izvrsno znanje o atletici!";
    emoji = "🥇";
  } else if (percentage >= 60) {
    message = "Vrlo dobro! Dobro poznajete atletiku!";
    emoji = "🥈";
  } else if (percentage >= 40) {
    message = "Dobro! Postoji prostor za poboljšanje!";
    emoji = "🥉";
  } else {
    message = "Nastavite učiti o atletici!";
    emoji = "📚";
  }

  quizResult.innerHTML = `
                <h3>${emoji} Kviz završen!</h3>
                <p>Vaš rezultat: ${score}/${quizData.length} (${percentage}%)</p>
                <p>${message}</p>
            `;
  quizResult.style.display = "block";
  restartButton.style.display = "block";
  updateProgress();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  document.getElementById("questionContainer").style.display = "block";
  quizResult.style.display = "none";
  restartButton.style.display = "none";

  loadQuestion();
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  progressFill.style.width = `${progress}%`;
}

nextButton.onclick = nextQuestion;
restartButton.onclick = restartQuiz;

loadQuestion();
