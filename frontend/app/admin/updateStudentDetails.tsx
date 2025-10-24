import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';

interface FeeUpdate {
  amount?: string;
  paymentDate?: string;
  transactionId?: string;
  feeStatus?: string;
}

interface AcademicUpdate {
  semester?: string;
  cgpa?: string;
  backlogs?: string;
}

const UpdateStudentDetails = () => {
  const [rollNo, setRollNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentFound, setStudentFound] = useState(false);
  const [feeId, setFeeId] = useState('');
  const [academicId, setAcademicId] = useState('');

  const [feeUpdate, setFeeUpdate] = useState<FeeUpdate>({
    amount: '',
    paymentDate: '',
    transactionId: '',
    feeStatus: ''
  });

  const [academicUpdate, setAcademicUpdate] = useState<AcademicUpdate>({
    semester: '',
    cgpa: '',
    backlogs: ''
  });

  const searchStudent = async () => {
    if (!rollNo.trim()) {
      Alert.alert('Error', 'Please enter a roll number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/adminDetails/studentDetails', {
        params: { 'roll-no': rollNo }
      });

      if (response.data.success && response.data.data.length > 0) {
        setStudentFound(true);
        // You might want to add additional API calls here to get fee and academic IDs
        // For now, we'll assume they're part of the student data
        Alert.alert('Success', 'Student found! You can now update their details.');
      } else {
        Alert.alert('Error', 'No student found with this roll number');
        setStudentFound(false);
      }
    } catch (error) {
      console.error('Error searching student:', error);
      Alert.alert('Error', 'Failed to search for student');
      setStudentFound(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!studentFound) {
      Alert.alert('Error', 'Please search for a student first');
      return;
    }

    const updateData = {
      roll_no: rollNo,
      ...(feeId && { fee_id: feeId }),
      ...(academicId && { academic_id: academicId }),
      ...feeUpdate,
      ...academicUpdate
    };

    // Remove empty fields
    Object.keys(updateData).forEach(key => {
      if (!updateData[key]) delete updateData[key];
    });

    if (Object.keys(updateData).length <= 1) { // 1 because roll_no will always be there
      Alert.alert('Error', 'Please provide at least one field to update');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        'http://localhost:8000/api/adminDetails/updateStudentDetails',
        updateData
      );

      if (response.data.success) {
        Alert.alert('Success', 'Student details updated successfully');
        // Reset form
        setFeeUpdate({
          amount: '',
          paymentDate: '',
          transactionId: '',
          feeStatus: ''
        });
        setAcademicUpdate({
          semester: '',
          cgpa: '',
          backlogs: ''
        });
        setStudentFound(false);
        setRollNo('');
      }
    } catch (error) {
      console.error('Error updating student details:', error);
      Alert.alert('Error', 'Failed to update student details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Update Student Details' }} />

      {/* Search Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search Student</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Roll Number"
          value={rollNo}
          onChangeText={setRollNo}
          editable={!loading}
        />
        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]} 
          onPress={searchStudent}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Searching...' : 'Search Student'}
          </Text>
        </TouchableOpacity>
      </View>

      {studentFound && (
        <>
          {/* Fee Update Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Update Fee Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={feeUpdate.amount}
              onChangeText={(value) => setFeeUpdate(prev => ({ ...prev, amount: value }))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Payment Date (YYYY-MM-DD)"
              value={feeUpdate.paymentDate}
              onChangeText={(value) => setFeeUpdate(prev => ({ ...prev, paymentDate: value }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Transaction ID"
              value={feeUpdate.transactionId}
              onChangeText={(value) => setFeeUpdate(prev => ({ ...prev, transactionId: value }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Fee Status (Paid/Pending/Failed/Refunded)"
              value={feeUpdate.feeStatus}
              onChangeText={(value) => setFeeUpdate(prev => ({ ...prev, feeStatus: value }))}
            />
          </View>

          {/* Academic Update Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Update Academic Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Semester (1-8)"
              value={academicUpdate.semester}
              onChangeText={(value) => setAcademicUpdate(prev => ({ ...prev, semester: value }))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="CGPA"
              value={academicUpdate.cgpa}
              onChangeText={(value) => setAcademicUpdate(prev => ({ ...prev, cgpa: value }))}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Backlogs"
              value={academicUpdate.backlogs}
              onChangeText={(value) => setAcademicUpdate(prev => ({ ...prev, backlogs: value }))}
              keyboardType="numeric"
            />
          </View>

          {/* Update Button */}
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Updating...' : 'Update Details'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
});

export default UpdateStudentDetails;
