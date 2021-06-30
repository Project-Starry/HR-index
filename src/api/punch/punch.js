import firebase from "firebase";
// import store from "../../store";

export async function readPunch() {
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;

  var docRef = db.collection("PunchClock").doc(user.uid);

  return await docRef
    .get()
    .then(async doc => {
      if (doc.exists) {
        return await doc.data();
      }
    })
    .catch(error => {
      console.log("Error getting document:", error);
    });
}

export function doPunchFirebase() {
  let name = "PunchClock";
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;
  let docRef = db.collection(name).doc(user.uid);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "" + dd + "" + yyyy;

  docRef.get().then(function(doc) {
    if (doc.exists) {
      if (today in doc.data().obj) {
        PunchOut(db, name, user, today);
      } else {
        PunchIn(db, name, user, today);
      }
    } else {
      PunchIn(db, name, user, today);
    }
  });
}

function PunchOut(db, name, user, today) {
  db.collection(name)
    .doc(user.uid)
    .update({
      // ['favorites.' + key + '.color']: true
      ["obj." + today + ".out"]: new Date().toLocaleTimeString()
    })
    .then(docRef => {
      docRef.data();
    });
}

function PunchIn(db, name, user, today) {
  var key = today;
  var obj = {};
  obj[key] = { in: new Date().toLocaleTimeString(), out: "n/a" };

  db.collection(name)
    .doc(user.uid)
    .set({
      obj
    })
    .then(docRef => {
      docRef.data();
    });
}
