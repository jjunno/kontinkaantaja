console.log('Translator.js');

function Translator(originalWord) {
  this.kontti = 'kontti';
  this.originalWord = originalWord;

  this.charsFromKontti = this.kontti.slice(0, 2); // kontti -> ko
  this.charsFromOriginalWord = this.originalWord.slice(0, 2); // sana -> sa

  this.vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'å'];

  Translator.prototype.translate = function () {
    if (this.beginsWithLongVowel()) {
      return this.mutateWithLongVowel();
    } else if (this.beginsWithDoubleVowel()) {
      return this.mutateWithDoubleVowel();
    } else {
      return this.mutateNormal();
    }
  };
  /**
   * @param {string} character
   * @returns {boolean}
   */
  Translator.prototype.isVowel = function (character) {
    return this.vowels.indexOf(character.toLowerCase()) !== -1;
  };
  /**
   * Does the original word begin with long vowel like 'aa', 'ii' etc.
   * @returns {boolean}
   */
  Translator.prototype.beginsWithLongVowel = function () {
    if (
      this.charsFromOriginalWord[0] == this.charsFromOriginalWord[1] &&
      this.isVowel(this.charsFromOriginalWord[0]) &&
      this.isVowel(this.charsFromOriginalWord[1])
    ) {
      return true;
    }
    return false;
  };
  /**
   * Does the original word begin with double vowel like 'ai', 'ou' etc.
   * @returns {boolean}
   */
  Translator.prototype.beginsWithDoubleVowel = function () {
    if (
      this.isVowel(this.charsFromOriginalWord[0]) &&
      this.isVowel(this.charsFromOriginalWord[1])
    ) {
      return true;
    }
    return false;
  };
  Translator.prototype.mutateWithLongVowel = function () {
    if (this.isVowel(chars[0]) && this.isVowel(chars[1])) {
      return true;
    }
    return false;
  };
  /**
   * The most basic mutation.
   * Example: sana kontti -> kona santti.
   *
   * @returns {string} mutated string
   */
  Translator.prototype.mutateNormal = function () {
    /**
     * Example: sana
     */
    // sana -> kona
    const mutatedOriginalWord =
      this.charsFromKontti +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length)
      );

    // kontti -> santti (with example originalWord 'sana')
    const mutatedKontti =
      this.charsFromOriginalWord +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );

    return mutatedOriginalWord + mutatedKontti;
  };
  /**
   * The original word begins with long vowel like aa, ii, etc.
   * Example: aatto kontti -> kootto antti.
   * @returns {string} mutated string
   */
  Translator.prototype.mutateWithLongVowel = function () {
    // aatto -> kootto
    const mutatedOriginalWord =
      'koo' +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length)
      );

    // kontti -> antti (with example originalWord 'aatto')
    const mutatedKontti =
      this.charsFromOriginalWord[0] +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );

    return mutatedOriginalWord + mutatedKontti;
  };
  /**
   * The original word begins with double vowel like au, ai, etc.
   * Example: auto kontti -> kouto antti.
   * @returns {string} mutated string
   */
  Translator.prototype.mutateWithDoubleVowel = function () {
    const mutatedOriginalWord =
      this.charsFromKontti +
      this.charsFromOriginalWord[1] +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length)
      );

    const mutatedKontti =
      this.charsFromOriginalWord[0] +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );

    return mutatedOriginalWord + mutatedKontti;
  };
}

module.exports = Translator;
