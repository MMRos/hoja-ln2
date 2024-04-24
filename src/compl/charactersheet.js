import React, { useState, useEffect } from 'react';
import HabilidadInput from './abilityInput';
import AttributeInput from './attributeInput';
import '../App.css'; 

function CalcPrest(nodesGeneral, renoun) {
  let value = nodesGeneral + renoun
  let prestige;
  
  if (value >= 0 && value < 10) {
    prestige = 1;
  } else if (value >= 10 && value < 30) {
    prestige = 2;
  } else if (value >= 30 && value < 65) {
    prestige = 3;
  } else if (value >= 65 && value < 110) {
    prestige = 4;
  } else if (value >= 110 && value < 170) {
    prestige = 5;
  } else if (value >= 170 && value < 250) {
    prestige = 6;
  } else if (value >= 250 && value < 400) {
    prestige = 7;
  } else if (value >= 400 && value < 600) {
    prestige = 8;
  } else if (value >= 600 && value < 850) {
    prestige = 9;
  } else if (value >= 850) {
    prestige = 10;
  } else {
    console.log("Valor incorrecto en Prestigio o Renombre")
    return null;
  }
  return prestige;
}

  
const CharacterSheet = () => {
  const [character, setCharacter] = useState({
    image: '',
    name: '',
    archetype: '',
    backgrounds: '',
    profession: '',
    race: '',
    hitpoints: { total: 0, current: 0, mod: 0, },
    will: { total: 0, current: 0, expended: 0, max: 0,},
    size: {diminutuo: 0, pequeño: 0, mediano:0, grande: 0, enorme: 0, gigantesco: 0, },
    nodesGeneral: 0,
    nodesSpecific: 0,
    renoun: 0,
    prestige: 1,
    attributes: null,
    predAttribute: null,
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
  
  useEffect(() => {
    const attributes = {
      body: { level: 1, mod: 0, total: 0 },
      nerves: { level: 1, mod: 0, total: 0 },
      mind: { level: 1, mod: 0, total: 0 },
    };
    const predAttribute = [attributes.body, attributes.nerves, attributes.mind];

    setCharacter(prevCharacter => ({
      ...prevCharacter,
      attributes,
      predAttribute,
    }));
  }, []);

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
      let needsUpdate = false;
      const newCharacter = { ...character };
  
      if (newCharacter.attributes) {
        Object.keys(newCharacter.attributes).forEach(attr => {
          const attrData = newCharacter.attributes[attr];
          const total = attrData.level + attrData.mod;
          if (attrData.total !== total) {
            needsUpdate = true;
            attrData.total = total;
          }
        });
      }
  
      Object.keys(newCharacter.abilities).forEach(category => {
        if (newCharacter.abilities[category] && newCharacter.attributes && newCharacter.attributes[category]) {
          const categorySkills = newCharacter.abilities[category];
          Object.keys(categorySkills).forEach(skill => {
            const skillData = categorySkills[skill];
            const attributeTotal = newCharacter.attributes[category].total;
            const total = skillData.level + skillData.mod + attributeTotal;
            if (skillData.total !== total) {
              needsUpdate = true;
              skillData.total = total;
            }
          });
        }
      });
  
      if (needsUpdate) setCharacter(newCharacter);
    };
  
    recalculateTotals();
  }, [character]);

  const renderAttributes = () => {

    if (!character.attributes) {
      return; 
    }
  
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
    // Check if character.attributes or character.abilities[category] is null before proceeding
    if (!character.attributes || !character.abilities[category]) {
      return; // Exit the function early if either is null
    }

    return Object.entries(character.abilities[category]).map(([skill, data]) => (
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
    <form style={{display:'flex', justifyContent: 'space-around'}} className='characterSheet colorBG'>
      <div>
        <div className='container colorCont'>
          <img alt='Imagen' >
          </img>
          <div>
            <label>
              Nombre:
              <input
                type="text"
                value={character.name}
                onChange={e => setCharacter({ ...character, name: e.target.value })}
                className='colorInput'
              />
            </label>

            <label>Atributo Predominante:
              {/* GOTTA SOLVE HOW TO MAKE THIS SELECTION CHANGE THE VALUE */}
                <select className='colorInput'>
                  <option id={''}></option>
                  <option id={'PredAttrBODY'}>Cuerpo</option>
                  <option id={'PredAttrNERVES'}>Nervios</option>
                  <option id={'PredAttrMIND'}>Mente</option>
                </select>
              </label>
              <label>Tamaño:
                <select>
                  <option value={''}></option>
                  <option value={character.size.diminutuo}>Diminuto</option>
                  <option value={character.size.pequeño}>Pequeño</option>
                  <option value={character.size.mediano}>Mediano</option>
                  <option value={character.size.grande}>Grande</option>
                  <option value={character.size.enorme}>Enorme</option>
                  <option value={character.size.gigantesco}>Gigantesco</option>
                </select>
            </label>
            <label>
              Prestigio:
              <span className='colorSpan valueSpan'>{character.prestige}</span>
            </label>
          </div>
          <div>
            <label>Vida:</label>
            <div>
              <span>Total</span>
              <spant>Actuales</spant>
              <span>Mod</span>
            </div>
            <div>
              <span value={character.hitpoints.total}  className='valueSpan colorSpan'></span>
              <input className='colorInput smallInput' value={character.hitpoints.mod} ></input>
              <input className='colorInput smallInput' value={character.hitpoints.current} ></input>
            </div>
          </div>
        </div>

        {/* Campos adicionales para clase, raza, nivel, etc. */}
          <div className='containerAbs colorCont' style={{ width:'100%', justifyContent:'center'}}>
            <div>
              <h3 style={{display:'flex', justifyContent: 'space-around'}}>Atributos</h3>

              <div style={{display:'flex', justifyContent: 'space-around'}}>
                {renderAttributes()}
              </div>
            </div>
          <div style={{ display: 'grid', gridTemplateColumns:'repeat(3, 1fr)' }}>
              <div style={{ gridColumn:'1fr'}}>
                {renderSkills('body')} 
              </div>
              
              <div style={{ gridColumn:'1fr'}}>
                {renderSkills('nerves')} 
              </div>

              <div style={{ gridColumn:'1fr'}}>
                {renderSkills('mind')} 
              </div>
            </div>
              <button type="submit">Guardar Ficha</button>
            </div>
        </div>
    </form>
  );
};

export default CharacterSheet;