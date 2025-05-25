import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const AssistQuestion = ({ question, value, onChange }) => {
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <FormLabel component="legend" sx={{ mb: 2 }}>
        {question.question}
      </FormLabel>
      <RadioGroup
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
      >
        {question.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default AssistQuestion; 