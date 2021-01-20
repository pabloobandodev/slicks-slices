import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

const ItemGrid = ({ items }) => {
  console.log('item ', items);
  return (
    <ItemsGrid>
      {items.map((item) => (
        <ItemStyles>
          <p className="mark">{item.name}</p>
          <img
            width="500"
            height="400"
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
};

export default ItemGrid;
