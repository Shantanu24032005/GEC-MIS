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
  ScrollView,
  Alert
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: fullName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registration successful!');
        router.push('/login');
      } else {
        Alert.alert('Registration failed', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred during registration.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Background SVG Shapes */}
        <View style={styles.svgWrapper}>
          <Svg height={height} width={width}>
            <Path
              d={`M0,0 L${width},0 L${width},${height * 0.25} Q${width * 0.3},${height * 0.3} 0,${height * 0.15} Z`}
              fill="#FFFFFF"
            />
            <Path
              d={`M0,0 L${width},0 L${width},${height * 0.15} Q${width * 0.5},${height * 0.25} 0,${height * 0.08} Z`}
              fill="#8AB9E0"
            />
          </Svg>
        </View>


        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create a new account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#F0F4F8"
            value={fullName}
            onChangeText={setFullName}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Re-type Password"
            placeholderTextColor="#F0F4F8"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
           <TextInput
            style={styles.input}
            placeholder="Registration Type ( BE or ME )"
            placeholderTextColor="#F0F4F8"
            value={registrationType}
            onChangeText={setRegistrationType}
          />

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D9BCC',
  },
  scrollContainer: {
    flexGrow: 1,
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
    paddingTop: 80,
    paddingBottom: 40,
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
  signUpButton: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});