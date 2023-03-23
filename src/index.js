const LEFT_SEPARATOR = '{';
const RIGHT_SEPARATOR = '}';
const SEPARATOR = ',';

// Dofus HyperLink parser
export default function parser(string, leftSeparator = LEFT_SEPARATOR, rightSeparator = RIGHT_SEPARATOR, separator = SEPARATOR) {
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

    parsedString.push(string.substring(index, leftIndex));
    const data = string.substring(leftIndex + 1, rightIndex).split(separator);

    const protocol = data[0];
    const params = data.slice(1);
    parsedString.push({ protocol, params });

    index = rightIndex + 1;
  }

  if (index < string.length) {
    parsedString.push(string.substring(index));
  }
  return parsedString;
}
