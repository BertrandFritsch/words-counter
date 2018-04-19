import * as fs from 'fs';
import * as wordsCounter from './wordsCounter';

describe('words counter module', () => {
  it('should get an empty map for an empty string', () => {
    expect(wordsCounter.count('')).toEqual({});
  });

  it('should count 1 for a single word', () => {
    expect(wordsCounter.count('word')).toEqual({ word: 1 });
  });

  it('should count 2 for twice the same word', () => {
    expect(wordsCounter.count('word word')).toEqual({ word: 2 });
  });

  it('should ignore words less or equal to 2 letters', () => {
    expect(wordsCounter.count('le mot le plus long')).toEqual({ mot: 1, plus: 1, long: 1 });
  });

  it('should accept more than 1 space between 2 words', () => {
    expect(wordsCounter.count('word      time')).toEqual({ word: 1, time: 1 });
  });

  it('should accept multi-line text', () => {
    expect(wordsCounter.count('word\ntime')).toEqual({ word: 1, time: 1 });
  });

  it('should ignore punctuation', () => {
    expect(wordsCounter.count('word, time. next; exclamation! interrogation! dot dot dot...')).toEqual({ word: 1, time: 1, next: 1, exclamation: 1, interrogation: 1, dot: 3 });
  });

  it('should recognize french accents', () => {
    expect(wordsCounter.count('être')).toEqual({ être: 1 });
  });

  it('should recognize dash separated words', () => {
    expect(wordsCounter.count('peut-être')).toEqual({ 'peut-être': 1 });
  });

  it('should recognize uppercase letters', () => {
    expect(wordsCounter.count('PEUT-ÊTRE')).toEqual({ 'PEUT-ÊTRE': 1 });
  });

  it('should recognize the single cote as a separator', () => {
    expect(wordsCounter.count('Jean d\'Angleterre')).toEqual({ Jean: 1, Angleterre: 1 });
  });

  it ('should handle a whole text', () => {
    const text = fs.readFileSync('./data/text.txt', 'utf8');
    expect(wordsCounter.count(text)).toMatchSnapshot();
  });
});
