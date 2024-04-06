import React, { useState, useEffect } from 'react';
import HabilidadInput from './abilityInput';
import AttributeInput from './attributeInput';


  
const CharacterSheet = () => {
  const [character, setCharacter] = useState({
    image: '',
    name: '',
    backgrounds: '',
    profession: '',
    race: '',
    size: 0,
    nodesGeneral: 0,
    nodesSpecific: 0,
    renoun: 0,
    prestige: 1,
    attributes: {
      body: { level: 1, mod: 0, total: 0 },
      nerves: { level: 1, mod: 0, total: 0 },
      mind: { level: 1, mod: 0, total: 0 },
    },
    attributePred: '',
    magic: '',
    weapon: '',
    abilities: {
      body: {
        'Sensibilidad Arcana': { level: 0, mod: 0, total: 0 },
        'Esculpir/Forjar/Tallar': { level: 0, mod: 0, total: 0 },
        'Construir/Picar/Talar': { level: 0, mod: 0, total: 0 },
        'Atletismo': { level: 0, mod: 0, total: 0 },
        'Cocina': { level: 0, mod: 0, total: 0 },
        'Primeros Auxilios': { level: 0, mod: 0, total: 0 },
        'Escalada/Nado': { level: 0, mod: 0, total: 0 },
        'Excavación': { level: 0, mod: 0, total: 0 },
        'Ascetismo/Rezos': { level: 0, mod: 0, total: 0 },
        'Kinestesia': { level: 0, mod: 0, total: 0 },
        'Presencia': { level: 0, mod: 0, total: 0 },
        'Orientación': { level: 0, mod: 0, total: 0 },
        'Conducir/Montar': { level: 0, mod: 0, total: 0 },
      },
      nerves: {
        'Encantar Objeto': { level: 0, mod: 0, total: 0 },
        'Interpretar': { level: 0, mod: 0, total: 0 },
        'Juego de Manos': { level: 0, mod: 0, total: 0 },
        'Sigilo': { level: 0, mod: 0, total: 0 },
        'Venenos': { level: 0, mod: 0, total: 0 },
        'Intervención Médica': { level: 0, mod: 0, total: 0 },
        'Acrobacias': { level: 0, mod: 0, total: 0 },
        'Desactivar Trampas': { level: 0, mod: 0, total: 0 },
        'Rituales': { level: 0, mod: 0, total: 0 },
        'Percepción': { level: 0, mod: 0, total: 0 },
        'Seducción': { level: 0, mod: 0, total: 0 },
        'Rastreo/Recolección': { level: 0, mod: 0, total: 0 },
        'Doma': { level: 0, mod: 0, total: 0 },
      },
      mind: {
        'Conocimiento Arcana': { level: 0, mod: 0, total: 0 },
        'Disfrazarse': { level: 0, mod: 0, total: 0 },
        'Mecanismos Complejos': { level: 0, mod: 0, total: 0 },
        'Concentración/Meditación': { level: 0, mod: 0, total: 0 },
        'Alquimia': { level: 0, mod: 0, total: 0 },
        'Conocimiento Medicina': { level: 0, mod: 0, total: 0 },
        'Cartografía': { level: 0, mod: 0, total: 0 },
        'Conocimiento Historia': { level: 0, mod: 0, total: 0 },
        'Conocimiento Religión': { level: 0, mod: 0, total: 0 },
        'Investigación/Perspicacia': { level: 0, mod: 0, total: 0 },
        'Trato Social': { level: 0, mod: 0, total: 0 },
        'Conocimiento Naturaleza': { level: 0, mod: 0, total: 0 },
        'Conocimiento Fauna': { level: 0, mod: 0, total: 0 },
      }
    }
  })
  
  // Función para manejar cambios en atributos
  const handleAttributeChange = (attribute, newData) => {
    // solo actualizamos el estado, el total se recalcula en useEffect
    setCharacter(prevCharacter => ({
      ...prevCharacter,
      attributes: {
        ...prevCharacter.attributes,
        [attribute]: {
          ...newData
        }
      }
    }));
  };

  // Función para manejar cambios en habilidades
  const handleSkillChange = (category, skill, data) => {
    setCharacter(prev => ({
      ...prev,
      abilities: {
        ...prev.abilities,
        [category]: {
          ...prev.abilities[category],
          [skill]: {
            ...data
          }
        }
      }
    }));
  };

  // useEffect para recalcular totales cada vez que cambia character
  useEffect(() => {
    const recalculateTotals = () => {
      const newCharacter = { ...character };

      // Recalcular totales de atributos
      Object.keys(newCharacter.attributes).forEach(attr => {
        const attrData = newCharacter.attributes[attr];
        attrData.total = attrData.level + attrData.mod;
      });

      // Recalcular totales de habilidades
      Object.keys(newCharacter.abilities).forEach(category => {
        const categorySkills = newCharacter.abilities[category];
        Object.keys(categorySkills).forEach(skill => {
          const skillData = categorySkills[skill];
          const attributeTotal = newCharacter.attributes[category].total;
          skillData.total = skillData.level + skillData.mod + attributeTotal;
        });
      });

      setCharacter(newCharacter);
    };

    recalculateTotals();
  }, [character]); // Este efecto se activa cada vez que character cambia

    const renderAttributes = () => {
      return Object.entries(character.attributes).map(([attribute, data]) => (
        <AttributeInput
          key={attribute}
          attribute={attribute}
          data={data}
          onCambio={handleAttributeChange}
        />
      ));
    };
  
    const renderSkills = (category) => {
      return Object.entries(character.abilities[category] || {}).map(([skill, data]) => (
        <HabilidadInput
          key={skill}
          habilidad={skill}
          datos={data}
          atributoTotal={character.attributes[category].total}
          onCambio={(skillName, newData) => handleSkillChange(category, skillName, newData)}
        />
      ));
    };


  return (
    <form>
      <label>
        Nombre:
        <input
          type="text"
          value={character.name}
          onChange={e => setCharacter({ ...character, name: e.target.value })}
        />
      </label>
      {/* Campos adicionales para clase, raza, nivel, etc. */}
      
      <div>
        <h3>Atributos</h3>
        {renderAttributes()}
      </div>

      <div>
        <h3>Cuerpo</h3>
        {renderSkills('body')} 
      </div>
      
      <div>
        <h3>Nervios</h3>
        {renderSkills('nerves')} 
      </div>

      <div>
        <h3>Mente</h3>
        {renderSkills('mind')} 
      </div>
      
      <button type="submit">Guardar Ficha</button>
    </form>
  );
};

export default CharacterSheet;