const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

// Monster data
let monsters = [
  {
    id: "blue-eyes-white-dragon",
    name: "Blue-Eyes White Dragon",
    image: "images/blue-eyes-white-dragon.jpg",
    level: 8,
    biotext: "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
    type: "Dragon / Normal",
    attribute: "Light",
    attack: "3000",
    defense: "2500",
    cardart: [
      "images/blue-eyes-white-dragon2.jpg",
      "images/blue-eyes-white-dragon3.jpg",
      "images/blue-eyes-white-dragon4.jpg"
    ]
  },
  {
    id: "elzette-of-the-white-forest",
    name: "Elzette of the White Forest",
    image: "images/elzette-of-the-white-forest.jpg",
    level: 2,
    biotext: "You can send 1 Spell/Trap from your hand or field to the GY; Special Summon this card from your hand, then add 1 'White Forest' monster from your Deck to your hand, except 'Elzette of the White Forest'...",
    type: "Spellcaster / Effect",
    attribute: "Light",
    attack: "0",
    defense: "0",
    cardart: []
  },
  {
    id: "bahamut-shark",
    name: "Bahamut Shark",
    image: "images/bahamut-shark.jpg",
    level: 4,
    biotext: "Once per turn: You can detach 1 material from this card; Special Summon 1 Rank 3 or lower WATER Xyz Monster from your Extra Deck. This card cannot attack for the rest of this turn.",
    type: "Sea Serpent / Xyz / Effect",
    attribute: "Water",
    attack: "2600",
    defense: "2100",
    cardart: []
  },
  {
    id: "toadally-awesome",
    name: "Toadally Awesome",
    image: "images/toadally-awesome.jpg",
    level: 2,
    biotext: "Once per turn, during the Standby Phase: You can detach 1 material from this card; Special Summon 1 'Frog' monster from your Deck...",
    type: "Aqua / Xyz / Effect",
    attribute: "Water",
    attack: "2200",
    defense: "0",
    cardart: []
  }
];

// Forum posts
let forumPosts = [
  {
    id: 1,
    title: "Is Branded Despia Still Meta in 2025?",
    content: "With the latest banlist changes and new support cards coming out, do you think Branded Despia is still a top-tier deck?",
    image: null
  },
  {
    id: 2,
    title: "Can You Chain to Super Polymerization?",
    content: "Hey everyone, I’ve been getting mixed answers about Super Polymerization and whether or not it can be negated or chained to.",
    image: null
  },
  {
    id: 3,
    title: "Which Archetype Deserves New Support?",
    content: "Hey! If Konami brought back a classic archetype, which would you choose — Blackwings, Infernities, Six Samurai?",
    image: null
  }
];

let nextId = 4;

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/monsters", (req, res) => {
  res.send(monsters);
});

app.get("/api/forum-posts", (req, res) => {
  res.send(forumPosts);
});

app.post("/api/forum-posts", upload.single("image"), (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      content: Joi.string().min(10).required()
    });

    const { title, content } = req.body;
    const { error } = schema.validate({ title, content });
    if (error) return res.status(400).send(error.details[0].message);

    const newPost = {
      id: nextId++,
      title,
      content,
      image: req.file ? `/images/${req.file.filename}` : null
    };

    forumPosts.unshift(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error posting forum discussion:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/forum-posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log("Looking for post ID:", postId);
  console.log("Available IDs:", forumPosts.map(p => p.id));

  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(10).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = forumPosts.find(p => p.id === postId);
  if (!post) return res.status(404).send("Post not found");

  post.title = req.body.title;
  post.content = req.body.content;

  res.status(200).json(post);
});

app.delete("/api/forum-posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = forumPosts.findIndex(p => p.id === postId);
  if (index === -1) return res.status(404).send("Post not found");

  const deleted = forumPosts.splice(index, 1);
  res.status(200).json(deleted[0]);
});

app.listen(3001, () => {
  console.log("Yugiverse server listening on port 3001");
});