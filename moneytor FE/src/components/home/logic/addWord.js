import { wordsList } from "../../lib/wordsList";

export const addWord = (text, wordCode, lang, setServerAnswer) => {
	wordsList.push({
		wordCode: wordCode,
		lang: lang,
		text: text,
	});
	setServerAnswer("Added to word list!");
};
