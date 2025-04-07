import db from "../config/connection.js";
import { User, Thought } from "../models/index.js";
import cleanDB from "./cleanDB.js";
import { getRandomName, getRandomThought } from "./data.js";

try {
  await db();
  await cleanDB();

  const users = [];
  const thoughts = [];

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(" ")[0];
    const username = `${first}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;
    const email = `${username}@example.com`;

    users.push({ username, email });
  }

  const userData = await User.create(users);

  for (let i = 0; i < 15; i++) {
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { _id: userId, username } = userData[randomUserIndex];

    const thoughtText = getRandomThought();

    thoughts.push({ thoughtText, username, userId });
  }

  const thoughtData = await Thought.create(thoughts);

  for (const thought of thoughtData) {
    await User.findOneAndUpdate(
      { _id: (thought as any).userId },
      { $push: { thoughts: thought._id } }
    );
  }

  for (let i = 0; i < userData.length; i++) {
    const friendCount = Math.floor(Math.random() * 3) + 1;
    const friendIndices = new Set();

    while (friendIndices.size < friendCount) {
      const randomIndex = Math.floor(Math.random() * userData.length);
      if (randomIndex !== i) {
        friendIndices.add(randomIndex);
      }
    }

    const friendIds = Array.from(friendIndices).map(
      (index) => userData[index as number]._id
    );

    await User.findOneAndUpdate(
      { _id: userData[i]._id },
      { $addToSet: { friends: { $each: friendIds } } }
    );
  }

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
} catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
}
