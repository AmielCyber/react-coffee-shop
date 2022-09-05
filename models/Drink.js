export default class Drink {
  constructor(id, name, ounces, description, price, imgSrc, ogSrc) {
    this.id = id; // String
    this.name = name; // String
    this.ounces = ounces; // Number
    this.description = description; // String
    this.price = price; // Number
    this.imgSrc = imgSrc; // String
    this.ogSrc = ogSrc; // String
  }
}
