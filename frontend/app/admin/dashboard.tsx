import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Admin Dashboard' }} />
      <Text style={styles.title}>Welcome to the Admin Dashboard</Text>
      <Text>This is a placeholder page.</Text>
      {/* Add your dashboard components and logic here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AdminDashboard;