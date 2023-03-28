const LEFT_SEPARATOR = '{';
const RIGHT_SEPARATOR = '}';
const SEPARATOR = '::';

// Dofus HyperLink parser
module.exports = function parser(string, leftSeparator = LEFT_SEPARATOR, rightSeparator = RIGHT_SEPARATOR, separator = SEPARATOR) {
  if (!string) {
    return null;
  }

  const parsedString = [];
  let index = 0;

  while (true) {
    const leftIndex = string.indexOf(leftSeparator, index);
    const rightIndex = string.indexOf(rightSeparator, index);

    if (leftIndex === -1 || rightIndex === -1 || rightIndex < leftIndex) {
      break;
    }

    const leftPart = string.substring(index, leftIndex);
    if (leftPart) {
      parsedString.push(leftPart);
    }
    const middlePart = string.substring(leftIndex + 1, rightIndex);
    const linkPart = middlePart.split(separator);
    const data = linkPart[0].split(',');

    const protocol = data[0];
    const params = data.slice(1);

    let text = '';
    if (linkPart.length === 2) {
      text = linkPart[1];
    }
    parsedString.push({ protocol, params, text });

    index = rightIndex + 1;
  }

  if (index < string.length) {
    parsedString.push(string.substring(index));
  }
  return parsedString;
}
