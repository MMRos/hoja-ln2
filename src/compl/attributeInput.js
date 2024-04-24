import React from 'react';
import '../App.css'

const AttributeInput = ({ attribute, data, onCambio }) => {
  const handleChange = (field, value) => {
    const newData = { ...data, [field]: parseInt(value, 10) || 0 };
    onCambio(attribute, newData);
  };
  
  // Objeto que mapea los atributos a sus textos correspondientes
  const attributeTexts = {
    body: 'Cuerpo',
    nerves: 'Nervio',
    mind: 'Mente'
  };

  const labelText = attributeTexts[attribute] || 'Atributo';

  return (
    <div style={{ display:'flex', flexDirection:'column' }}  className='absTable' >
      <div>
        <span style={{ marginLeft:'160px'}} >Nivel</span>
        <span>Mod</span>
        <span>Total</span>
      </div>

      <div className='absTable'>  
        <h3 style={{gridColumn: 'span 7'}}>{labelText}:</h3>
        <div          style={{ gridColumn: 'span 3', display:'inline-grid', gridAutoFlow: 'column', alignContent:'center', marginLeft:'2px'}}>
        <input
          style={{ gridColumn: 'span 1'}}
          type="number"
          className='smallInput colorInput'
          value={data.level}
          onChange={e => handleChange('level', e.target.value)}
        />

        <input
          style={{ gridColumn: 'span 1', marginLeft:'-2px'}}
          type="number"
          className='smallInput colorInput'
          value={data.mod}
          onChange={e => handleChange('mod', e.target.value)}
        />
      
        <span className='valueSpan colorSpan'
          style={{ gridAutoColumn:'span 1'}}
        >
         {data.total}
        </span>
        </div>
    </div>
    </div>
      );
};

export default AttributeInput;