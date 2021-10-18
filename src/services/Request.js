import { db } from "../utils/firebase";

const FireRequest = () => {
  const getService = async (document, id) =>
    await db.collection(document).doc(id).get();

  const getServiceCondition = async (document, firts, operator, second) =>
    await db.collection(document).where(firts, operator, second).get();

  const postService = async (document, data) =>
    await db.collection(document).doc().set(data);

  const updateService = async (document, id, data) =>
    await db.collection(document).doc(id).update(data);

  const deleteService = async (document, id) =>
    await db.collection(document).doc(id).delete();

  return {
    getService,
    getServiceCondition,
    postService,
    updateService,
    deleteService,
  };
};

export default FireRequest;
