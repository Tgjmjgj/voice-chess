/**
 * Upper case the first character of the given string
 * @param {string} str Given string
 * @return {string} String with first upper letter
 */
export function upFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get random element from the array
 * @param {string[]} arr Given array of elements
 * @return {string} Randomly choosen element from the array
 */
export function rand(arr: string[]): string {
  if (arr.length !== 0) {
    return arr[Math.floor(Math.random() * arr.length)];
  } else {
    return null;
  }
}

export interface LocalizationObject<T> {
  [key: string]: T;
  en: T;
  ru: T;
}

export interface WordForms {
  [key: string]: string;
  mus: string;
  fem: string;
  na: string;
}