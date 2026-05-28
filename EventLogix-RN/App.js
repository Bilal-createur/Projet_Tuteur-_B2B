import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { EVENTS, TASKS } from './src/data';
import { COLORS } from './src/theme';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('organisateur');
  const [events] = useState(EVENTS);
  const [tasks] = useState(TASKS);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <NavigationContainer>
          <AppNavigator
            events={events}
            tasks={tasks}
            userRole={userRole}
            onLogout={handleLogout}
          />
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}
