const Translator = require('./translator');
const testData = require('../assets/testdata');

// translator.translate('test');

function test() {
  for (let i = 0; i < testData.length; i++) {
    const originalWord = testData[i];
    const translator = new Translator(originalWord);

    console.log(`${originalWord} kontti => ${translator.translate()}`);
  }
}

test();
