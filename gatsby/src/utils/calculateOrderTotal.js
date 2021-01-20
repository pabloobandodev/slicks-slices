import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = (order, pizzas) =>
  order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);

export default calculateOrderTotal;
