// File: app/exam-fees.tsx

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

// Mock data for exam fees, you can replace this with real data
const examFeesData = [
  { id: "1", title: "Nov Dec 2023 Examination", amount: "2957" },
  { id: "2", title: "Nov Dec 2023 Examination", amount: "1340" },
  { id: "3", title: "May June 2024 Examination", amount: "2775" },
  { id: "4", title: "RC2019-20 Nov Dec 2024 Exam", amount: "3190" },
  { id: "5", title: "RC2019-20 Nov Dec 2024 Exam", amount: "2970" },
];

export default function ExamFeesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.paymentSection}>
          {/* List of exam fees */}
          {examFeesData.map((fee) => (
            <View key={fee.id} style={styles.paymentCard}>
              <View style={styles.paymentDetails}>
                <Image
                  source={{ uri: `https://placehold.co/100x100/5D9BCC/FFFFFF?text=Logo` }}
                  style={styles.paymentLogo}
                />
                <View>
                  <Text style={styles.paymentTitle}>{fee.title}</Text>
                  <Text style={styles.paymentAmount}>
                    Amount - Rs.{fee.amount}
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
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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