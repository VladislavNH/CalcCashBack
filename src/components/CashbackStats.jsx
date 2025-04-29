import React from 'react';
import styled from 'styled-components';

const List = 
styled.ul`list-style: none;
 padding: 0; 
 margin: 0 0 16px;`;
const Item = 
styled.li`padding: 6px 0; 
border-bottom: 1px solid #eee;`;
const Total = 
styled.p`font-weight: bold;`;

export function CashbackStats({ byCategory, total, categories }) {
  return (
    <div>
      <h4>Статистика за месяц</h4>
      <List>
        {Object.entries(byCategory).map(([id, sum]) => {
          const name = categories.find(c => c.id === id)?.name || id;
          return <Item key={id}>{name}: {sum} ₽</Item>;
        })}
      </List>
      <Total>
        Всего начислено: {total} ₽
        </Total>
    </div>
  );
}