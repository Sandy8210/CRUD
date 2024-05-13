import { IoMdClose } from "react-icons/io";
import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const SignUp = () => {
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAdd(false);
      alert(data.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const handleClose = () => {
    setAdd(false);
  };

  return (
    <>
      <div className="container">
        <button className="btn btnAdd" onClick={handleAdd}>
          Add
        </button>

        {add && (
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="close_btn" onClick={handleClose}>
                <IoMdClose />
              </div>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
              />

              <label htmlFor="email">E-Mail :</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              />

              <label htmlFor="mobile">Mobile No :</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                onChange={handleChange}
              />

              <button className="btn">Submit</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
