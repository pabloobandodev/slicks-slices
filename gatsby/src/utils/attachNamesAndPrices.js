import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const attachNamesAndPrices = (order, pizzas) =>
  order.map((singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return {
      ...singleOrder,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size)),
    };
  });

export default attachNamesAndPrices;
