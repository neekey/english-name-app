export function createNumberTest(questionNumber, allAvailableNumberData) {
  const step = Math.floor(allAvailableNumberData.length / questionNumber);
  const questions = [];
  for (let i = 0; i < questionNumber; i++) {
    questions.push(allAvailableNumberData[Math.floor(Math.random() * step) + step * i]);
  }
  return questions;
}
