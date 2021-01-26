const cryptoRandomString = require('crypto-random-string');
const button = document.getElementById('clean');
button.onclick = cleanSvg;

/**
 * Generates a random string with the first character as a letter. If first character is a number, rerolls until returning a string where the first character is a letter.
 * @param {number} length length of the string to generate
 */
const generateRandomString = (length) => {
  const random = cryptoRandomString({ length, type: 'alphanumeric' });
  return isNaN(+random.charAt(0)) ? random : generateRandomString(length);
};

function cleanSvg() {
  const input = document.getElementById('input')?.value;
  const svg = new DOMParser().parseFromString(input, 'image/svg+xml');
  const output = document.getElementById('output');
  const final = Array.from(
    new Set(
      svg
        .getElementsByTagName('style')[0]
        .textContent.split('}')
        .map((cssRule) => cssRule.slice(0, cssRule.indexOf('{')))
        .filter((cssSelector) => !!cssSelector)
        .flatMap((selectorGroup) =>
          selectorGroup.split(',').map((cssClass) => cssClass.trim().slice(1))
        )
    )
  ).reduce((acc, str) => acc.replaceAll(str, generateRandomString(15)), input);
  output.value = final;
}
