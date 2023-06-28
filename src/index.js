//to run the project : npm run dev

const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname, `../templates`)

app.use(express.json())
app.use(express.static(templatePath))
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/signup", (req, res) => {
  res.render("signup")
})

app.get("/home", (req, res) => {
  res.render("home")
})

app.get("/demo", (req, res) => {
  res.render("demo")
})

app.get("/knowmore", (req, res) => {
  res.render("knowmore")
})

app.get("/splashscreen", (req, res) => {
  res.render("splashscreen")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/quotes", (req, res) => {
  res.render("quotes")
})

app.get("/landingPage", (req, res) => {
  res.render("landingPage")
})

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  await collection.insertMany([data])
  res.render("login")
})

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email })
    if (check.password === req.body.password) {
      res.render("landingPage")
    } else {
      res.send("Wrong password")
    }
  } catch {
    res.send("Wrong details")
  }
})

app.listen(3000, () => {
  console.log("port connected !!")
})
