import FireRequest from "../services/Request";

export const useRestaurantService = () => {
  const getRestaurantById = (history, id) => {
    FireRequest()
      .getServiceCondition("restaurantsDocument", "idUser", id)
      .then((response) => {
        if (response.size) {
          history.push("/dishes");
        }
      })
      .catch((error) => {
        console.log(`este es el error ${error}`);
      });
  };
  return { getRestaurantById };
};
