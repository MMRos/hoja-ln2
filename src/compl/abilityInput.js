import '../App.css';

const HabilidadInput = ({ habilidad, datos, onCambio, atributoTotal, prestige }) => {
  console.log("Prestige actual:", prestige); // Mostrar el valor actual de prestige para verificar

  // Función para manejar cambios en los inputs de nivel y modificador
  const handleChange = (e, key) => {
    const updatedValue = parseInt(e.target.value, 10) || 0;
    const updatedDatos = { ...datos, [key]: updatedValue };
    
    console.log(`Valor actualizado de ${key}:`, updatedValue); // Mostrar los valores actualizados

    // Actualizar el total de la habilidad
    if (updatedDatos.level > 0) {
      updatedDatos.total = updatedDatos.level + updatedDatos.mod + atributoTotal + prestige;
      console.log("Nuevo total con Prestige:", updatedDatos.total); // Mostrar el total con prestige
    } else {
      updatedDatos.total = updatedDatos.level + updatedDatos.mod + atributoTotal;
    }
    
    onCambio(habilidad, updatedDatos);
  };

  return (
      <div className="absTable">
      <label style={{ gridColumn: 'span 7', }}>{habilidad}:</label>
      <input
        className='colorInput smallInput'
        style={{ gridColumn: 'span 1', marginLeft:'-1px'}}  
        type="number"
        value={datos.level}
        onChange={e => handleChange(e, 'level')}
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

export default HabilidadInput;
