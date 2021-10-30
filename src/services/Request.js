import { db } from "../utils/firebase";
import firebase from "firebase";

const FireRequest = () => {
  const signIn = async (user, pass) =>
    await firebase.auth().signInWithEmailAndPassword(user, pass);

  const getService = async (document, id) =>
    await db.collection(document).doc(id).get();

  const getServiceCondition = async (document, firts, second) =>
    await db.collection(document).where(firts, "==", second).get();

  const getServiceSnapShot = async (document, id) =>
    await db.collection(document).where(firts, "==", second).onSnapshot();

  const postService = async (document, data) =>
    await db.collection(document).doc().set(data);

  const updateService = async (document, id, data) =>
    await db.collection(document).doc(id).update(data);

  const deleteService = async (document, id) =>
    await db.collection(document).doc(id).delete();

  return {
    signIn,
    getService,
    getServiceCondition,
    postService,
    updateService,
    deleteService,
  };
};

export default FireRequest;
