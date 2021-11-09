import React from "react";
import { wordsList } from "../../lib/wordsList";
import Grid from "@material-ui/core/Grid";

export const getWord = (code, lang) => {
	const word = wordsList.filter((word) => word.text === code);
	let outPut = (
		<Grid>
			{word.map((item, index) => {
				return (
					<li key={index}>
						{item.text}
						{"   "}
						{item.lang}
						{"   "}
						{item.wordCode}
					</li>
				);
			})}
		</Grid>
	);
	if (!word.length) {
		outPut = "sorry, no match";
	}
	return outPut;
};
