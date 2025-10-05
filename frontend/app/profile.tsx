import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


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
       
        <ImageBackground
          source={{ uri: 'https://placehold.co/600x250/5D9BCC/FFFFFF?text=Graduation' }}
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay} />
        </ImageBackground>

        
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://placehold.co/150x150/E57373/FFFFFF?text=DS' }}
            style={styles.profilePic}
          />
          <Text style={styles.profileName}>Shivaji Naik</Text>

          <View style={styles.infoSection}>
            <InfoRow label="Student ID:" value="stud23.vvd1@gec.ac.in" />
            <InfoRow label="Program:" value="Bachelors in Computer Engineering" />
            <InfoRow label="Current Year & Sem:" value="Third Year, Sem 5" />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoSection}>
            <InfoRow label="Roll No.:" value="23B-CO-059" />
            <InfoRow label="Class:" value="2" />
            <InfoRow label="Batch:" value="C" />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <InfoRow label="PR Number:" value="202311978" />
            <InfoRow label="Mentor:" value="Prof Rechael Dhanraj" />
            <InfoRow label="Alt Email:" value="naik59gec@gmail.com" />
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
    width: screenWidth * 0.08, 
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
    fontSize: screenWidth > 375 ? 16 : 14, 
    fontWeight: '600',
    color: '#34495E',
    letterSpacing: 1,
  },
  
  scrollContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  banner: {
    height: screenHeight * 0.25, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: -(screenHeight * 0.1), 
    padding: 20,
    paddingTop: screenWidth * 0.15, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    minHeight: screenHeight * 0.6, 
  },
  profilePic: {
    width: screenWidth * 0.28, 
    height: screenWidth * 0.28,
    borderRadius: (screenWidth * 0.28) / 2,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: -(screenWidth * 0.14), 
    minWidth: 100,
    minHeight: 100,
  },
  profileName: {
    fontSize: screenWidth > 375 ? 24 : 20, 
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 25,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  
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
    fontSize: screenWidth > 375 ? 14 : 12, 
    color: '#888',
    flex: 0.42,
    flexWrap: 'wrap',
  },
  infoValue: {
    fontSize: screenWidth > 375 ? 14 : 12, 
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
