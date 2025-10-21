import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView, Image, Platform } from 'react-native'; // Added Image, Platform
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const RegisterScreen = () => {
  // Existing fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [admissionYear, setAdmissionYear] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  // New state for image
  const [imageUri, setImageUri] = useState<string | null>(null); // To store the selected image URI

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Optional: allow editing
      aspect: [1, 1], // Optional: aspect ratio for editing
      quality: 0.5, // Optional: reduce image quality (0 to 1)
    });

    console.log(result); // Log picker result for debugging

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };


  const handleRegister = async () => {
    // --- Validation (Keep existing validation) ---
    const requiredFields = {
      firstName, lastName, dateOfBirth, email, password, phoneNumber,
      address, enrollmentNumber, rollNo, admissionYear, currentYear,
      currentSemester, departmentName
    };
     for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        Alert.alert('Error', `Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }
     if (!/\S+@\S+\.\S+/.test(email)) { /* ... */ return; }
     if (password.length < 6) { /* ... */ return; }

    setLoading(true);

    // --- Prepare FormData for multipart request ---
    const formData = new FormData();

    // Append text fields
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phoneNumber);
    formData.append('address', address);
    formData.append('enrollment_number', enrollmentNumber);
    formData.append('roll_number', rollNo);
    formData.append('admission_year', admissionYear);
    formData.append('current_year', currentYear);
    formData.append('current_semester', currentSemester);
    formData.append('department_name', departmentName);

    // Append image file if selected
    if (imageUri) {
        // Extract file name and type from URI
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const fileName = imageUri.split('/').pop() || `photo.${fileType}`;

        // Create the file object expected by FormData
        // Note: The structure { uri, name, type } is common for React Native FormData
        const file = {
            uri: imageUri,
            name: fileName,
            type: `image/${fileType}`, // Adjust mime type if needed (e.g., image/jpeg)
        };
        formData.append('profile_image', file as any);
    }
     // --- End Prepare FormData ---

    try {
      // Make the API call with FormData
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
        },
      });

      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => router.push('/student/login') }
      ]);

    } catch (error: any) {
      console.error('Registration failed:', error);
       // Check specifically for AxiosError response data
      let errorMessage = 'Registration failed. Please try again.';
      if (axios.isAxiosError(error)) {
        console.error('Axios error data:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Student Registration</Text>

        {/* --- Text Input Fields (Unchanged) --- */}
        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} autoCapitalize="words"/>
        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} autoCapitalize="words"/>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
        <TextInput style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)" value={dateOfBirth} onChangeText={setDateOfBirth} />
        <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad"/>
        <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} autoCapitalize="words"/>
        <TextInput style={styles.input} placeholder="Enrollment Number" value={enrollmentNumber} onChangeText={setEnrollmentNumber} autoCapitalize="characters"/>
        <TextInput style={styles.input} placeholder="Roll Number" value={rollNo} onChangeText={setRollNo} keyboardType="numeric"/>
        <TextInput style={styles.input} placeholder="Admission Year (YYYY)" value={admissionYear} onChangeText={setAdmissionYear} keyboardType="numeric" maxLength={4}/>
        <TextInput style={styles.input} placeholder="Current Academic Year (e.g., 1, 2, 3, 4)" value={currentYear} onChangeText={setCurrentYear} keyboardType="numeric" maxLength={1}/>
        <TextInput style={styles.input} placeholder="Current Semester (e.g., 1 to 8)" value={currentSemester} onChangeText={setCurrentSemester} keyboardType="numeric" maxLength={1}/>
        <TextInput style={styles.input} placeholder="Department Name" value={departmentName} onChangeText={setDepartmentName} autoCapitalize="words"/>

        {/* --- Image Picker --- */}
        <View style={styles.imagePickerContainer}>
           <Button title="Pick Profile Image" onPress={pickImage} />
           {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
        </View>

        {/* --- Submit/Navigation Buttons --- */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <Button title="Register" onPress={handleRegister} />
        )}
        <View style={styles.buttonSpacer} />
        <Button title="Back to Login" onPress={() => router.push('/student/login')} />
      </View>
    </ScrollView>
  );
};

// --- Styles ---
// Added styles for image picker elements, keeping the overall theme
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
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
  imagePickerContainer: {
    alignItems: 'center', // Center button and image
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
   loader: {
    marginVertical: 10,
  },
  buttonSpacer: {
      height: 10,
  }
});

export default RegisterScreen;