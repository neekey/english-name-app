function shuffle(arr) {
  const array = [...arr];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function createNumberTest(questionNumber, allAvailableNumberData, highest = 1000000) {
  const totalLength = allAvailableNumberData.length - 1;
  const questions = [];
  while (questions.length < questionNumber) {
    const nextNumber = allAvailableNumberData[Math.floor(Math.random() * totalLength)];
    if (nextNumber < highest && !questions.includes(nextNumber)) {
      questions.push(nextNumber);
    }
  }
  return shuffle(questions);
}
