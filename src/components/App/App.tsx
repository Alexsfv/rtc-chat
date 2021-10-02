import { Button, TextInput } from '@Components';
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
      <Button>text</Button>
      <Button textColor="gold">text</Button>
      <Button design="gold">text</Button>
      <Button disabled design="gold">text</Button>
    </div>
  );
}
