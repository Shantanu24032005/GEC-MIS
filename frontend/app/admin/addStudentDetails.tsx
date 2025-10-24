import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';

const AddStudentDetails = () => {
  const [formData, setFormData] = useState({
    // Student Basic Info
    roll_no: '',
    
    // Fee Details
    amount: '',
    paymentDate: '',
    transactionId: '',
    feeStatus: '',
    payment_for: '',
    payment_method: '',
    remarks: '',
    academic_year: '',
    
    // Academic Details
    semester: '',
    cgpa: '',
    courses: [{
      course_code: '',
      course_name: '',
      internal_marks: '',
      term_work_marks: '',
      end_sem_exam_marks: '',
      grade: ''
    }]
  });

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.roll_no) {
        Alert.alert('Error', 'Roll number is required');
        return;
      }

      // Format the data
      const dataToSend = {
        ...formData,
        amount: formData.amount ? Number(formData.amount) : undefined,
        semester: formData.semester ? Number(formData.semester) : undefined,
        cgpa: formData.cgpa ? Number(formData.cgpa) : undefined,
        courses: formData.courses.map(course => ({
          ...course,
          internal_marks: course.internal_marks ? Number(course.internal_marks) : null,
          term_work_marks: course.term_work_marks ? Number(course.term_work_marks) : null,
          end_sem_exam_marks: course.end_sem_exam_marks ? Number(course.end_sem_exam_marks) : null
        }))
      };

      const response = await axios.post('http://localhost:3000/api/adminDetails/addStudentDetails', dataToSend);

      if (response.data.success) {
        Alert.alert('Success', 'Student details added successfully');
        // Reset form
        setFormData({
          roll_no: '',
          amount: '',
          paymentDate: '',
          transactionId: '',
          feeStatus: '',
          payment_for: '',
          payment_method: '',
          remarks: '',
          academic_year: '',
          semester: '',
          cgpa: '',
          courses: [{
            course_code: '',
            course_name: '',
            internal_marks: '',
            term_work_marks: '',
            end_sem_exam_marks: '',
            grade: ''
          }]
        });
      }
    } catch (error) {
      console.error('Error adding student details:', error);
      Alert.alert('Error', 'Failed to add student details');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCourseChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newCourses = [...prev.courses];
      newCourses[index] = {
        ...newCourses[index],
        [field]: value
      };
      return {
        ...prev,
        courses: newCourses
      };
    });
  };

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, {
        course_code: '',
        course_name: '',
        internal_marks: '',
        term_work_marks: '',
        end_sem_exam_marks: '',
        grade: ''
      }]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Add Student Details' }} />
      
      {/* Basic Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          value={formData.roll_no}
          onChangeText={(value) => handleInputChange('roll_no', value)}
        />
      </View>

      {/* Fee Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fee Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={formData.amount}
          onChangeText={(value) => handleInputChange('amount', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Payment Date (YYYY-MM-DD)"
          value={formData.paymentDate}
          onChangeText={(value) => handleInputChange('paymentDate', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Transaction ID"
          value={formData.transactionId}
          onChangeText={(value) => handleInputChange('transactionId', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fee Status (Paid/Pending/Failed/Refunded)"
          value={formData.feeStatus}
          onChangeText={(value) => handleInputChange('feeStatus', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Payment For (Tuition Fee/Exam Registration Fee)"
          value={formData.payment_for}
          onChangeText={(value) => handleInputChange('payment_for', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Payment Method (Online/Cash/Cheque/DD)"
          value={formData.payment_method}
          onChangeText={(value) => handleInputChange('payment_method', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Academic Year (YYYY-YYYY)"
          value={formData.academic_year}
          onChangeText={(value) => handleInputChange('academic_year', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Remarks"
          value={formData.remarks}
          onChangeText={(value) => handleInputChange('remarks', value)}
          multiline
        />
      </View>

      {/* Academic Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Semester (1-8)"
          value={formData.semester}
          onChangeText={(value) => handleInputChange('semester', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="CGPA"
          value={formData.cgpa}
          onChangeText={(value) => handleInputChange('cgpa', value)}
          keyboardType="decimal-pad"
        />

        {/* Courses Section */}
        <Text style={styles.subsectionTitle}>Courses</Text>
        {formData.courses.map((course, index) => (
          <View key={index} style={styles.courseContainer}>
            <Text style={styles.courseTitle}>Course {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Course Code"
              value={course.course_code}
              onChangeText={(value) => handleCourseChange(index, 'course_code', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Course Name"
              value={course.course_name}
              onChangeText={(value) => handleCourseChange(index, 'course_name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Internal Marks"
              value={course.internal_marks}
              onChangeText={(value) => handleCourseChange(index, 'internal_marks', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Term Work Marks"
              value={course.term_work_marks}
              onChangeText={(value) => handleCourseChange(index, 'term_work_marks', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="End Semester Exam Marks"
              value={course.end_sem_exam_marks}
              onChangeText={(value) => handleCourseChange(index, 'end_sem_exam_marks', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Grade"
              value={course.grade}
              onChangeText={(value) => handleCourseChange(index, 'grade', value)}
            />
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton} onPress={addCourse}>
          <Text style={styles.addButtonText}>Add Another Course</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
    marginBottom: 15,
    color: '#333',
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  courseContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddStudentDetails;
