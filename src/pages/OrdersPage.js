import React, { useState, useEffect } from "react";
import DeleteModal from "../components/DeleteModal";
import IconMoney from "../assets/icon/iconos-moneda-01.svg";

import { useOrderService } from "../hooks/useOrderService";

const OrdersPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [requestDish, setRequestDish] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [currentOrder, setCurrentOrder] = useState("");
  const { requests, getRequest, edditOrder } = useOrderService(currentOrder);

  useEffect(() => {
    getRequest();
  }, []);

  const handleCloseAlert = (action) => setShowAlert(action);

  //Change status to paid
  const handlePaid = () => {
    setShowAlert(false);
    if (currentOrder) {
      edditOrder({ status: "pagado" });
      setRequestDish("");
    }
    setCurrentOrder("");
  };

  const DishesTable = () =>
    requests.map((element, index) => (
      <div className="orders__table" key={element + index}>
        <button
          className="orders__table--button"
          onClick={() => {
            setRequestDish(element);
            setCurrentOrder(element.id);
            setTotalPrice(element.totalPrice);
          }}
        >
          {element.table}
        </button>
      </div>
    ));

  const DishesContain = () => {
    if (requestDish !== "") {
      return requestDish?.dishes.map((e, index) => (
        <div className="request__dishes--cards" key={index}>
          <div className="dishes__header">
            <img src={e?.imagePath} alt="imagen plato"></img>
            <h6> {e?.dishName} </h6>
          </div>
          <div className="dishes__body">
            <h6>{e?.description} </h6>
            {e.ingredient.length > 0 && (
              <div className="dishes__body--ingredient">
                Ingredientes
                <div className="ingredient">
                  {e?.ingredient.map((ingre, i) => (
                    <div key={i}>{ingre}</div>
                  ))}
                </div>
              </div>
            )}
            {e?.addition.length > 0 && (
              <div className="dishes__body--addition">
                Adiciones
                <div className="addition">
                  {e?.addition.map((addit, i) => (
                    <div key={i}>{addit}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="dishes__footer">
            <div className="footer__amount">Cantidad: {e?.quantity}</div>
            <div className="footer__price">
              <img src={IconMoney} alt="icon" />
              <div>{e?.priceAddition}</div>
            </div>
          </div>
        </div>
      ));
    } else {
      return <div>No ha seleccionado ningún pedido</div>;
    }
  };

  return (
    <div className="container__orders">
      <div className="request">
        <div className="orders">
          <div className="request__orders">
            <DishesTable />
          </div>
        </div>
        {currentOrder && (
          <div className="request__paid">
            <div className="request__paid--money">
              <img src={IconMoney} alt="icon" />
              <div>{totalPrice}</div>
            </div>
            <button
              onClick={() => {
                setShowAlert(true);
              }}
            >
              Pagado
            </button>
          </div>
        )}
      </div>
      <div className="container__orders--dishes">
        <div className="request__dishes">
          <DishesContain />
        </div>
      </div>
      <DeleteModal
        name={"marcar el pedido como pagado"}
        open={currentOrder ? showAlert : false}
        close={handleCloseAlert}
        remove={handlePaid}
      />
    </div>
  );
};

export default OrdersPage;
