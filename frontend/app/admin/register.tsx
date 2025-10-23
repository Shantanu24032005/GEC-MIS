import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AdminRegisterScreen = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [adminSecret, setAdminSecret] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !role || !departmentId || !adminSecret) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/adminauth/adminRegister', {
        username,
        email,
        password,
        role,
        department_id: departmentId,
        admin_secret: adminSecret,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Admin registered successfully!');
        router.push('/admin/login');
      } else {
        Alert.alert('Error', response.data.message || 'Unknown error occurred.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      Alert.alert('Error', err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Admin Registration</Text>

        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Role" value={role} onChangeText={setRole} />
        <TextInput style={styles.input} placeholder="Department ID" value={departmentId} onChangeText={setDepartmentId} />
        <TextInput style={styles.input} placeholder="Admin Secret Key" value={adminSecret} onChangeText={setAdminSecret} secureTextEntry />

        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, isLoading && { backgroundColor: '#93c5fd' }]}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/admin/login')}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' },
  card: { width: '85%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 4 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginLink: { textAlign: 'center', color: '#2563eb', marginTop: 10 },
});

export default AdminRegisterScreen;
