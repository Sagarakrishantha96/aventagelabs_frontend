import React, { useEffect, useState } from "react";
import "./Reports.scss";
import axios from "axios";
import { Card } from "reactstrap";

function Reports() {
  const [selectedDate, setSelectedDate] = useState("");
  const [mostFamousMainDish, setMostFamousMainDish] = useState([]);
  const [mostFamousSideDish, setMostFamousSideDish] = useState([]);
  const [allOrderDetails, setAllOrderDetails] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState(0);

  const getMostFamousMainDish = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/reports/getMostFamousMainDish"
      );
      setMostFamousMainDish(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMostFamousSideDish = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/reports/getMostFamousSideDish"
      );
      setMostFamousSideDish(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);

    const calculatedRevenue = calculateDailyRevenue(newDate);
    setDailyRevenue(calculatedRevenue);
  };

  const calculateDailyRevenue = (selectedDate) => {
    const dailyOrders = allOrderDetails.map((order) => {
      const orderDate = new Date(order.OrderDate);
      const formattedDate = orderDate.toISOString().split("T")[0];
      return { ...order, OrderDate: formattedDate };
    });
    const filteredOrders = dailyOrders.filter(
      (order) => order.OrderDate === selectedDate
    );
    const dailyRevenue = filteredOrders.reduce(
      (total, order) => total + order.Total,
      0
    );
    return dailyRevenue;
  };

  const getAllOrderDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders/getAllOrderDetails"
      );
      setAllOrderDetails(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMostFamousMainDish();
    getMostFamousSideDish();
    getAllOrderDetails();
  }, []);

  return (
    <div className="report-container">
      <div className="revenue-report">
        <Card>
          <div className="date-field">
            <label
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Select a date:
            </label>
            <input
              type="date"
              id="datePicker"
              name="datePicker"
              placeholder="Select a date:"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ marginLeft: "80px" }}
            />
          </div>

          <div className="renenue-field">
            <label
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Daily sales revenue:
            </label>
            <p
              style={{
                marginTop: "40px",
                marginLeft: "80px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {dailyRevenue}
            </p>
          </div>
        </Card>
        <Card style={{ marginTop: "30px" }}>
          <div className="favouriteDish-field">
            <label style={{}}>Most famous main dish:</label>
            <p
              style={{
                marginLeft: "50px",
              }}
            >
              {mostFamousMainDish.length > 0
                ? mostFamousMainDish[0].MainDishName
                : "Loading..."}
            </p>{" "}
          </div>
        </Card>

        <Card style={{ marginTop: "30px" }}>
          <div className="favouriteDish-field">
            <label>Most famous side dish.:</label>
            <p style={{ marginLeft: "50px" }}>
              {mostFamousSideDish.length > 0
                ? mostFamousSideDish[0].SideDishName
                : "Loading..."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Reports;
