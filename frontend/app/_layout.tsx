import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false // Keep header hidden for the welcome screen
        }} 
      />
      {/* Add this new screen configuration for the login page */}
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerStyle: { backgroundColor: '#5D9BCC' }, // Match the page background
          headerTintColor: '#FFFFFF', // Color for the title and back arrow
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false, // Removes the line under the header
        }} 
      />
    </Stack>
  );
}
