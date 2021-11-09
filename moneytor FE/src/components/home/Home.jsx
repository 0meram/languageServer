import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ClipLoader from "react-spinners/ClipLoader";
import Hero from "../lib/images/bg.jpg";
import { addWord } from "../home/logic/addWord";
import { getWord } from "../home/logic/getWord";
import "./home.css";

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
	const [wordToAdd, setWordToAdd] = useState();
	const [wordLang, setWordLang] = useState();
	const [wordCode, setWordCode] = useState();
	const [findWord, setFindWord] = useState("");
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState("");
	const [serverAnswer, setServerAnswer] = useState("");
	const [outPut, setOutPut] = useState();

	const sendWord = async () => {
		setLoading(true);
		const res = await axios.post("http://localhost:8000/search/send", {
			wordToAdd,
		});
		setTimeout(() => {
			setLoading(false);
		}, 800);
		setOutPut("")
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

	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={true} sm={12} md={12} className={classes.image}>
				<div className="hero">
					<h1>Check for english</h1>
					<TextField fullWidth onChange={(e) => setWordToAdd(e.target.value)} />
					<Button onClick={sendWord}>Check</Button>
					{loading && (
						<ClipLoader color="white" loading={true} css="" size={20} />
					)}
					<Grid>
						{serverError}
						{serverAnswer}
						{serverAnswer && (
							<Button onClick={() => addWord(wordToAdd, wordCode, wordLang)}>
								add to list
							</Button>
						)}
					</Grid>
					<TextField fullWidth onChange={(e) => setFindWord(e.target.value)} />
					<Button onClick={() => setOutPut(getWord(findWord))}>
						Find my word
					</Button>
					<Grid>{outPut}</Grid>
				</div>
			</Grid>
		</Grid>
	);
}
