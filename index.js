const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect(
  "mongodb+srv://mytabletcapim:xlQItyJcd2ix7FH7@to-do-listapi.ykqfwna.mongodb.net/?retryWrites=true&w=majority&appName=To-Do-ListApi"
);
const List = mongoose.model("List", {
  title: String,
  description: String,
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
app.get("/", async (req, res) => {
  const lists = await List.find();
  res.send(lists);
});

app.delete("/:id", async (req, res) => {
  const list = await List.findByIdAndDelete(req.params.id);
  return res.send(list);
});
app.put("/:id", async (req, res) => {
  const list = await List.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      date: new Date(req.body.date),
    },
    {
      new: true,
    }
  );
  return res.send(list);
});
app.post("/", async (req, res) => {
  const list = new List({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    date: new Date(req.body.date),
  });

  await list.save();
  return res.send(list);
});
app.listen(port, () => {
  console.log("App running");
});
