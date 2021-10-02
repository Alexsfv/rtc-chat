import { TextInput } from '@Components';
import { GlobalStyles } from '@Assets';
import React from 'react';

export function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <TextInput
        placeholder="write smt"
        error="Something went weong"
        disabled
      />
    </div>
  );
}
