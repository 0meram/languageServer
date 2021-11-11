import React from "react";
import Grid from "@material-ui/core/Grid";
import { wordsList } from "../../lib/wordsList";

export const getWord = (code) => {
	const word = wordsList.filter((word) => word.text === code);
	let outPut = (
		<Grid>
			{word.map((item, index) => {
				return (
					<li key={index}>
						{item.text}
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
