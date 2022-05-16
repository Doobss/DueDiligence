import React from 'react';
import AppStack from './Navigation'
import { DispatchContextProvider } from './AppContext';

export default function App() {
  return (
    <DispatchContextProvider>
      <AppStack />
    </DispatchContextProvider>
  );
}
