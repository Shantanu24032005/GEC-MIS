// File: app/payments.tsx

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Mock data for payments, replace with real data from an API if needed
const paymentsData = [
  { id: "1", academicYear: "AY 2023-24", semester: "Semester 1", amount: "29570" },
  { id: "2", academicYear: "AY 2023-24", semester: "Semester 2", amount: "26070" },
  { id: "3", academicYear: "AY 2023-24", semester: "Semester 3", amount: "27770" },
  { id: "4", academicYear: "AY 2023-24", semester: "Semester 4", amount: "29570" },
  { id: "5", academicYear: "AY 2023-24", semester: "Semester 5", amount: "29570" },
];

export default function PaymentsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.paymentSection}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => router.push('/exam-fees')}
          >
            <Text style={styles.sectionTitle}>Tuition Fee Payments</Text>
            <Feather name="arrow-right" size={20} color="#34495E" />
          </TouchableOpacity>

          {/* Payment list */}
          {paymentsData.map((payment) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentDetails}>
                <Image
                  source={{ uri: "https://placehold.co/100x100/5D9BCC/FFFFFF?text=Logo" }}
                  style={styles.paymentLogo}
                />
                <View>
                  <Text style={styles.paymentTitle}>{payment.academicYear} {payment.semester}</Text>
                  <Text style={styles.paymentAmount}>
                    Amount - Rs.{payment.amount}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Feather name="download" size={24} color="#8AB9E0" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  scrollContent: {
    padding: 20,
  },
  paymentSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E",
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  paymentCardLast: {
    borderBottomWidth: 0,
  },
  paymentDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  paymentAmount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  downloadButton: {
    padding: 8,
  },
});