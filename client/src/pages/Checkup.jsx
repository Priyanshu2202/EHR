import React, { useState } from 'react';
import '../App.css'

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [possibleDisease, setPossibleDisease] = useState('');

  const symptoms = ['Headache', 'Fever', 'Constipation', 'Cough', 'Fatigue', 'Muscle Aches', 'Nausea', 'Shortness of Breath', 'Sore Throat', 'Joint Pain'];

  const handleCheckboxChange = (symptom) => {
    const updatedSymptoms = [...selectedSymptoms];
    if (updatedSymptoms.includes(symptom)) {
      updatedSymptoms.splice(updatedSymptoms.indexOf(symptom), 1);
    } else {
      updatedSymptoms.push(symptom);
    }
    setSelectedSymptoms(updatedSymptoms);
    suggestDisease(updatedSymptoms);
  };

  const suggestDisease = (symptoms) => {
    // Replace this with your own algorithm or API call to suggest a disease
    const diseases = {
      'Fever,Headache': 'Common Cold',
      'Headache,Fever': 'Common Cold',
      'Fever,Cough,Fatigue': 'Flu',
      'Fever,Fatigue,Cough': 'Flu',
      'Fatigue,Cough,Fever': 'Flu',
      'Fatigue,Fever,Cough': 'Flu',
      'Cough,Fever,Fatigue': 'Flu',
      'Cough,Fatigue,Fever': 'Flu',
      'Constipation': 'Irritable Bowel Syndrome',
      'Muscle Aches,Joint Pain': 'Influenza',
      'Joint Pain,Muscle Aches': 'Influenza',
      'Nausea,Sore Throat': 'Strep Throat',
      'Sore Throat,Nausea': 'Strep Throat',
      'Shortness of Breath,Fatigue': 'Asthma',
      'Fatigue,Shortness of Breath,': 'Asthma',
      'Headache,Joint Pain': 'Migraine',
      'Joint Pain,Headache': 'Migraine',
      'Cough,Nausea,Sore Throat': 'Bronchitis',
      'Cough,Sore Throat,Nausea': 'Bronchitis',
      'Nausea,Cough,Sore Throat': 'Bronchitis',
      'Nausea,Sore Throat,Cough': 'Bronchitis',
      'Sore Throat,Cough,Nausea': 'Bronchitis',
      'Sore Throat,Nausea,Cough': 'Bronchitis',
      'Fatigue,Shortness of Breath': 'Chronic Fatigue Syndrome',
      'Shortness of Breath,Fatigue,': 'Chronic Fatigue Syndrome',
      'Constipation,Nausea': 'Gastroenteritis',
      'Nausea,Constipation': 'Gastroenteritis',
      'Muscle Aches,Sore Throat': 'Viral Infection',
      'Sore Throat,Muscle Aches': 'Viral Infection',
    };


    const key = symptoms.sort().join(',');
    setPossibleDisease(diseases[key] || 'Not enough information');
  };

  return (
    <div id='full'>
    <div id='inner'>
    <div id='top'>
      <h1 id='heading1'>Symptom Checker</h1>
      </div>
      <p id='text1'>Select your symptoms:</p>

      {symptoms.map((symptom) => (
        <div id='doptions' key={symptom}>
          <input
            type="checkbox"
            id={symptom}
            checked={selectedSymptoms.includes(symptom)}
            onChange={() => handleCheckboxChange(symptom)}
          />
          <label htmlFor={symptom}>{symptom}</label>
        </div>
      ))}
      <p id='prediction'>Possible Disease: {possibleDisease}</p>
      </div>
    </div>
  );
};

export default SymptomChecker;
