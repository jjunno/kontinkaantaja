console.debug('Validator.js');

function Validator(string) {
  this.string = string;

  /**
   * Validate string. Only characters a-öA-Ö are allowed.
   * @returns {boolean}
   */
  Validator.prototype.validate = function () {
    let res = /^[a-öA-Ö]+$/;
    const test = res.test(this.string);
    if (test == false) console.log(`Word ${this.string} is invalid`);
    return test;
  };
}

module.exports = Validator;
