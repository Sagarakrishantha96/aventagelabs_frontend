import React, { useEffect, useState } from "react";
import "./FoodOrder.scss";
import axios from "axios";
import { Button, Card, CardBody, Table } from "reactstrap";

function FoodOrder() {
  const [mainDishesData, setMainDishesData] = useState([]);
  const [sideDishesData, setSideDishesData] = useState([]);
  const [dessertData, setDessertData] = useState([]);
  const [selectedMainDish, setSelectedMainDish] = useState("");
  const [selectedSideDishes, setSelectedSideDishes] = useState([]);
  const [selectedDesserts, setSelectedDesserts] = useState([]);
  const [orderMainDishDetails, setOrderMainDishDetails] = useState([]);
  const [orderSideDishDetails, setOrderSideDishDetails] = useState([]);
  const [orderDessertDetails, setOrderDessertDetails] = useState([]);
  const [orderPriceDetails, setOrderPriceDetails] = useState([]);

  const getMainDishesDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/mainDishes/getAllMainDishes"
      );
      setMainDishesData(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSideDishesDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/sideDishes/getAllSideDishes"
      );
      setSideDishesData(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDessertDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/desserts/getAllDesserts"
      );
      setDessertData(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const mainDishIdMap = mainDishesData.reduce((acc, dish) => {
    acc[dish.MainDishName] = dish.ID;
    return acc;
  }, {});

  const handleMainDishChange = (event) => {
    const selectedMainDishName = event.target.value;
    const selectedMainDishId = mainDishIdMap[selectedMainDishName];
    setSelectedMainDish(selectedMainDishId);
  };

  const sideDishIdMap = sideDishesData.reduce((acc, dish) => {
    acc[dish.SideDishName] = dish.ID;
    return acc;
  }, {});

  const handleSideDishChange = (event) => {
    const selectedSideDishName = event.target.value;
    const selectedSideDishId = sideDishIdMap[selectedSideDishName];

    setSelectedSideDishes((prevSelectedSideDishes) => {
      if (prevSelectedSideDishes.includes(selectedSideDishId)) {
        return prevSelectedSideDishes.filter((id) => id !== selectedSideDishId);
      } else {
        return [...prevSelectedSideDishes, selectedSideDishId];
      }
    });
  };

  const DessertIdMap = dessertData.reduce((acc, dessert) => {
    acc[dessert.DessertName] = dessert.ID;
    return acc;
  }, {});

  const handleDessertChange = (event) => {
    const selectedDessertName = event.target.value;
    const selectedDessertId = DessertIdMap[selectedDessertName];

    setSelectedDesserts((prevSelectedDesserts) => {
      if (selectedDessertId === null) {
        return [];
      }

      if (prevSelectedDesserts.includes(selectedDessertId)) {
        return prevSelectedDesserts.filter((id) => id !== selectedDessertId);
      } else {
        return [...prevSelectedDesserts, selectedDessertId];
      }
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const currentDate = new Date().toLocaleDateString();
      const orderData = {
        mainDishId: selectedMainDish,
        sideDishIds: selectedSideDishes,
        dessertIds: selectedDesserts.length > 0 ? selectedDesserts : null,
        OrderDate: currentDate,
      };
      const response = await axios.post(
        "http://localhost:5000/orders/createOrder",
        orderData
      );
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
    window.location.reload();
  };

  const getOrderMainDishDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders/getOrderMainDishDetails"
      );
      setOrderMainDishDetails(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrderSideDishDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders/getOrderSideDishDetails"
      );
      setOrderSideDishDetails(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrderDessertDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders/getOrderDessertDetails"
      );
      setOrderDessertDetails(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrderPriceDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders/getOrderPriceDetails"
      );
      setOrderPriceDetails(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMainDishesDetails();
    getSideDishesDetails();
    getDessertDetails();
    getOrderMainDishDetails();
    getOrderSideDishDetails();
    getOrderDessertDetails();
    getOrderPriceDetails();
  }, []);

  const isFormValid =
    selectedMainDish !== null && selectedSideDishes.length > 0;

  const sortedOrderMainDishDetails = orderMainDishDetails.sort(
    (a, b) => a.OrderID - b.OrderID
  );

  return (
    <div className="FoodOrder-container">
      <div className="FoodOrder-center">
        <Card style={{width: "45%", margin: "0 auto", borderWidth: "2px", borderColor: "black"  }}>
          
          <form className="FoodOrder-Form" onSubmit={handleFormSubmit}>
          <Card style={{marginTop: "10px", width: "300%", marginLeft: "0px ",borderWidth: "1px", borderColor: "black"  }}>
          <label style={{fontWeight: "bold"}}>what is your main dish?</label>
            {mainDishesData.map((maindish, index) => (
              <label key={index}>
                {maindish.MainDishName}{" "}
                <input
                  type="radio"
                  name="mainDishes"
                  value={maindish.MainDishName}
                  onChange={handleMainDishChange}
                  checked={selectedMainDish === maindish.ID}
                />
              </label>
            ))}
          </Card>

          <Card style={{marginTop: "10px", width: "300%", marginLeft: "0px ",borderWidth: "1px", borderColor: "black" }}>
          <label style={{fontWeight: "bold"}}>what is your side dish?</label>
            {sideDishesData.map((sidedish, index) => (
              <label key={index}>
                {sidedish.SideDishName}{" "}
                <input
                  type="checkbox"
                  name="sideDishes"
                  value={sidedish.SideDishName}
                  onChange={handleSideDishChange}
                  checked={selectedSideDishes.includes(sidedish.ID)}
                />
              </label>
            ))}
          </Card>
            
            
            <Card  style={{marginTop: "10px", width: "300%", marginLeft: "0px ",borderWidth: "1px", borderColor: "black"}}>
            <label style={{fontWeight: "bold"}}>what is your dessert?</label>
            {dessertData.map((dessert, index) => (
              <label key={index}>
                {dessert.DessertName}{" "}
                <input
                  type="checkbox"
                  name="dessert"
                  value={dessert.DessertName}
                  onChange={handleDessertChange}
                  checked={selectedDesserts.includes(dessert.ID)}
                />
              </label>
            ))}
            </Card>
            
            <Button
              color="success"
              disabled={!isFormValid}
              style={{ marginTop: "30px" }}
            >
              Complete Order
            </Button>
          </form>
        </Card>
      </div>
      <div className="FoodOrder-table">
        <Card>
          <CardBody>
            <div className="table-section">
              <Table striped>
                <thead className="table-dark">
                  <tr>
                    <th>Order Number</th>
                    <th>Date</th>
                    <th>Main Dish</th>
                    <th>side Dish</th>
                    <th>Dessert</th>
                    <th>order Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrderMainDishDetails.map((mainDishDetails) => {
                    const correspondingSideDish = orderSideDishDetails.filter(
                      (sideDishDetails) =>
                        sideDishDetails.OrderID === mainDishDetails.OrderID
                    );
                    const correspondingDessert = orderDessertDetails.filter(
                      (dessertDetails) =>
                        dessertDetails.OrderID === mainDishDetails.OrderID
                    );
                    const correspondingPrice = orderPriceDetails.filter(
                      (priceDetails) =>
                        priceDetails.OrderID === mainDishDetails.OrderID
                    );
                    return (
                      <tr key={mainDishDetails.ID}>
                        <td>{mainDishDetails.OrderID}</td>
                        <td>{mainDishDetails.OrderDate}</td>
                        <td>{mainDishDetails.MainDishName}</td>
                        <td>
                          {correspondingSideDish.length > 0
                            ? correspondingSideDish
                                .map((sideDish) => sideDish.SideDishName)
                                .join(" , ")
                            : "N/A"}
                        </td>
                        <td>
                          {correspondingDessert.length > 0
                            ? correspondingDessert
                                .map((dessert) => dessert.DessertName)
                                .join(", ")
                            : " - "}
                        </td>
                        <td>
                          {correspondingPrice.length > 0
                            ? correspondingPrice
                                .map((dessert) => dessert.Total)
                                .join(", ")
                            : " - "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default FoodOrder;
