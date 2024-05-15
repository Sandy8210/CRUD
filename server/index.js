const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

const app = express();
app.use(cors());

// ? Convert a data into json format

app.use(express.json());

// ! PORT NUMBER

const PORT = process.env.PORT || 8080;

// ? Schema DATA

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

// ! Create a Mongoose model based on the schema
const userModel = mongoose.model("user", schemaData);

// ! READ A DATA -- http://localhost:8080/
app.get("/", async (req, res) => {
  try {
    const data = await userModel.find({});

    // ! Convert timestamps to Indian Standard Time (IST)

    const dataInIST = data.map((doc) => ({
      ...doc.toObject(), // ! Mongoose document to  plain JS object
      createdAt: moment(doc.createdAt).tz("Asia/Kolkata").format(), // ? Convert createdAt to IST, tz-[timeZone] ,moment [moment.js] library function
      updatedAt: moment(doc.updatedAt).tz("Asia/Kolkata").format(), // ? Convert updatedAt to IST, tz-[timeZone] , moment [moment.js] library function
    }));

    res.json({ success: true, data: dataInIST });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ! CREATE DATA || SAVE DATA IN MONGO-DB  -- http://localhost:8080/create

app.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const data = new userModel(req.body);

    // ! Save the data in mongo-db
    // ? send a schema data and add to the createdAt [ created data date and time ] , updatedAt [ update data date and time ] in utc-Universal Time Coordinated

    await data.save();
    res.send({ success: true, message: "data send successful", data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ! UPDATE DATA --http://localhost:8080/update
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findByIdAndUpdate(id, req.body); // Using extracted id
    res.send({ success: true, message: "data update successful", data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ! DELETE DATA -- http://localhost:8080/delete/

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "data deleted successful", data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ! MONGOOSE NEW CONNECTION LINK / DATABASE NAME
// ! ANY ERROR TO CONNECT THE MONGO-DB USE  [IP:ADDRESS = localhost]
// ? "mongodb:// [IP address] :27017/crudoperation"

mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => {
    console.log("successfully connected the DB");
    app.listen(PORT, () => {
      console.log("Server is running on Port 8080");
    });
  })
  .catch((err) => console.log(err));
