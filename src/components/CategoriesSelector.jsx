import React from 'react';
import styled from 'styled-components';

const Grid = 
styled.div`display: grid; 
grid-template-columns: repeat(2, 1fr);
 gap: 12px; 
 margin-bottom: 24px;`;
const Card = 
styled.label`
  display: flex; 
  align-items: center;
   padding: 12px; 
   border: 1px solid #ddd;
  border-radius: 6px;
   cursor: pointer;
    user-select: none;
  background: ${({ checked }) => (checked ? '#f0f8ff' : '#fff')};
  &:hover { border-color: #aaa; }
`;
const Checkbox = 
styled.input`margin-right: 8px;`;

export function CategoriesSelector({ categories, chosen, onToggle }) {
  return (
    <div>
      <h4>Выбор категорий (до 4)</h4>
      <Grid>
        {categories.filter(c => c.id !== 'ALL_1').map(c => (
          <Card key={c.id} checked={chosen.includes(c.id)}>
            <Checkbox
              type="checkbox"
              disabled={!chosen.includes(c.id) && chosen.length >= 4}
              checked={chosen.includes(c.id)}
              onChange={() => onToggle(c.id)}
            />
            {c.name}
          </Card>
        ))}
      </Grid>
      <p>1% на всё будет доступен всегда</p>
    </div>
  );
}