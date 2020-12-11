import React from 'react';
import { CookiesProvider } from 'react-cookie';
import SwitchRoutes from './Views/SwitchRoutes';
import './Utility/ButtonStyle.css'

export default function App () {
  return (
    <CookiesProvider>
      <SwitchRoutes/>
    </CookiesProvider>
  );
}