import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

// Ignore some warnings
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection'
]);

export default function App() {
  return <Routes />
}
