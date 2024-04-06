import React from 'react';

const AttributeInput = ({ attribute, data, onCambio }) => {
  const handleChange = (field, value) => {
    const newData = { ...data, [field]: parseInt(value, 10) || 0 };
    onCambio(attribute, newData);
  };

  return (
    <div>
      <h4>{attribute}</h4>
      <label>
        Nivel:
        <input
          type="number"
          value={data.level}
          onChange={e => handleChange('level', e.target.value)}
        />
      </label>
      <label>
        Modificador:
        <input
          type="number"
          value={data.mod}
          onChange={e => handleChange('mod', e.target.value)}
        />
      </label>
      <p>Total: {data.total}</p>
    </div>
  );
};

export default AttributeInput;