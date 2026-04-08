import type { Category, TriviaQuestion } from "@/lib/types";

function createTriviaQuestion(
  id: string,
  prompt: string,
  choices: [string, string, string, string],
  answer: string,
  explanation: string,
  category: Category = "Mixed"
): TriviaQuestion {
  return {
    id,
    prompt,
    choices,
    answer,
    explanation,
    category
  };
}

export const triviaQuestions: TriviaQuestion[] = [
  createTriviaQuestion(
    "planet-red",
    "Which planet is known as the Red Planet?",
    ["Venus", "Mars", "Jupiter", "Mercury"],
    "Mars",
    "Mars is called the Red Planet because iron oxide on its surface gives it a reddish color.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "longest-river",
    "Which river is usually listed as the longest in the world?",
    ["Amazon", "Yangtze", "Nile", "Mississippi"],
    "Nile",
    "The Nile is traditionally listed as the world's longest river, though the Amazon is often debated."
  ),
  createTriviaQuestion(
    "mona-lisa-artist",
    "Who painted the Mona Lisa?",
    ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
    "Leonardo da Vinci",
    "Leonardo da Vinci painted the Mona Lisa, one of the most famous works in art history.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "largest-ocean",
    "What is the largest ocean on Earth?",
    ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    "Pacific Ocean",
    "The Pacific Ocean is the largest and deepest ocean on Earth."
  ),
  createTriviaQuestion(
    "dna-meaning",
    "What does DNA stand for?",
    ["Deoxyribonucleic acid", "Dynamic nuclear acid", "Dual nitrogen array", "Deoxynitric acid"],
    "Deoxyribonucleic acid",
    "DNA stands for deoxyribonucleic acid, the molecule that carries genetic information.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "hogwarts-house-harry",
    "Which Hogwarts house is Harry Potter sorted into?",
    ["Slytherin", "Gryffindor", "Ravenclaw", "Hufflepuff"],
    "Gryffindor",
    "Harry Potter is sorted into Gryffindor at Hogwarts.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "capital-canada",
    "What is the capital city of Canada?",
    ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    "Ottawa",
    "Ottawa is the capital city of Canada."
  ),
  createTriviaQuestion(
    "chemical-symbol-gold",
    "What is the chemical symbol for gold?",
    ["Au", "Ag", "Gd", "Go"],
    "Au",
    "Gold's chemical symbol is Au, from the Latin word aurum.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "beatles-members",
    "How many members were in The Beatles?",
    ["Three", "Four", "Five", "Six"],
    "Four",
    "The Beatles had four members: John Lennon, Paul McCartney, George Harrison, and Ringo Starr.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "basketball-points-line",
    "How many points is a standard free throw worth in basketball?",
    ["1", "2", "3", "4"],
    "1",
    "A made free throw is worth one point in basketball.",
    "Sports"
  ),
  createTriviaQuestion(
    "pyramids-country",
    "The Great Pyramids are located in which country?",
    ["Jordan", "Egypt", "Greece", "Turkey"],
    "Egypt",
    "The Great Pyramids of Giza are located in Egypt."
  ),
  createTriviaQuestion(
    "largest-mammal",
    "What is the largest mammal on Earth?",
    ["African elephant", "Blue whale", "Giraffe", "Hippopotamus"],
    "Blue whale",
    "The blue whale is the largest mammal, and the largest animal known to have ever lived.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "super-mario-creator",
    "Which company created Super Mario?",
    ["Sega", "Sony", "Nintendo", "Capcom"],
    "Nintendo",
    "Nintendo created Super Mario, one of the most recognizable characters in gaming.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "statue-liberty-gift",
    "The Statue of Liberty was a gift from which country?",
    ["Italy", "France", "Spain", "England"],
    "France",
    "France gave the Statue of Liberty to the United States.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "human-heart-chambers",
    "How many chambers does the human heart have?",
    ["2", "3", "4", "5"],
    "4",
    "The human heart has four chambers: two atria and two ventricles.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "soccer-world-cup-frequency",
    "How often is the FIFA World Cup held?",
    ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
    "Every 4 years",
    "The men's FIFA World Cup is held every four years.",
    "Sports"
  ),
  createTriviaQuestion(
    "romeo-juliet-author",
    "Who wrote Romeo and Juliet?",
    ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    "William Shakespeare",
    "William Shakespeare wrote Romeo and Juliet.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "largest-desert",
    "What is the largest hot desert in the world?",
    ["Gobi", "Kalahari", "Sahara", "Arabian"],
    "Sahara",
    "The Sahara is the largest hot desert in the world."
  ),
  createTriviaQuestion(
    "us-flag-stars",
    "How many stars are on the U.S. flag?",
    ["48", "49", "50", "51"],
    "50",
    "The U.S. flag has 50 stars, one for each state.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "speed-light-unit",
    "In physics, what letter is commonly used to represent the speed of light?",
    ["g", "h", "c", "v"],
    "c",
    "The speed of light is commonly represented by the letter c.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "olympic-rings-count",
    "How many rings are on the Olympic flag?",
    ["4", "5", "6", "7"],
    "5",
    "The Olympic flag has five interlocking rings.",
    "Sports"
  ),
  createTriviaQuestion(
    "friends-coffee-shop",
    "What is the name of the coffee shop in Friends?",
    ["Central Brew", "Coffee House", "Central Perk", "Mocha Spot"],
    "Central Perk",
    "The main coffee shop in Friends is Central Perk.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "largest-us-state",
    "What is the largest U.S. state by area?",
    ["Texas", "California", "Alaska", "Montana"],
    "Alaska",
    "Alaska is the largest U.S. state by area.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "instrument-keys-pedals",
    "Which instrument usually has 88 keys?",
    ["Organ", "Accordion", "Piano", "Harpsichord"],
    "Piano",
    "A standard piano has 88 keys.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "smallest-prime",
    "What is the smallest prime number?",
    ["0", "1", "2", "3"],
    "2",
    "Two is the smallest prime number and the only even prime.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "baseball-innings",
    "How many innings are in a standard baseball game?",
    ["7", "8", "9", "10"],
    "9",
    "A standard baseball game is scheduled for nine innings.",
    "Sports"
  ),
  createTriviaQuestion(
    "language-brazil",
    "What is the official language of Brazil?",
    ["Spanish", "Portuguese", "French", "English"],
    "Portuguese",
    "Portuguese is the official language of Brazil."
  ),
  createTriviaQuestion(
    "earth-natural-satellite",
    "What is Earth's natural satellite?",
    ["Europa", "The Moon", "Titan", "Io"],
    "The Moon",
    "Earth's natural satellite is the Moon.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "nfl-touchdown",
    "How many points is a touchdown worth before the extra point attempt?",
    ["5", "6", "7", "8"],
    "6",
    "A touchdown is worth six points before any extra point or two-point conversion.",
    "Sports"
  ),
  createTriviaQuestion(
    "pixar-lamp",
    "What type of object is in Pixar's logo animation?",
    ["Robot", "Desk lamp", "Rocket", "Toy car"],
    "Desk lamp",
    "Pixar's logo animation features a desk lamp inspired by Luxo Jr.",
    "Pop Culture"
  )
];
