import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Get screen dimensions for responsive design
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Helper component for displaying user info rows
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? 10 : 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://placehold.co/100x100/E57373/FFFFFF?text=DS' }}
            style={styles.headerProfilePic}
          />
          <View style={styles.headerDivider} />
          <Text style={styles.headerTitle}>PROFILE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Image */}
        <ImageBackground
          source={{ uri: 'https://placehold.co/600x250/5D9BCC/FFFFFF?text=Graduation' }}
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay} />
        </ImageBackground>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://placehold.co/150x150/E57373/FFFFFF?text=DS' }}
            style={styles.profilePic}
          />
          <Text style={styles.profileName}>Derek John Shephard</Text>

          <View style={styles.infoSection}>
            <InfoRow label="Student ID:" value="stud23.vvd1@gec.ac.in" />
            <InfoRow label="Program:" value="Bachelors in Computer Engineering" />
            <InfoRow label="Current Year & Sem:" value="Third Year, Sem 5" />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoSection}>
            <InfoRow label="Roll No.:" value="23B-CO-077" />
            <InfoRow label="Class:" value="2" />
            <InfoRow label="Batch:" value="C" />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <InfoRow label="PR Number:" value="202311978" />
            <InfoRow label="Mentor:" value="Prof Ash Webber" />
            <InfoRow label="Alt Email:" value="mcDerek@gmail.com" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F0F4F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    minHeight: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerProfilePic: {
    width: screenWidth * 0.08, // 8% of screen width
    height: screenWidth * 0.08,
    borderRadius: (screenWidth * 0.08) / 2,
    minWidth: 28,
    minHeight: 28,
  },
  headerDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: screenWidth > 375 ? 16 : 14, // Responsive font size
    fontWeight: '600',
    color: '#34495E',
    letterSpacing: 1,
  },
  // --- SCROLLVIEW & BANNER ---
  scrollContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  banner: {
    height: screenHeight * 0.25, // 25% of screen height
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  // --- PROFILE CARD ---
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: -(screenHeight * 0.1), // 10% of screen height
    padding: 20,
    paddingTop: screenWidth * 0.15, // Responsive top padding
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    minHeight: screenHeight * 0.6, // Minimum height
  },
  profilePic: {
    width: screenWidth * 0.28, // 28% of screen width
    height: screenWidth * 0.28,
    borderRadius: (screenWidth * 0.28) / 2,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: -(screenWidth * 0.14), // Half of profile pic height
    minWidth: 100,
    minHeight: 100,
  },
  profileName: {
    fontSize: screenWidth > 375 ? 24 : 20, // Responsive font size
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 25,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  // --- INFO SECTIONS ---
  infoSection: {
    width: '100%',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    minHeight: 40,
  },
  infoLabel: {
    fontSize: screenWidth > 375 ? 14 : 12, // Responsive font size
    color: '#888',
    flex: 0.42,
    flexWrap: 'wrap',
  },
  infoValue: {
    fontSize: screenWidth > 375 ? 14 : 12, // Responsive font size
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
    flex: 0.58,
    flexWrap: 'wrap',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
});
