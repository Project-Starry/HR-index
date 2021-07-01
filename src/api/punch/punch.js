import firebase from "firebase";
// import store from "../../store";

export async function readPunch(uid) {
  let db = firebase.firestore();

  if (uid == null) return null;

  var docRef = db.collection("PunchClock").doc(uid);

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
      if (today in doc.data()) {
        if (doc.data()[today].out != "n/a") {
          alert("Error !  ");
          return -1;
        } else {
          PunchOut(db, name, user, today);
          return 1;
        }
      } else {
        PunchInExist(db, name, user, today);
        return 0;
      }
    } else {
      PunchIn(db, name, user, today);
      return 0;
    }
  });
  if (type == -1) return -1;
  else return 1;
}

function PunchOut(db, name, user, today) {
  db.collection(name)
    .doc(user.uid)
    .update({
      // ['favorites.' + key + '.color']: true
      [today + ".out"]: new Date().toLocaleTimeString(),
    })
    .then((docRef) => {
      alert("下班");
      docRef.data();
    });
}

function PunchIn(db, name, user, today) {
  var obj = { [today]: { in: new Date().toLocaleTimeString(), out: "n/a" } };

  db.collection(name)
    .doc(user.uid)
    .set(obj)
    .then(() => {
      alert("上班");
    });
}

function PunchInExist(db, name, user, today) {
  var obj = { [today]: { in: new Date().toLocaleTimeString(), out: "n/a" } };

  db.collection(name)
    .doc(user.uid)
    .update(obj)
    .then(() => {
      alert("上班");
    });
}
