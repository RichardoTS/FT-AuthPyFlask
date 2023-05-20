import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = () => {
		const options ={
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		}
		fetch ('https://3001-richardots-ftauthpyflas-t7wjn3fwe9t.ws-us97.gitpod.io/api/token', options)
			.then( resp => {
				if(resp.status === 200) return resp.json();
				else alert("There has been some error");
			})
			.then()
			.catch(error => {
				console.log("There was an error!", error)
			})
	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<button onClick={handleClick}>Login</button>
			</div>
		</div>
	);
};
