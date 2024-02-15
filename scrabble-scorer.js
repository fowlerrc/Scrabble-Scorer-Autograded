// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			totalPoints += +pointValue
		 }
 
	  }
	}
	return totalPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let playerWord = ''
function initialPrompt() {
   console.log("Let's play some scrabble!");
 playerWord = input.question("Enter a word: ");
//  let score = oldScrabbleScorer(playerWord)
//  console.log(score)
};

// {
//    1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// };

const simpleScorer = function(word){
   word = word.toUpperCase()
   let totalPoints = 0
   for (let i = 0; i < word.length; i++) {
      totalPoints += 1
   }
   return totalPoints
}

const vowelBonusPointStructure ={
      1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
      3: ['A', 'E', 'I', 'O', 'U'],
   };
   
const vowelBonusScorer = function (word) {
	word = word.toUpperCase();
	let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelBonusPointStructure) {
 
		 if (vowelBonusPointStructure[pointValue].includes(word[i])) {
			totalPoints += +pointValue
       }
 
	  }
	}
	return totalPoints;
 }

 let scrabbleScorer = function(word){
   word = word.toLowerCase()
   let totalPoints = 0
   for (let i = 0; i < word.length; i++) {
      totalPoints += newPointStructure[word[i]];
   }
   return totalPoints
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?')
   for (const i in scoringAlgorithms) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);  
   }
   let selectedAlgorithm = input.question("Enter 0, 1, or 2: ");
    return scoringAlgorithms[selectedAlgorithm]
}
console.log(scrabbleScorer);
function transform(object) {
   const newObject = {}
   for (const pointValue in object) {
      for (const letter of object[pointValue]) {
         newObject[letter.toLowerCase()] = +pointValue
      }
   }
   return newObject
};
console.log("Letters with score '4':", oldPointStructure['4']);
console.log("3rd letter within the key '4' array:", oldPointStructure['4'][2]);

let letters = oldPointStructure['8'];
console.log("Letters with score '8':", letters);
console.log("2nd letter within the key '8' array:", letters[1]);

let newPointStructure = transform(oldPointStructure);
console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.a);
console.log("letter j: ", newPointStructure.j);
console.log("letter z: ", newPointStructure["z"]);


function runProgram() {
   initialPrompt();
   const algorithm = scorerPrompt()
   const scores = algorithm.scoringFunction(playerWord)
   console.log(`Score for '${playerWord}': ${scores}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
