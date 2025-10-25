import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

/**
 * Props for the RegistrationStatus component.
 * This can be expanded to include status, messages, etc.
 */
interface RegistrationStatusProps {
  // Example prop:
  // status: 'pending' | 'success' | 'error';
}

/**
 * A component to display the status of a registration process.
 */
const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ /* status */ }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registration Status</Text>
        <Text style={styles.message}>Here you can display the status of the user's registration.</Text>
        {/* You can add conditional rendering here based on props */}
        {/* For example:
        {status === 'pending' && <Text style={styles.pendingText}>Your registration is pending review.</Text>}
        {status === 'success' && <Text style={styles.successText}>Registration successful! Welcome!</Text>}
        {status === 'error' && <Text style={styles.errorText}>Registration failed. Please try again.</Text>}
        */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Consistent with other screens
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  // Add styles for different statuses if you implement them
  // pendingText: { color: '#FFA500', marginTop: 10 },
  // successText: { color: '#28A745', marginTop: 10 },
  // errorText: { color: '#DC3545', marginTop: 10 },
});

export default RegistrationStatus;
