function cleanSearchTerm(string) {
  const array = string.toLowerCase().split('');

  const cleanArray = array.filter((symbol, ind) => {
    if ((ind === 0 ||
        ind === array.length - 1) &&
        (/\s/).test(symbol)) {
      return false;
    } else if ((/\s/).test(symbol) && (/\s/).test(array[ind + 1])) {
      return false;
    } else {
      return (/[a-z\d\s\-]/).test(symbol);
    }
  });

  return cleanArray.join('');
}

export default cleanSearchTerm;
