const Translator = require('./translator');
const Validator = require('./validator');
const testData = require('../assets/testdata');

function test() {
  for (let i = 0; i < testData.length; i++) {
    const originalWord = testData[i].toLowerCase();
    const validator = new Validator(originalWord);
    if (!validator.validate(originalWord)) {
      console.log('Validation error');
      continue;
    }
    const translator = new Translator(originalWord);

    console.log(`${originalWord} => ${translator.translate()}`);
  }
}

test();
