import { RiDeleteBack2Fill, RiEdit2Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "./FormData";

axios.defaults.baseURL = "http://localhost:8080/";

const SignUp = () => {
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({});
  const [Edit, setEditData] = useState({});
  const [dataList, setDataList] = useState([]);
  const [updatedData, setUpdateData] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const handleClose = () => {
    setAdd(false);
  };

  const handleUpdateCLose = () => {
    setUpdateData(false);
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (x) => {
    setUpdateData(true);
    setEditData(x);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAdd(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
      // alert(data.data.message)
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const dataDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
    }
    alert(data.data.message);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    console.log(Edit);
    const data = await axios.put("/update/" + id, { ...Edit });
    if (data.data.success) {
      setUpdateData(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  return (
    <>
      <div className="container">
        {/* ADD  */}
        <button className="btn btnAdd" onClick={handleAdd}>
          Add
        </button>

        {/* CREATE */}

        {add && (
          <FormData
            handleChange={handleChange}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            rest={formData}
          />
        )}

        {updatedData && (
          <FormData
            handleChange={handleEditChange}
            handleClose={handleUpdateCLose}
            handleSubmit={(e) => handleUpdate(e, Edit)}
            rest={Edit}
          />
        )}

        {/* READ - DELETE  */}
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Mobile Number</th>
                <th></th>
              </tr>
            </thead>

            {dataList[0] ? (
              <tbody>
                {dataList.map((x) => (
                  <tr key={x._id}>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                    <td>{x.mobile}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        // onClick={() => updateData(x._id)}
                        onClick={() => handleEdit(x)}
                      >
                        <RiEdit2Fill />
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => dataDelete(x._id)}
                      >
                        <RiDeleteBack2Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p>NO DATA</p>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default SignUp;
