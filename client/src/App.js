import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const initialobj = {
    stockSymbol: "AAPL",
    date: "2023-07-21",
  };

  const [formData, setFormData] = useState(initialobj);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/fetchStockData", initialobj)
      .then((response) => {
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const handleFormSave = () => {};

  const onchangeHandler = (e) => {
    console.log(e);
    // const newformData = { ...formData, stockSymbol: e.target.value };
    // setFormData(newformData);
  };
  console.log(formData);

  return (
    <>
      <form action="submit" onClick={handleFormSave}>
        <div>
          <label>Symbol of Stock :</label>
          <input
            type="text"
            placeholder="Enter symbol of stock"
            onChange={(e) => {
              onchangeHandler();
            }}
          ></input>
        </div>
        <div>
          <label>Date :</label>
          <input
            type="date"
            placeholder="select a date"
            onChange={(event) => {
              onchangeHandler();
            }}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
