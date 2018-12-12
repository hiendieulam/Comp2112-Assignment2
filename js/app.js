const money = [
  { level: '1', amount: '100' },
  { level: '2', amount: '200' },
  { level: '3', amount: '300' },
  { level: '4', amount: '500' },
  { level: '5', amount: '1,000' },
  { level: '6', amount: '2,000' },
  { level: '7', amount: '4,000' },
  { level: '8', amount: '8,000' },
  { level: '9', amount: '16,000' },
  { level: '10', amount: '25,000' },
  { level: '11', amount: '50,000' },
  { level: '12', amount: '100,000' },
  { level: '13', amount: '250,000' },
  { level: '14', amount: '500,000' },
  { level: '15', amount: '1,000,000' }
];

const musicRound1 = new Audio('sounds/Round1.ogg');
const musicRound2 = new Audio('sounds/Round2.ogg');
const musicRound3 = new Audio('sounds/Round3.ogg');
const soundTheme = new Audio('sounds/Theme.mp3');
const soundAskAudience = new Audio('sounds/AskAudience.ogg');
const soundFifty50 = new Audio('sounds/Fifty50.ogg');
const soundPhoneFriend = new Audio('sounds/PhoneFriend.ogg');
const soundFinalAnswer = new Audio('sounds/FinalAnswer.ogg');
const soundNextQuestion = new Audio('sounds/NextQuestion.ogg');
const soundRightShort = new Audio('sounds/RightAnswerShort.ogg');
const soundWinner = new Audio('sounds/Winner.ogg');
const soundRightAnswer = new Audio('sounds/RightAnswer.ogg');
const soundWrongAnswer = new Audio('sounds/WrongAnswer.ogg');
const soundFinalwinner = new Audio('sounds/FinalWinner.wav');

