const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughtDescriptions = [
  "Hummus is my favorite snack",
  "I'd love to go to the mountains this weekend",
  "I wonder where I can find a good barber",
  "There are only so many ways you can wear a shoe",
  "Zainab Johnson is one of my favorite comedians",
  "Sometimes you have to cook chicken and sometimes you have to cook beef",
  "I can't wait to go to my next concert",
  "I'm trying pistachip creamer and it's delicious",
  "I need to read more books",
  "New York is not the worst city in the world",
  "Let's celebrate our graduations",
  "Whenever I'm in water, I feel like a fish",
  "Hiking can be euphoric or torturous",
  "Music is a balm for the soul",
  "Traveling is my favorite hobby",
  "It's hard to choose between the mountains and the beach",
  "Green juice can be magical",
  "YouTube has a lot of information",
];

const reactionBodies = [
  "I like that",
  "I hate that",
  "Maybe I should agree",
  "LOL",
  "WHy would you say this?",
  "I love reading these thoughts",
  "Immediately no",
  "I don't know what to think about this",
  "You won me over",
  "Love this",
  "hehe 😅",
  "There's nothing worst",
  "I'm ambivalent",
  "That's crazy",
  "That's very honest",
];

// Get a random item given an array
export const getRandomArrItem = (arr: any) =>
  arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
export const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts
export const getRandomThought = () => getRandomArrItem(thoughtDescriptions);

// Function to generate random reactions
export const getRandomReactions = (int: number) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactionBodies),
      username:
        getRandomName().split(" ")[0].toLowerCase() +
        Math.floor(Math.random() * 100),
    });
  }
  return results;
};
