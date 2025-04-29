import React from 'react';
import styled from 'styled-components';

const Form = 
styled.div
`margin-bottom: 24px;`;
const Input = 
styled.input
`width: 100%; 
padding: 8px; 
font-size: 1rem; 
margin-bottom: 12px; 
border: 1px solid #ccc;
 border-radius: 4px;`;
const Select = 
styled.select`width: 100%; 
padding: 8px; 
font-size: 1rem; 
margin-bottom: 12px; 
border: 1px solid #ccc; 
border-radius: 4px;`;
const Button = 
styled.button
`width: 100%; padding: 10px;
 font-size: 1rem; 
 background: #1890ff; 
 color: #fff; border: none; 
 border-radius: 4px; 
 cursor: pointer;
  &:disabled { background: #a0cfff; cursor: default; }
`;

export function PurchaseForm({ amount, cat, options, onAmountChange, onCategoryChange, onCalculate }) {
  return (
    <Form>
      <Input
        type="number"
        placeholder="Сумма ₽"
        value={amount}
        onChange={e => onAmountChange(e.target.value)}
      />
      <Select 
      value={cat} 
      onChange= 
      {e => onCategoryChange(e.target.value)}
      >
        {options.map
        (c => <option
         key={c.id} 
         value={c.id}>
          {c.name}
          </option>)}
      </Select>
      <Button 
      onClick={onCalculate} 
      disabled={!amount}>
        Рассчитать кешбэк
      </Button>
    </Form>
  );
}