const app = new Vue({
    el: '#app',
    data: {
     // message: questions[0].questions,
      index: -1,
      level: 14, // Will work backwards since our list is from top down
      level1: 6,
      level2: 11,
      items: money, // Money iterm list for each answer
  	  questions:[], // Question list
	  answers:[], // Answer list
	  music: musicRound1, // Sound
	  correct_answer:'', // Right answer for each question
	  speaker: new SpeechSynthesisUtterance(), // Initialize sound object
	  fiftyPressed: false, //Flag Use the 50:50 helper
	  playPressed: false,
	  messageGame: "",
	  resultGame:"",
	  useAskAudience:false // Use the player's help function
    },
	// Load data first -  this function will run auto when open HTML page

		// Do the loop
    computed: {
     reverseQs() {
      return _.reverse(this.questions);
     }
    },
	methods: {
		// Pushing question data from JSON https://opentdb.com/api.php?amount=15 return
		async getJSON() {
		  const endpoint = 'https://opentdb.com/api.php?amount=15'; // Get web address return json string
		  const ajaxQs = [];
		  let questionsLevelsMoney = []; // A list of bonus levels for each question

		  const response = await fetch(endpoint);
		  const data = await response.json(); // Struture of table

		  ajaxQs.push(...data.results);

		  questionsLevelsMoney = ajaxQs.map((q, idx) => ({
			level: money[idx].level, // Bonus level
			amount: money[idx].amount, // Bonus amount
			...q
		  }));

		  this.questions.push(...questionsLevelsMoney); // Push the list of bonus strutures into the question list
		},
		// QUESTIONS SETUP
		// Initialize question
		shuffle() {
		  // Make one array with all the answers in it
		  const tempArr = [
			this.currentQ().correct_answer,
			...this.currentQ().incorrect_answers
		  ];
		  // Shuffle the array
		  const shuffledArr = _.shuffle(tempArr);
		  this.answers = [...shuffledArr];
		},

		// Initialize Object to read text on the browser
		// MAKE BROWSER SPEAK SETUP
		setupSpeechSynthesis() {
		  this.speaker.lang = 'en-GB';
		  this.speaker.rate = 1.0;
		  this.speaker.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female');
		},

		// Keep Albert's code
		// Oject speaker will read current question
		currentQ() {
		  return this.questions[this.index];
		},
		// Fix error display text on HTML
		unescapedQ() {
		  return this.unescape(this.currentQ().question);
		},
		// Oject speaker will read answer content is A
		AnswersA() {
		  return this.unescape(this.answers[0]);
		},
		// Oject speaker will read answer content is B
		AnswersB() {
		  return this.unescape(this.answers[1]);
		},
		// Oject speaker will read answer content is C
		AnswersC() {
		  return this.unescape(this.answers[2]);
		},
		// Oject speaker will read answer content is D
		AnswersD() {
		  return this.unescape(this.answers[3]);
		},


		unescape(str) {

		  //console.log(str);
		  try{
			  return _.unescape(str.replace(/039/gi, '39'));
		  }catch(err){ return "";}

		},

		SpeakerQuestion() {
		  // Check first if user didn't silence the host's voice
		  if (this.speaker) {
			// Stop speaking in case it's still speaking
			speechSynthesis.cancel();

			// Reading question and answer options
			this.speaker.text = `${this.unescapedQ()} Is it,
			A, ${this.AnswersA()}.
			B, ${this.AnswersB()}.
			C, ${this.AnswersC()}.
			or D, ${this.AnswersD()}.
			`;
			speechSynthesis.speak(this.speaker);
		  }
		  // Get the correct answer and teamporary correct_answer
		  this.correct_answer=this.unescape(this.currentQ().correct_answer);
		  console.log(this.unescape(this.currentQ().correct_answer));
		},

		// Function answer the question on HTML
		AnswerSubmit(event) {
		  console.log(event.target);
		  console.log("correct_answer:" + this.correct_answer);
		  if (event.target.dataset.picked === this.correct_answer) { // If correct answer
			this.NextQuestion(); // Play next sound
  		    this.index++; // Increase the question 1


			// If you answer level = 15 then you win
			if (this.index>=this.level){
				  this.messageGame='YOU WON MILLION!';
				  speechSynthesis.cancel();
				  this.music.pause();
				  soundFinalwinner.play();
			}else if (this.index == this.level1 ||this.index == this.level2){
        //this.music.pause();
        soundFinalwinner.play();
        this.shuffle(); // Get the next question
				this.SpeakerQuestion();
      }
      else{
				// Execute the next question
				this.shuffle(); // Get the next question
				this.SpeakerQuestion(); // Read the question
			}
		  } else {
			this.gameOver(); // Stop if wrong game
		  }
		},

		// Play next sound Function
		NextQuestion() {
		  speechSynthesis.cancel();
		  this.music.pause();
		  soundNextQuestion.play();
		},

		gameOver() {
		  this.resultGame='gameover';
		  this.messageGame='GAME OVER!';
		  speechSynthesis.cancel();
		  this.music.pause();
		  soundWrongAnswer.play();
		},

		// The 50:50 helper
		fiftyHelp: function(){
			// Get index the right anwsers
			var index = this.answers.indexOf(this.correct_answer);
			// Keep the right answers and cancel the wrong answers
		    this.answers.splice(0, 4, this.answers[index], this.answers[this.getRandomInt(0, 3, index)]);
		    // Flag setting used 50:50
			this.fiftyPressed = true;
			speechSynthesis.cancel();
			// Reading the anwsers again.
			this.speaker.text = `A, ${this.AnswersA()}.B, ${this.AnswersB()}`;
			speechSynthesis.speak(this.speaker);
        },

		// Random and un-grab function
		getRandomInt: function(min, max, used) {
			var ran=Math.floor(Math.random() * (max - min + 1)) + min;
			if(ran==used){
				ran = this.getRandomInt(min, max, used);
			}
			return ran;
		},

		// Function started playing
		async playGame(){
			this.index=0;
			this.playPressed=true;
      soundTheme.play();
			await this.getJSON(); // Step1 : get data json from web
			this.shuffle(); // Step2: Initialize answer list
			this.setupSpeechSynthesis(); // Step3: Initialize question reading list
			this.SpeakerQuestion(); // step4: sound for text at the first question with index = 0

			// Initialize keypress
			window.addEventListener("keypress", function(e) {
				console.log(`button[data-key1="${e.keyCode}"]`);
			  var keypress1 = document.querySelector(`button[data-key1="${e.keyCode}"]`); // Take the keys A, B, C, D
			  var keypress2 = document.querySelector(`button[data-key2="${e.keyCode}"]`); // Take the keys a, b, c, d
			  if (!keypress1 && !keypress2) return;

			  if (keypress1) keypress1.click();
			  if (keypress2) keypress2.click();

			}.bind(this));
		},

		// Ask for feedback at the studio
		AskAudience: function(){
			this.useAskAudience = true;
		}


	},

})
