import * as wordsCounter from './wordsCounter';

interface Event {
    text: string;
}

export const handler = async (event: Event) => wordsCounter.count(event.text);
