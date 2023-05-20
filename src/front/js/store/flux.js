const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded.")
				if (token && token != "" && token != undefined) setStore({ token: token})

			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logged out.")
				setStore({ token: null})

			},
			login: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try {
					const resp = await fetch('https://3001-richardots-ftauthpyflas-t7wjn3fwe9t.ws-us97.gitpod.io/api/token', options)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					const data = await resp.json()
					console.log("This came from the back", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token})
					return true;
				}
				catch (error) {
					console.log("There has been an error at loggin in", error)
				}

			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
