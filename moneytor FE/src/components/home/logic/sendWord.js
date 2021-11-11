import axios from "axios";

export const sendWord = async (
	setServerAnswer,
	setLoading,
	setOutPut,
	setServerError,
	setWordCode,
	setWordLang,
	wordToAdd
) => {
	setServerAnswer("");
	setLoading(true);
	const res = await axios.post(
		"https://tranquil-forest-22449.herokuapp.com/search/send",
		{
			wordToAdd,
		}
	);
	setTimeout(() => {
		setLoading(false);
	}, 800);
	setOutPut("");
	if (res.data.length) {
		if (res.data[0][0] === "en") {
			setServerError("");
			setWordCode(res.data[0][1]);
			setWordLang(res.data[0][0]);
			return setServerAnswer("great this word is definitely in english");
		} else {
			for (let i = 0; i < res.data.length; i++) {
				const element = res.data[i];
				setWordCode(element[1]);
				setWordLang(element[0]);
				for (let y = 0; y < element.length; y++) {
					const item = element[y];
					if (item == "en") {
						setServerError("");
						return setServerAnswer(
							"yap!, this word probably has english value!"
						);
					} else setServerError("sorry not an english word, try again");
				}
			}
		}
	} else {
		setServerAnswer("");
		setServerError("cant detect this word");
	}
};
