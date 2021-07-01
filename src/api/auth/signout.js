import firebase from "firebase";
import store from "../../store";

export function signout() {
  firebase.auth().signOut();
  store.commit("setUser", null);
}
