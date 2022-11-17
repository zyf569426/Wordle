import wordBankMediumPath from "./wordle-bank-medium.txt";
import wordBankHardPath from "./wordle-bank-hard.txt";
const MEDIUM_LEVEL_PATH = '/game/medium';
const HARD_LEVEL_PATH = '/game/hard';

export const boardMedium = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""]
];

export const boardHard = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""]
];

export const generateWordSet = async () => {
  let wordSetMedium;
  let todaysWordMedium;
  let wordSetHard;
  let todaysWordHard;

  await fetch(wordBankMediumPath)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWordMedium = wordArr[Math.floor(Math.random() * wordArr.length)]
      wordSetMedium = new Set(wordArr)
    });

  await fetch(wordBankHardPath)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWordHard = wordArr[Math.floor(Math.random() * wordArr.length)]
      wordSetHard = new Set(wordArr)
    });

  return { wordSetMedium, todaysWordMedium, wordSetHard, todaysWordHard };
}