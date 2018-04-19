interface Words {
  [ word: string ]: number;
}

const wordRegex = /[A-Za-zÀ-ÿ-]{3,}/g;

/**
 * Counts the number of occurrences of the words in a text.
 * The function recognizes french language characters.
 *
 * The words with less than 2 letters are ignored.
 *
 * Assumes that the text is well formed. The function doesn't try
 * to reject badly formatted words.
 *
 * @param {string} text
 * @returns {Words} A property bag containing the words with their frequency
 */
export function count(text: string): Words {
  return (text.match(wordRegex) || []).reduce((wordCounts, word) => {

    wordCounts[ word ] = (wordCounts[ word ] || 0) + 1;
    return wordCounts;

  }, {} as Words);
}
