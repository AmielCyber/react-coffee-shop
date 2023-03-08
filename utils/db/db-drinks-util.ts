import prisma from "./prisma";

type DrinkInfo = {
  name: string;
  price: number;
}

type DrinkData = {
  drinks: Map<string, DrinkInfo>;
  errorMessage: string;
}

/**
 * Gets the drink list from the server with the correct price.
 * Makes sure that we get the data from our server instead of the front-end.
 * @returns drinkData ={drinks(Map):{key-id:string, value-{name:string, price:Number}}}}
 */
export default async function getDrinksFromServer():Promise<DrinkData>{
  // Drink data we will return.
  // Get drinks from our database.
  const drinkData: DrinkData = {
    drinks: new Map<string, DrinkInfo>(),
    errorMessage: "",
  }
  let drinkList;
  try {
    drinkList = await prisma.drink.findMany();
  } catch (error) {
    drinkData.errorMessage = "Fetching data failed!";
    return drinkData;
  }
  if(drinkList === null){
    drinkData.errorMessage = "Server could not fetch drink list!";
    return drinkData;
  }

  for (const key in drinkList) {
    drinkData.drinks.set(drinkList[key].id, {
      name: drinkList[key].name,
      price: drinkList[key].price,
    });
  }
  return drinkData;
}