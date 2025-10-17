import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      
      <View style={styles.svgWrapper}>
        <Svg height={height} width={width}>
          
          <Path
            d={`M0,0 L${width},0 L${width},${height * 0.3} Q${width * 0.4},${height * 0.4} 0,${height * 0.25} Z`}
            fill="#8AB9E0"
          />
         
          <Path
            d={`M0,0 L${width},0 L${width},${height * 0.2} Q${width * 0.5},${height * 0.35} 0,${height * 0.15} Z`}
            fill="#FFFFFF"
          />
        </Svg>
      </View>

      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>

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

        <View style={styles.actionsContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText} onPress={() => router.push('/home')} >Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>New admission ? </Text>
        <TouchableOpacity>
          <Text style={[styles.footerText, styles.linkText]}
                 onPress={() => router.push('/register')}
          >Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D9BCC', 
  },
  svgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
  },
  loginButton: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 15,
    color: '#F0F4F8',
  },
});