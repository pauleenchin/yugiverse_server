const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// my monsters <3 <3 <3
let monsters = [
  {
    id: "blue-eyes-white-dragon",
    name: "Blue-Eyes White Dragon",
    image: "images/blue-eyes-white-dragon.jpg",
    level: 8,
    biotext: "This legendary dragon is a powerful engine of destruction...",
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
    biotext: "You can send 1 Spell/Trap from your hand or field to the GY...",
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
    biotext: "Once per turn: You can detach 1 material from this card...",
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
    biotext: "Once per turn, during the Standby Phase: You can detach...",
    type: "Aqua / Xyz / Effect",
    attribute: "Water",
    attack: "2200",
    defense: "0",
    cardart: []
  },
  {
    id: "mulcharmy-purulia",
    name: "Mulcharmy Purulia",
    image: "images/mulcharmy-purulia.jpg",
    level: 4,
    biotext: "If you control no cards (Quick Effect): You can discard this card...",
    type: "Aqua / Xyz / Effect",
    attribute: "Water",
    attack: "2200",
    defense: "0",
    cardart: []
  },
  {
    id: "naturia-exterio",
    name: "Naturia Exterio",
    image: "images/naturia-exterio.jpg",
    level: 10,
    biotext: "\"Naturia Beast\" + \"Naturia Barkion\"...",
    type: "Beast / Fusion ／ Effect",
    attribute: "Earth",
    attack: "2800",
    defense: "2400",
    cardart: []
  },
  {
    id: "tornado-dragon",
    name: "Tornado Dragon",
    image: "images/tornado-dragon.jpg",
    level: 4,
    biotext: "Once per turn (Quick Effect): You can detach 1 material...",
    type: "Wyrm / Xyz ／ Effect",
    attribute: "Wind",
    attack: "2100",
    defense: "2000",
    cardart: []
  },
  {
    id: "mystic-tomato",
    name: "Mystic Tomato",
    image: "images/mystic-tomato.jpg",
    level: 4,
    biotext: "When this card is destroyed by battle and sent to the GY...",
    type: "Plant / Effect",
    attribute: "Dark",
    attack: "1400",
    defense: "1100",
    cardart: [
      "images/mystic-tomato2.webp"
    ]
  }
];

// discussion posts
let forumPosts = [
  {
    id: 1,
    title: "Is Branded Despia Still Meta in 2025?",
    content: "With the latest banlist changes and new support cards coming out, do you think Branded Despia is still a top-tier deck?"
  },
  {
    id: 2,
    title: "Can You Chain to Super Polymerization?",
    content: "Hey everyone, I’ve been getting mixed answers about Super Polymerization and whether or not it can be negated or chained to."
  },
  {
    id: 3,
    title: "Which Archetype Deserves New Support?",
    content: "Hey! If Konami brought back a classic archetype, which would you choose — Blackwings, Infernities, Six Samurai?"
  }
];

// get all monsters
app.get("/api/monsters", (req, res) => {
  res.send(monsters);
});

// get all discussion posts
app.get("/api/forum-posts", (req, res) => {
  res.send(forumPosts);
});

// post a new discussion post
app.post("/api/forum-posts", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(10).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newPost = {
    id: forumPosts.length + 1,
    title: req.body.title,
    content: req.body.content
  };

  forumPosts.push(newPost);
  res.status(201).send(newPost);
});

app.listen(3001, () => {
  console.log("Yugiverse server listening on port 3001");
});