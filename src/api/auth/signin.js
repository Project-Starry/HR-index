import firebase from "firebase";
import { register } from "@/api/auth/register.js";
import store from "../../store";

export async function signin() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = "zh-TW";
  provider.setCustomParameters({
    hd: "gmail.com",
  });
  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      store.commit("setUser", result.user);
      register(result.user);
      return result.user;
    })
    .catch(function(error) {
      console.log(error);
    });
}
