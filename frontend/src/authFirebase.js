import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const signIn = async () => {
  const auth = getAuth();
  //   console.log(auth);
  let provider = new GoogleAuthProvider();

  const data = await signInWithPopup(auth, provider);
  //   console.log(data.user);
  if (data.user) {
    const user = data.user;
    return {
      username: user.displayName,
      name: user.displayName,
      email: user.email,
      password: user.reloadUserInfo.createdAt,
      pfp: user.photoURL,
    };
  } else {
    const errorCode = data.code;
    const errorMessage = data.message;
    // The email of the user's account used.
    const email = data.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(data);
    console.log(errorMessage, errorCode);
  }
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   //   return new Promise((resolve, reject) => {
  //   //     resolve({
  //   //       username: user.displayName,
  //   //       name: user.displayName,
  //   //       email: user.email,
  //   //       password: user.reloadUserInfo.createdAt,
  //   //       pfp: user.photoURL,
  //   //     });
  //   //   });

  //   return {
  //     username: user.displayName,
  //     name: user.displayName,
  //     email: user.email,
  //     password: user.reloadUserInfo.createdAt,
  //     pfp: user.photoURL,
  //   };
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  // })
  // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
};
