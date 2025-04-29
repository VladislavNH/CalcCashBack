import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = 
styled.div`margin-bottom: 16px; 
display: flex; 
gap: 8px;`;
const Input = 
styled.input`flex: 1;
 padding: 8px; 
 font-size: 1rem; 
 border: 1px solid #ccc; 
 border-radius: 4px;`;
const Button = 
styled.button
`padding: 8px 12px; 
font-size: 1rem; 
background:rgb(0, 79, 236); 
color: #fff; 
border: none; 
border-radius: 4px; 
cursor: pointer;`;

export function MccSearch({ onFound }) {
  const [code, setCode] = useState('');
  const handleSearch = () => {
    const mcc = parseInt(code, 10);
    if (isNaN(mcc)) return;
    onFound(mcc);
  };

  return (
    <Wrapper>
      <Input
        type="number"
        placeholder="Найти категорию по MCC"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <Button onClick={handleSearch}>Найти</Button>
    </Wrapper>
  );
}
