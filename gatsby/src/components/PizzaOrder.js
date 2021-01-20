import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    {order.map((singleOrder, index) => {
      const pizza = pizzas.find(
        (singlePizza) => singlePizza.id === singleOrder.id
      );
      return (
        <MenuItemStyles key={singleOrder.id}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{pizza.name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </p>
        </MenuItemStyles>
      );
    })}
  </>
);

export default PizzaOrder;
