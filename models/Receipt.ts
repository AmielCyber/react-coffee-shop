import type Order from "./Order";

interface Receipt extends Order {
  name: string;
  email: string;
}

export default Receipt;
