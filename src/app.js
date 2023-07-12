const Translator = require('./translator');
const testData = require('../assets/testdata');

const translator = new Translator();

// translator.translate('test');

function test() {
  for (let i = 0; i < testData.length; i++) {
    const originalWord = testData[i];

    console.log(translator.translate(originalWord));
  }
}

test();
