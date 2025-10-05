// File: app/info.tsx

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

export default function InfoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Mission</Text>
          <Text style={styles.cardText}>
            To build a transparent and technology-driven academic ecosystem that
            empowers GEC with efficiency and innovation.
          </Text>

          {/* Vision Section */}
          <View style={styles.visionSection}>
            <Image
              source={{ uri: "https://placehold.co/150x150/CCE0F0/5D9BCC?text=Vision+Icon" }} // Placeholder for Vision Icon
              style={styles.visionIcon}
            />
            <Text style={styles.visionTitle}>Vision</Text>
            <Text style={styles.cardText}>
              To deliver a secure, centralized, and user-friendly platform that
              streamlines academic, administrative, and student services.
            </Text>
          </View>

          {/* Philosophy Section */}
          <View style={styles.philosophySection}>
            <Image
              source={{ uri: "https://placehold.co/200x50/F0F4F8/34495E?text=GECMIS" }} // Placeholder for GECMIS Logo
              style={styles.gecmisLogo}
            />
            <Text style={styles.philosophyTitle}>Philosophy</Text>
            <Text style={styles.cardText}>
              Empowering education through technology by fostering accessibility,
              accountability, and digital transformation in every process.
            </Text>
          </View>
        </View>

        {/* Action Items */}
        <View style={styles.actionItemsContainer}>
          <TouchableOpacity style={styles.actionItem}>
            <Feather name="info" size={24} color="#34495E" style={styles.actionIcon} />
            <Text style={styles.actionText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Feather name="mail" size={24} color="#34495E" style={styles.actionIcon} />
            <Text style={styles.actionText}>Contact Us</Text>
          </TouchableOpacity>
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
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E",
    marginBottom: 10,
    textAlign: "center",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  visionSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  visionIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  visionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D9BCC",
    marginBottom: 10,
  },
  philosophySection: {
    alignItems: "center",
    marginTop: 20,
  },
  gecmisLogo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  philosophyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E",
    marginBottom: 10,
  },
  actionItemsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  actionIcon: {
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
  },
});