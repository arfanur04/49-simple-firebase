import {
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
	const [user, setUser] = useState(null);
	const auth = getAuth(app);
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const loggedInUser = result.user;
				console.log(`user:`, loggedInUser);
				setUser(loggedInUser);
			})
			.catch((error) => {
				console.error("error", error.message);
			});
	};

	const handleGithubSignIn = () => {
		signInWithPopup(auth, githubProvider)
			.then((result) => {
				const loggedUser = result.user;
				console.log(`loggedUser:`, loggedUser);
				setUser(loggedUser);
			})
			.catch((err) => console.error("err", err));
	};

	const handleSignOut = () => {
		signOut(auth)
			.then((result) => {
				console.log(`result:`, result);
				setUser(null);
			})
			.catch((err) => {
				console.error("err", err);
			});
	};

	return (
		<div>
			{user ? (
				<button onClick={handleSignOut}>Sign Out</button>
			) : (
				<>
					<button onClick={handleGoogleSignIn}>Google login</button>
					<button onClick={handleGithubSignIn}>Github Login</button>
				</>
			)}
			{user && (
				<div>
					<h2>User: {user.displayName}</h2>
					<p>Email: {user.email}</p>
					<img
						style={{ borderRadius: "50%", width: "100px" }}
						src={user.photoURL}
						alt=""
					/>
				</div>
			)}
		</div>
	);
};

export default Login;
