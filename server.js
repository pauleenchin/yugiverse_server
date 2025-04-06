const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

let monsters = [
    {
        "id": "blue-eyes-white-dragon",
        "name": "Blue-Eyes White Dragon",
        "image": "images/blue-eyes-white-dragon.jpg",
        "level": 8,
        "biotext": "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
        "type": "Dragon / Normal",
        "attribute": "Light",
        "attack": "3000",
        "defense": "2500",
        "cardart": [
            "blue-eyes-white-dragon2.jpg",
            "blue-eyes-white-dragon3.jpg",
            "blue-eyes-white-dragon4.jpg"
        ]
    },
    {
        "id": "elzette-of-the-white-forest",
        "name": "Elzette of the White Forest",
        "image": "images/elzette-of-the-white-forest.jpg",
        "level": 2,
        "biotext": "You can send 1 Spell/Trap from your hand or field to the GY; Special Summon this card from your hand, then add 1 \"White Forest\" monster from your Deck to your hand, except \"Elzette of the White Forest\". During your opponent's turn, if a LIGHT Spellcaster Tuner is Special Summoned to your field, while this card is in your GY (except during the Damage Step): You can add this card to your hand. You can only use each effect of \"Elzette of the White Forest\" once per turn.",
        "type": "Spellcaster / Effect",
        "attribute": "Light",
        "attack": "0",
        "defense": "0",
        "cardart": [
        ]
    },
    {
        "id": "bahamut-shark",
        "name": "Bahamut Shark",
        "image": "images/bahamut-shark.jpg",
        "level": 4,
        "biotext": "Once per turn: You can detach 1 material from this card; Special Summon 1 Rank 3 or lower WATER Xyz Monster from your Extra Deck. This card cannot attack for the rest of this turn.",
        "type": "Sea Serpent / Xyz / Effect",
        "attribute": "Water",
        "attack": "2600",
        "defense": "2100",
        "cardart": [
        ]
    },
    {
        "id": "toadally-awesome",
        "name": "Toadally Awesome",
        "image": "images/toadally-awesome.jpg",
        "level": 2,
        "biotext": "Once per turn, during the Standby Phase: You can detach 1 material from this card; Special Summon 1 \"Frog\" monster from your Deck. Once per turn, when your opponent activates a Spell/Trap Card, or monster effect (Quick Effect): You can send 1 Aqua monster from your hand or face-up field to the GY; negate the activation, and if you do, destroy that card, then you can Set it to your field. If this card is sent to the GY: You can target 1 WATER monster in your GY; add it to your hand.",
        "type": "Aqua / Xyz / Effect",
        "attribute": "Water",
        "attack": "2200",
        "defense": "0",
        "cardart": [
        ]
    },
    {
        "id": "mulcharmy-purulia",
        "name": "Mulcharmy Purulia",
        "image": "images/mulcharmy-purulia.jpg",
        "level": 4,
        "biotext": "If you control no cards (Quick Effect): You can discard this card; apply these effects this turn. \nEach time your opponent Normal or Special Summons a monster(s) from the hand, immediately draw 1 card. \nOnce, during this End Phase, if the number of cards in your hand is more than the number of cards your opponent controls +6, you must randomly shuffle cards from your hand into the Deck so the number in your hand equals the number your opponent controls +6. \nYou can only activate 1 other \"Mulcharmy\" monster effect, the turn you activate this effect.",
        "type": "Aqua / Xyz / Effect",
        "attribute": "Water",
        "attack": "2200",
        "defense": "0",
        "cardart": [
        ]
    },
    {
        "id": "naturia-exterio",
        "name": "Naturia Exterio",
        "image": "images/naturia-exterio.jpg",
        "level": 10,
        "biotext": "\"Naturia Beast\" + \"Naturia Barkion\"\nA Fusion Summon of this card can only be done with the above Fusion Materials. When a Spell/Trap Card is activated (Quick Effect): You can banish 1 card from your GY, then send the top card of your Deck to the GY; negate the activation, and if you do, destroy that card. This card must be face-up on the field to activate and to resolve this effect.",
        "type": "Beast / Fusion ／ Effect",
        "attribute": "Earth",
        "attack": "2800",
        "defense": "2400",
        "cardart": [
        ]
    },
    {
        "id": "tornado-dragon",
        "name": "Tornado Dragon",
        "image": "images/tornado-dragon.jpg",
        "level": 4,
        "biotext": "Once per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
        "type": "Wyrm / Xyz ／ Effect",
        "attribute": "Wind",
        "attack": "2100",
        "defense": "2000",
        "cardart": [
        ]
    },
    {
        "id": "mystic-tomato",
        "name": "Mystic Tomato",
        "image": "images/mystic-tomato.jpg",
        "level": 4,
        "biotext": "When this card is destroyed by battle and sent to the GY: You can Special Summon 1 DARK monster with 1500 or less ATK from your Deck in Attack Position.",
        "type": "Plant / Effect",
        "attribute": "Dark",
        "attack": "1400",
        "defense": "1100",
        "cardart": [
            "mystic-tomato2.webp"
        ]
    }
];

app.get("/api/monsters", (req, res)=>{
    res.send(monsters);
});

app.listen(3001, ()=>{
    console.log("listening");

});