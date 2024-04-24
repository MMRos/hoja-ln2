import '../App.css';

const HabilidadInput = ({ habilidad, datos, onCambio, atributoTotal }) => {
  // Función para manejar cambios en los inputs de nivel y modificador
  const handleChange = (e, key) => {
    // Asumiendo que los valores son numéricos y se necesita calcular el total automáticamente
    const updatedValue = parseInt(e.target.value, 10) || 0;
    const updatedDatos = { ...datos, [key]: updatedValue };
    
    // Actualizar el total de la habilidad basado en el nuevo nivel o modificador, sumando también el total del atributo relevante
    if (key === 'nivel' || key === 'mod') {
      updatedDatos.total = updatedDatos.nivel + updatedDatos.mod + atributoTotal;
    }
    
    onCambio(habilidad, updatedDatos);
  };

  return (
      <div className="absTable"  >
      <label style={{ gridColumn: 'span 7', }}>{habilidad}:</label>
      <input
        className='colorInput smallInput'
        style={{ gridColumn: 'span 1', marginLeft:'-1px'}}  
        type="number"
          value={datos.nivel}
          onChange={e => handleChange(e, 'nivel')}
      />
      <input
          style={{ gridColumn: 'span 1', marginLeft:'-1px'}} 
          className='colorInput smallInput'
          type="number"
          value={datos.mod}
          onChange={e => handleChange(e, 'mod')}
      />
      <span className='valueSpan colorSpan' style={{ gridColumn: 'span 1', }} >{datos.total}</span>
      </div>
  );
};

export default HabilidadInput