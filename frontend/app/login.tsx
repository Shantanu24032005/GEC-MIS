import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login successful!');
        // You can store the token and navigate to the home screen
        // For example, using AsyncStorage or a state management library
        router.push('/home');
      } else {
        Alert.alert('Login failed', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred during login.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.svgWrapper}>
        <Svg height={height} width={width}>
          <Path
            d={`M0,${height * 0.25} Q${width * 0.5},${height * 0.35} ${width},${height * 0.25} L${width},${height} L0,${height} Z`}
            fill="#FFFFFF"
          />
          <Path
            d={`M0,${height * 0.2} Q${width * 0.5},${height * 0.3} ${width},${height * 0.2} L${width},${height} L0,${height} Z`}
            fill="#8AB9E0"
          />
        </Svg>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#F0F4F8"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#F0F4F8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.signUpText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5D9BCC',
      justifyContent: 'center',
    },
    svgWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    contentContainer: {
      paddingHorizontal: 35,
      paddingBottom: 100, // Adjust as needed
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#34495E',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 18,
      color: '#555',
      marginBottom: 40,
    },
    input: {
      borderWidth: 1.5,
      borderColor: '#FFFFFF',
      borderRadius: 12,
      paddingVertical: 15,
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#FFFFFF',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginBottom: 20,
    },
    forgotPassword: {
      color: '#FFFFFF',
      textAlign: 'right',
      marginBottom: 30,
    },
    signInButton: {
      borderWidth: 1.5,
      borderColor: '#FFFFFF',
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 20,
    },
    signInButtonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      color: '#FFFFFF',
    },
    signUpText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });