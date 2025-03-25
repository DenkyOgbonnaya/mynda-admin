export const truncateWords = (word: string, length: number): string => {
  if (!word) return "";
  if (word.length <= length) {
    return word;
  }

  const truncateWord = `${word.substring(0, length)}`;

  return truncateWord.concat("...");
};
