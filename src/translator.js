console.debug('Translator.js');

function Translator(originalWord) {
  this.kontti = 'kontti';
  this.originalWord = originalWord;

  this.charsFromKontti = this.kontti.slice(0, 2); // kontti -> ko
  this.charsFromOriginalWord = this.originalWord.slice(0, 2); // sana -> sa
  this.mutatedOriginalWord = null;
  this.mutatedKontti = null;

  this.vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'å'];

  Translator.prototype.translate = function () {
    if (this.beginsWithLongVowel()) {
      this.mutateWithLongVowel();
    } else if (this.beginsWithDoubleVowel()) {
      this.mutateWithDoubleVowel();
    } else if (this.beginsWithConsonantWithLongVowel()) {
      this.mutateConsonantWithLongVowel();
    } else {
      this.mutateNormal();
    }

    this.generalAdjustments();
    return this.mutatedOriginalWord + this.mutatedKontti;
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
  /**
   * Does the original word begin with a consonant followed with double vowel like 'aa', 'ii' etc.
   * @returns {boolean}
   */
  Translator.prototype.beginsWithConsonantWithLongVowel = function () {
    if (
      this.isVowel(this.charsFromOriginalWord[0]) == false &&
      this.isVowel(this.charsFromOriginalWord[1]) &&
      this.isVowel(this.originalWord[2]) &&
      this.charsFromOriginalWord[1] == this.originalWord[2]
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
    this.mutatedOriginalWord =
      this.charsFromKontti +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length)
      );

    // kontti -> santti (with example originalWord 'sana')
    this.mutatedKontti =
      this.charsFromOriginalWord +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );
  };
  /**
   * The original word begins with long vowel like aa, ii, etc.
   * Example: aatto kontti -> kootto antti.
   * @returns {string} mutated string
   */
  Translator.prototype.mutateWithLongVowel = function () {
    // aatto -> kootto
    this.mutatedOriginalWord =
      'koo' +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length)
      );

    // kontti -> antti
    this.mutatedKontti =
      this.charsFromOriginalWord[0] +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );
  };
  /**
   * The original word begins with double vowel like au, ai, etc.
   * Example: auto kontti -> kouto antti.
   * @returns {string} mutated string
   */
  Translator.prototype.mutateWithDoubleVowel = function () {
    // auto -> kouto
    this.mutatedOriginalWord =
      this.charsFromKontti +
      this.charsFromOriginalWord[1] +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length)
      );

    // kontti -> antti
    this.mutatedKontti =
      this.charsFromOriginalWord[0] +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );
  };
  /**
   * The original word begins with a consonant following long vowel like aa, ii, etc.
   * Example: vaara kontti -> koora vantti.
   * @returns {string} mutated string
   */
  Translator.prototype.mutateConsonantWithLongVowel = function () {
    // vaara -> koova
    this.mutatedOriginalWord =
      'koo' +
      this.originalWord.substr(
        this.originalWord.length -
          (this.originalWord.length - this.charsFromOriginalWord.length - 1)
      );

    // kontti -> antti
    this.mutatedKontti =
      this.charsFromOriginalWord[0] +
      this.charsFromOriginalWord[1] +
      this.kontti.substr(
        this.kontti.length - (this.kontti.length - this.charsFromKontti.length)
      );
  };
  /**
   * General adjustements for all mutated strings before returning.
   * @return {string}
   */
  Translator.prototype.generalAdjustments = function () {
    /**
     * If the second character from original string is a consonant, it should be removed
     * because for example approksimaatio would result koproksimaatioapntti, which is wrong.
     *
     * The removed consonant will be moved to the mutated original word.
     *
     * This block will result into approksimaatio -> koproksimaatioantti
     */
    if (this.isVowel(this.mutatedKontti[1]) == false) {
      const consonant = this.mutatedKontti[1];

      // Remove consonant
      this.mutatedKontti =
        this.mutatedKontti.slice(0, 1) + this.mutatedKontti.slice(2);

      // Add it to the mutated original word
      this.mutatedOriginalWord =
        this.mutatedOriginalWord.slice(0, 2) +
        consonant +
        this.mutatedOriginalWord.slice(2);
    }
  };
}

module.exports = Translator;
