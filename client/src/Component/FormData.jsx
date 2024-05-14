import React from "react";
import "./SignUp";
import { IoMdClose } from "react-icons/io";

const FormData = ({ handleChange, handleClose, handleSubmit, rest }) => {
  return (
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
          value={rest.name}
        />

        <label htmlFor="email">E-Mail :</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile No :</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleChange}
          value={rest.mobile}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default FormData;
