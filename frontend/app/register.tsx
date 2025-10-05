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
  ScrollView
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  const router = useRouter();

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

          
          <View style={styles.recaptchaContainer}>
            <View style={styles.checkbox} />
            <Text style={styles.recaptchaText}>I'm not a robot</Text>
            <Ionicons name="reload-circle" size={30} color="#5D9BCC" style={styles.recaptchaLogo} />
          </View>

          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => router.push('/login')}
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
  recaptchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    marginRight: 15,
  },
  recaptchaText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  recaptchaLogo: {
    opacity: 0.7
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

