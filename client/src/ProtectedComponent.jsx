// client/src/components/ProtectedComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProtectedComponent = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/protected", {
          headers: {
            Authorization: token,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message || "Failed to fetch data");
      }
    };

    fetchProtectedData();
  }, []);

  return <div>{message}</div>;
};

export default ProtectedComponent;
