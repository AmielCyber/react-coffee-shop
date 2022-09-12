// My nodejs script to make the JSON object for drinks in my server.
const fs = require("fs");

const ESPRESSO = {
  id: "espresso",
  name: "Espresso Shot",
  ounces: 1,
  description: "For the coffee connoisseur.",
  price: 3.5,
  imgSrc: "/drinkImages/espresso.jpg",
  originalSource: "Image by @nate_dumlao from unsplash.com",
};
const AMERICANO = {
  id: "americano",
  name: "Americano",
  ounces: 6,
  description:
    "For those who want a plain coffee drink but with the taste of espresso. Made of 2 ounces of espresso and 4 ounces of hot water.",
  price: 4,
  imgSrc: "/drinkImages/americano.jpg",
  originalSource: "Image by @cdib925 from unsplash.com",
};
const CORTADO = {
  id: "cortado",
  name: "Cortado",
  ounces: 3,
  description:
    "For those that want to taste the espresso with just the right amount of milk. Made of 1 ounce of espresso, 2 ounces of milk, and a thin layer of foam on the top.",
  price: 3.75,
  imgSrc: "/drinkImages/cortado.jpg",
  originalSource: "Image by @relentlessjpg from unsplash.com",
};
const MACCHIATO = {
  id: "macchiato",
  name: "Macchiato",
  ounces: 3,
  description:
    "For those that want to taste our espresso with a whip of cream. Made of 2 ounces of espresso and 1 ounce of milk foam.",
  price: 3.75,
  imgSrc: "/drinkImages/macchiato.jpg",
  originalSource: "Image by @13on from unsplash.com",
};
const FLAT_WHITE = {
  id: "flatWhite",
  name: "Flat White",
  ounces: 6,
  description:
    "For those who wished the latte had more of an espresso taste. Made of 2 ounces of espresso and 4 ounces of steam milk.",
  price: 4.5,
  imgSrc: "/drinkImages/flatWhite.jpg",
  originalSource: "Image by @hoanvokim from unsplash.com",
};
const CAPPUCCINO = {
  id: "cappuccino",
  name: "Cappuccino",
  ounces: 6,
  description:
    "For those that prefer more of the milk foam texture. Made of 2 ounces of espresso, 2 ounces of milk foam, and 2 ounces of steamed milk.",
  price: 4.5,
  imgSrc: "/drinkImages/cappuccino.jpg",
  originalSource: "Image by @nadyeldems from unsplash.com",
};
const LATTE = {
  id: "latte",
  name: "Latte",
  ounces: 10,
  description:
    "The most popular espresso drink. For those that love milk in their drinks. Made of 2 ounces of espresso and 8 ounces of steamed milk.",
  price: 5,
  imgSrc: "/drinkImages/latte.jpg",
  originalSource: "Image by @taisiia_shestopal from unsplash.com",
};
const DRIP_COFFEE = {
  id: "dripCoffee",
  name: "Drip Coffee",
  ounces: 8,
  description: "For those that just want a cup of hot coffee!",
  price: 3,
  imgSrc: "/drinkImages/dripCoffee.jpg",
  originalSource: "Image by @andrewtneel from unsplash.com",
};
const NITRO_BREW = {
  id: "nitroBrew",
  name: "Nitro Cold Brew",
  ounces: 8,
  description: "Cold brew infused with Nitro giving it a creamy texture.",
  price: 4.5,
  imgSrc: "/drinkImages/nitroBrew.jpg",
  originalSource: "Image by @schimiggy from unsplash.com",
};
const COLD_BREW = {
  id: "coldBrew",
  name: "Cold Brew",
  ounces: 8,
  description:
    "Coffee steeped in cold water giving it a less acidic signature and more caffeine.",
  price: 4.0,
  imgSrc: "/drinkImages/coldBrew.jpg",
  originalSource: "Image by @pariwatt from unsplash.com",
};
const ICED_LATTE = {
  id: "icedLatte",
  name: "Iced Latte",
  ounces: 10,
  description:
    "Hot espresso drinks may not be for everyone. For everyone else there is always an Iced Latte!",
  price: 5.0,
  imgSrc: "/drinkImages/icedLatte.jpg",
  originalSource: "Image by @pariwatt from unsplash.com",
};

const drinks = [
  ESPRESSO,
  AMERICANO,
  CORTADO,
  MACCHIATO,
  FLAT_WHITE,
  CAPPUCCINO,
  LATTE,
  DRIP_COFFEE,
  NITRO_BREW,
  COLD_BREW,
  ICED_LATTE,
];

const coffeJSON = JSON.stringify(drinks, null, 4);

fs.writeFile("drinks.json", coffeJSON, (err) => {
  if (err) {
    console.log(err.message);
  }
});
