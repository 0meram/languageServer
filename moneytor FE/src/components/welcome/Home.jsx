import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { UserContext } from "../lib/context/useContext";
import Grid from "@material-ui/core/Grid";
import ClipLoader from "react-spinners/ClipLoader";
import Hero from "../lib/images/bg.jpg";
import { wordsList } from "../lib/wordsList";
import "./welcome.css";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: `url(${Hero})`,
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "100vh",
		width: "100vw",
	},
}));

export default function Home() {
	const classes = useStyles();
	const [res2, setRes2] = useState("");
	const [wordToAdd, setWordToAdd] = useState("this is me");
	const [loading, setLoading] = useState(false);
	const [find, setFind] = useState("");
	const [wordFound, setWordFound] = useState();
	const [wordLang, setWordLang] = useState();
	const [wordCode, setWordCode] = useState();

	// const getWord = (wordCode, lang) => {
	// 	const word = wordsList.filter((word) => console.log(word));
	// 	// setWordFound(word[0])
	// 	return word;
	// };

	const addWord = (text, wordCode, lang) => {
		wordsList.push({
			wordCode: wordCode,
			lang: lang,
			text: text,
		});
	};

	const sendWord = async () => {
		setLoading(true);
		const res = await axios.post("http://localhost:8000/search/send", {
			wordToAdd,
		});
		console.log("~ res.data[0]", res.data);
		setTimeout(() => {
			setLoading(false);
		}, 800);
		if (res.data.length) {
			if (res.data[0][0] === "en") {
				return setRes2("grate this word is defiantly in english");
			} else {
				setRes2("wait,  we are checking if this word has english value");
				for (let i = 0; i < res.data.length; i++) {
					const element = res.data[i];
                    console.log('~ element', element);
					for (let y = 0; y < element.length; y++) {
						const item = element[y];
                        console.log('~ item', item);
						if (item == "en") {
							return setRes2("yap!, this word probably has english value!");
						} else return setRes2("sorry not an english word, try again");
					}
				}
			}
		} else {
			setRes2("cant detect this word");
		}
	};

	const handleSendWord = () => {
		sendWord();
	};

	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={true} sm={12} md={12} className={classes.image}>
				<div className="hero">
					<h1>Check for english</h1>
					<TextField fullWidth onChange={(e) => setWordToAdd(e.target.value)} />
					<Button onClick={handleSendWord}>Check</Button>
					{loading && (
						<ClipLoader color="white" loading={true} css="" size={20} />
					)}
					<Grid>
						{res2}
						{res2 && (
							<Button onClick={addWord(wordToAdd, 6, "lang")}>
								add to list
							</Button>
						)}
					</Grid>
					<TextField fullWidth onChange={(e) => setFind(e.target.value)} />
					{/* <Button onClick={getWord(find)}>Find my word</Button> */}
					<Grid>{wordFound}</Grid>
				</div>
			</Grid>
		</Grid>
	);
}
