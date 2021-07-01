import firebase from "firebase";
// import store from "../../store";

export async function readPunch() {
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;

  if (user == null) return null;

  var docRef = db.collection("PunchClock").doc(user.uid);

  return await docRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

export async function doPunchFirebase() {
  let name = "PunchClock";
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;
  if (user == null) return;
  let docRef = db.collection(name).doc(user.uid);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "" + dd + "" + yyyy;

  let type = await docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log(doc.data().obj[today].out);
      if (doc.data().obj[today].out != "n/a") {
        alert("Error !  ");
        return -1;
      } else if (today in doc.data().obj) {
        PunchOut(db, name, user, today);
        return 1;
      } else {
        PunchIn(db, name, user, today);
        return 0;
      }
    } else {
      PunchIn(db, name, user, today);
      return 0;
    }
  });
  if (type == -1) return -1;

  if (type == 0) {
    return today;
  } else {
    return null;
  }
}

function PunchOut(db, name, user, today) {
  db.collection(name)
    .doc(user.uid)
    .update({
      // ['favorites.' + key + '.color']: true
      ["obj." + today + ".out"]: new Date().toLocaleTimeString(),
    })
    .then((docRef) => {
      alert("下班");
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
      obj,
    })
    .then((docRef) => {
      alert("上班");
      docRef.data();
    });
}
