import { wordsList } from "../../lib/wordsList";

export const addWord = (text, wordCode, lang) => {
	wordsList.push({
		wordCode: wordCode,
		lang: lang,
		text: text,
	});
};
