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
    <div className="habilidad">
      <label>{habilidad}:</label>
      <input
        type="number"
        value={datos.nivel}
        onChange={e => handleChange(e, 'nivel')}
      />
      <input
        type="number"
        value={datos.mod}
        onChange={e => handleChange(e, 'mod')}
      />
      {/* El span muestra el total calculado, incluyendo el total del atributo relevante */}
      <span>Total: {datos.total}</span>
    </div>
  );
};

export default HabilidadInput