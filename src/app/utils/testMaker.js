export function createNumberTest(questionNumber, allAvailableNumberData) {
  const step = Math.floor(allAvailableNumberData.length / questionNumber);
  const questions = [];
  let currentIndex = 0;
  for (let i = 0; i < questionNumber; i++) {
    currentIndex += Math.floor(Math.random() * step);
    questions.push(allAvailableNumberData[currentIndex]);
  }
  return questions;
}
