import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
     // Email format validation (basic)
    if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
    }

    setLoading(true); // Start loading

    try {
      // Prepare the payload { email, password }
      const payload = {
        email: email,
        password: password
      };

      // Call the login API
      const response = await axios.post('http://localhost:3000/api/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      // Save token and student ID to local storage (AsyncStorage for React Native)
      if (response.data && response.data.token && response.data._id) {
        try {
          // Use multiSet to save multiple items efficiently
          await AsyncStorage.multiSet([
            ['studentToken', response.data.token],
            ['studentId', response.data._id]
          ]);
        } catch (storageError) {
          console.error('Failed to save data to storage:', storageError);
          // Optionally, show an alert to the user
          Alert.alert('Storage Error', 'Could not save login session. Please try again.');
        }
      }

      console.log('Login successful:', response.data);
      Alert.alert('Success', 'Login successful!');

      // Redirect to home.tsx (assuming path '/student/home')
      router.push('/student/home');


    } catch (error: any) {
      // Handle login errors
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      // Use specific backend error message if available
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password input
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader}/>
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
       <View style={styles.buttonSpacer} />
       {/* Button to navigate to registration */}
       <Button title="Register" onPress={() => router.push('/student/register')} />
    </View>
  );
};

// Styles remain unchanged - keeping the original UI theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF', // Original theme color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loader: {
    marginVertical: 10,
  },
   buttonSpacer: {
      height: 10,
  }
});

export default LoginScreen;