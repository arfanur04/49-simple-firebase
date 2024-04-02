import {
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
	const provider = new GoogleAuthProvider();

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const loggedInUser = result.user;
				console.log(`user:`, loggedInUser);
				setUser(loggedInUser);
			})
			.catch((error) => {
				console.error("error", error.message);
			});
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
				<button onClick={handleGoogleSignIn}>Google login</button>
			)}
			{user && (
				<div>
					<h2>User: {user.displayName}</h2>
					<p>Email: {user.email}</p>
					<img
						src={user.photoURL}
						alt=""
					/>
				</div>
			)}
		</div>
	);
};

export default Login;
