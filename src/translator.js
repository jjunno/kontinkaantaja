console.log('Translator.js');

function Translator() {
  this.kontti = 'kontti';
  this.vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'å'];

  Translator.prototype.translate = function (originalWord) {
    const newWord = this.replace(originalWord);
    return newWord;
  };
  Translator.prototype.replace = function (originalWord) {
    const charsFromKontti = this.kontti.slice(0, 2); // kontti -> ko
    const charsFromOriginalWord = originalWord.slice(0, 2); // sana -> sa

    // sana -> kona
    let mutatedOriginalWord =
      charsFromKontti +
      originalWord.substr(
        originalWord.length -
          (originalWord.length - charsFromOriginalWord.length)
      );

    // kontti -> santti (with example originalWord 'sana')
    let mutatedKontti =
      charsFromOriginalWord +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - charsFromKontti.length)
      );

    return mutatedOriginalWord + mutatedKontti;
  };
}

module.exports = Translator;
