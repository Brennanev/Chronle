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
  ),
  createTriviaQuestion(
    "largest-continent",
    "What is the largest continent by land area?",
    ["Africa", "Asia", "North America", "Europe"],
    "Asia",
    "Asia is the largest continent by land area and population."
  ),
  createTriviaQuestion(
    "water-boils-celsius",
    "At what temperature does water boil at sea level in Celsius?",
    ["90", "95", "100", "110"],
    "100",
    "Water boils at 100 degrees Celsius at standard sea-level pressure.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "capital-japan",
    "What is the capital of Japan?",
    ["Kyoto", "Osaka", "Tokyo", "Sapporo"],
    "Tokyo",
    "Tokyo is the capital city of Japan."
  ),
  createTriviaQuestion(
    "super-bowl-league",
    "Which sport is the Super Bowl associated with?",
    ["Baseball", "Basketball", "American football", "Ice hockey"],
    "American football",
    "The Super Bowl is the championship game of the NFL in American football.",
    "Sports"
  ),
  createTriviaQuestion(
    "great-wall-country",
    "The Great Wall is located in which country?",
    ["India", "China", "Mongolia", "Japan"],
    "China",
    "The Great Wall is one of China's most famous historic landmarks."
  ),
  createTriviaQuestion(
    "h2o-common-name",
    "What is the common name for H2O?",
    ["Oxygen", "Hydrogen", "Salt", "Water"],
    "Water",
    "H2O is the chemical formula for water.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "beatles-drummer",
    "Who was the drummer for The Beatles?",
    ["John Lennon", "George Harrison", "Ringo Starr", "Paul McCartney"],
    "Ringo Starr",
    "Ringo Starr was the drummer for The Beatles.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "american-independence-country",
    "The United States won independence from which country?",
    ["France", "Spain", "Britain", "Germany"],
    "Britain",
    "The United States won independence from Great Britain.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "largest-planet",
    "What is the largest planet in our solar system?",
    ["Saturn", "Jupiter", "Neptune", "Earth"],
    "Jupiter",
    "Jupiter is the largest planet in the solar system.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "nba-players-court",
    "How many players from one team are on the court at a time in basketball?",
    ["4", "5", "6", "7"],
    "5",
    "Each basketball team has five players on the court at one time.",
    "Sports"
  ),
  createTriviaQuestion(
    "frozen-sisters",
    "In Frozen, what is the name of Elsa's sister?",
    ["Anna", "Olaf", "Kristoff", "Sven"],
    "Anna",
    "Anna is Elsa's sister in Frozen.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "capital-australia",
    "What is the capital of Australia?",
    ["Sydney", "Melbourne", "Canberra", "Perth"],
    "Canberra",
    "Canberra is the capital of Australia."
  ),
  createTriviaQuestion(
    "first-president-usa",
    "Who was the first president of the United States?",
    ["Thomas Jefferson", "George Washington", "John Adams", "James Madison"],
    "George Washington",
    "George Washington was the first president of the United States.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "gas-plants-absorb",
    "Which gas do plants absorb from the atmosphere?",
    ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
    "Carbon dioxide",
    "Plants absorb carbon dioxide during photosynthesis.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "tennis-grand-slam-court",
    "Wimbledon is played on what surface?",
    ["Clay", "Hard court", "Grass", "Carpet"],
    "Grass",
    "Wimbledon is the only Grand Slam still played on grass.",
    "Sports"
  ),
  createTriviaQuestion(
    "marvel-hammer",
    "Which Marvel hero uses a hammer called Mjolnir?",
    ["Loki", "Thor", "Iron Man", "Hulk"],
    "Thor",
    "Thor is the Marvel hero most closely associated with Mjolnir.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "liberty-bell-city",
    "In which city is the Liberty Bell located?",
    ["Boston", "New York", "Philadelphia", "Washington, D.C."],
    "Philadelphia",
    "The Liberty Bell is located in Philadelphia, Pennsylvania.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "earth-layers-center",
    "What is at the center of the Earth?",
    ["Mantle", "Crust", "Outer core", "Inner core"],
    "Inner core",
    "The Earth's innermost layer is the inner core.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "soccer-players-field",
    "How many players does a soccer team have on the field during normal play?",
    ["9", "10", "11", "12"],
    "11",
    "A soccer team fields 11 players during normal play.",
    "Sports"
  ),
  createTriviaQuestion(
    "star-wars-father",
    "Who tells Luke Skywalker, 'I am your father'?",
    ["Obi-Wan Kenobi", "Yoda", "Darth Vader", "Emperor Palpatine"],
    "Darth Vader",
    "Darth Vader reveals himself as Luke's father in The Empire Strikes Back.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "mississippi-flows-into",
    "The Mississippi River flows into which body of water?",
    ["Atlantic Ocean", "Pacific Ocean", "Gulf of Mexico", "Great Lakes"],
    "Gulf of Mexico",
    "The Mississippi River empties into the Gulf of Mexico.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "human-body-largest-organ",
    "What is the largest organ in the human body?",
    ["Liver", "Brain", "Skin", "Lung"],
    "Skin",
    "The skin is the body's largest organ.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "olympics-motto-faster",
    "Which phrase is associated with the Olympic motto?",
    ["Higher, farther, stronger", "Faster, higher, stronger", "Swifter, prouder, stronger", "Faster, longer, stronger"],
    "Faster, higher, stronger",
    "The Olympic motto is 'Faster, Higher, Stronger.'",
    "Sports"
  ),
  createTriviaQuestion(
    "disney-lion-cub",
    "What is the name of Simba's father in The Lion King?",
    ["Scar", "Mufasa", "Timon", "Rafiki"],
    "Mufasa",
    "Mufasa is Simba's father in The Lion King.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "state-grand-canyon",
    "The Grand Canyon is in which U.S. state?",
    ["Colorado", "Nevada", "Arizona", "Utah"],
    "Arizona",
    "The Grand Canyon is in northern Arizona.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "closest-star-earth",
    "What is the closest star to Earth?",
    ["Polaris", "The Sun", "Sirius", "Alpha Centauri"],
    "The Sun",
    "The Sun is the closest star to Earth.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "baseball-strikes-out",
    "How many strikes make a strikeout in baseball?",
    ["2", "3", "4", "5"],
    "3",
    "A batter strikes out after three strikes.",
    "Sports"
  ),
  createTriviaQuestion(
    "toy-story-cowboy",
    "What is the name of the cowboy in Toy Story?",
    ["Buzz", "Woody", "Rex", "Andy"],
    "Woody",
    "Woody is the cowboy toy in Toy Story.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "declaration-city",
    "In which city was the Declaration of Independence adopted?",
    ["New York", "Boston", "Philadelphia", "Baltimore"],
    "Philadelphia",
    "The Declaration of Independence was adopted in Philadelphia.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "blood-pump-organ",
    "Which organ pumps blood through the body?",
    ["Lungs", "Liver", "Heart", "Kidneys"],
    "Heart",
    "The heart pumps blood through the body's circulatory system.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "golf-hole-standard",
    "How many holes are in a standard round of golf?",
    ["9", "12", "18", "24"],
    "18",
    "A standard round of golf is 18 holes.",
    "Sports"
  ),
  createTriviaQuestion(
    "hogwarts-headmaster",
    "Who is the headmaster of Hogwarts for most of the Harry Potter series?",
    ["Snape", "Dumbledore", "McGonagall", "Hagrid"],
    "Dumbledore",
    "Albus Dumbledore is Hogwarts headmaster for most of the series.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "white-house-city",
    "The White House is located in which city?",
    ["New York City", "Washington, D.C.", "Philadelphia", "Chicago"],
    "Washington, D.C.",
    "The White House is located in Washington, D.C.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "planet-rings-most-famous",
    "Which planet is most famous for its rings?",
    ["Mars", "Saturn", "Neptune", "Venus"],
    "Saturn",
    "Saturn is the planet best known for its prominent ring system.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "tennis-score-zero",
    "In tennis, what word is used for a score of zero?",
    ["Nil", "Blank", "Love", "Duck"],
    "Love",
    "In tennis, a score of zero is called love.",
    "Sports"
  ),
  createTriviaQuestion(
    "spongebob-pet",
    "What kind of animal is Gary in SpongeBob SquarePants?",
    ["Fish", "Cat", "Snail", "Crab"],
    "Snail",
    "Gary is SpongeBob's pet sea snail.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "rushmore-faces-count",
    "How many presidents are carved on Mount Rushmore?",
    ["3", "4", "5", "6"],
    "4",
    "Four presidents are carved on Mount Rushmore.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "hardest-natural-substance",
    "What is the hardest natural substance?",
    ["Iron", "Diamond", "Quartz", "Granite"],
    "Diamond",
    "Diamond is the hardest naturally occurring substance.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "super-bowl-roman",
    "Which Roman numeral was used for the 2024 Super Bowl?",
    ["LVII", "LVIII", "LIX", "LX"],
    "LVIII",
    "Super Bowl 58 used the Roman numeral LVIII.",
    "Sports"
  ),
  createTriviaQuestion(
    "batman-city",
    "Batman is most closely associated with which fictional city?",
    ["Metropolis", "Star City", "Gotham City", "Central City"],
    "Gotham City",
    "Batman protects Gotham City.",
    "Pop Culture"
  ),
  createTriviaQuestion(
    "lincoln-memorial-state",
    "The Lincoln Memorial is in which U.S. district or state?",
    ["Virginia", "Maryland", "Washington, D.C.", "Pennsylvania"],
    "Washington, D.C.",
    "The Lincoln Memorial is in Washington, D.C.",
    "U.S. History"
  ),
  createTriviaQuestion(
    "sun-rises-direction",
    "In which direction does the Sun rise?",
    ["North", "South", "East", "West"],
    "East",
    "The Sun appears to rise in the east due to Earth's rotation.",
    "Science & Inventions"
  ),
  createTriviaQuestion(
    "soccer-goalie-hands",
    "Which player is generally allowed to use their hands in soccer?",
    ["Center back", "Forward", "Goalkeeper", "Winger"],
    "Goalkeeper",
    "The goalkeeper is generally allowed to use their hands within the penalty area.",
    "Sports"
  ),
  createTriviaQuestion(
    "wizard-of-oz-road",
    "What color is the road Dorothy follows in The Wizard of Oz?",
    ["Silver", "Gold", "Yellow", "Red"],
    "Yellow",
    "Dorothy follows the Yellow Brick Road in The Wizard of Oz.",
    "Pop Culture"
  )
];
