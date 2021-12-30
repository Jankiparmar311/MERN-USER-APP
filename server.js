
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dcs")
.then(()=>console.log("MOngo db connected"));


const userModel = require("./models/user");



app.get("/api/", (req, res) => res.send("Hello World!"));

app.get("/api/list",async (req,res) => {
  const userList = await userModel.find({},{ username : true , age:true , name:true , password:true});

  if(userList.length == 0){
    return res.json({ data: "no user in fullstack" });
  }

  return res.json({ data : userList });
});

app.post("/api/Register", (req, res) => {
  const newUser = req.body;
  userModel.create(newUser);
  return res.json({ data: "registered successfully "});
});

//login user
app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({ username: username, password: password });

  if(user){
    return res.json({ data: "login successfully "});
  }

  return res.json({ data: "wrong credential "});
});

//update user
app.put("/api/updateuser/:username",async (err, req,res, next) =>{
  const username = req.params.username;
  const password = req.body.password;
  const name = req.body.name;
  const age = req.body.age;
    
  const updateUser = await userModel.findOneAndUpdate(
    { username :username},
    { password : password },
    { name : name },
    { age : age },
    { new : true }
  );

  console.error(err.stack);
  res.status(500).send('something broke');
  next(err);
  return res.json({ data: "password update successfully "});
});


//delete user
app.delete("/api/deleteuser/:username",async (req,res) =>{
  
  const deleteduser = await userModel.findOneAndDelete({username : req.params.username});
  return res.json({ data: "User deleted successfully "});
});


app.listen(port, () => console.log(`server running on port 5000`));

