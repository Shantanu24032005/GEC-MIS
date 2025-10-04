import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import notices from '../assets/notices.json';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Sidebar menu items data with routes
const sidebarMenuItems = [
    { icon: 'home', name: 'Home', route: '/home' },
    { icon: 'user', name: 'Profile', route: '/profile' },
    { icon: 'edit', name: 'Registration', route: '/registration-status' },
    { icon: 'file-text', name: 'Internal Marks', route: '/internal-marks' },
    { icon: 'settings', name: 'Reset Password', route: '/reset-password' },
    { icon: 'award', name: 'Semester Result', route: '/semester-result' },
    { icon: 'dollar-sign', name: 'My Payments', route: '/payments' },
    { icon: 'info', name: 'info', route: '/info' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;

  const toggleSidebar = (visible: boolean) => {
    setSidebarVisible(visible);
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = () => {
    toggleSidebar(false);
    router.replace('/login');
  };

  const handleMenuItemPress = (route: string) => {
    toggleSidebar(false);
    // A slight delay can make the transition feel smoother, but is optional
    setTimeout(() => {
      router.push(route);
    }, 150);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- FIXED: Sidebar Modal --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSidebarVisible}
        onRequestClose={() => toggleSidebar(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => toggleSidebar(false)}>
          <Animated.View 
            style={[styles.sidebarContainer, { transform: [{ translateX: slideAnim }] }]}
            // This crucial line prevents touches inside the sidebar from closing it
            onStartShouldSetResponder={() => true} 
          >
              {/* Sidebar Header */}
              <ImageBackground
                  source={{ uri: 'https://placehold.co/600x200/5D9BCC/FFFFFF' }}
                  style={styles.sidebarHeader}
              >
                  <Image
                      source={{ uri: 'https://placehold.co/100x100/E57373/FFFFFF?text=DS' }}
                      style={styles.sidebarProfilePic}
                  />
              </ImageBackground>
              <View style={styles.sidebarUserInfo}>
                  <Text style={styles.sidebarUserName}>Derek Shephard</Text>
                  <Text style={styles.sidebarUserDetail}>B.E | Sem 5 | Computer</Text>
              </View>

              {/* Wrap menu in ScrollView for smaller screens */}
              <ScrollView>
                {/* Sidebar Menu Items */}
                <View style={styles.sidebarMenu}>
                    {sidebarMenuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.sidebarMenuItem} onPress={() => handleMenuItemPress(item.route)}>
                            <Feather name={item.icon as any} size={22} color="#E57373" />
                            <Text style={styles.sidebarMenuItemText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sidebar Logout */}
                <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleLogout}>
                    <Feather name="log-out" size={22} color="#E57373" />
                    <Text style={styles.sidebarMenuItemText}>Log out</Text>
                </TouchableOpacity>
              </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>

      {/* --- UPDATED: Top Navigation Bar --- */}
      <View style={styles.topNavBar}>
        <TouchableOpacity onPress={() => toggleSidebar(true)} style={styles.navBarLeft}>
          <View style={styles.menuIconContainer}>
             <Feather name="grid" size={24} color="#E57373" />
          </View>
          <View>
            <Text style={styles.navBarTitle}>Derek</Text>
            <Text style={styles.navBarSubtitle}>23B-CO-077</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          
          {/* Admissions Section */}
          <View style={styles.admissionsSection}>
            <TouchableOpacity
              style={styles.admissionCard}
              onPress={() => router.push('/be-admission')}
            >
              <ImageBackground
                source={{ uri: 'https://placehold.co/600x200/CCCCCC/FFFFFF?text=Campus' }}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={[styles.cardOverlay, { backgroundColor: 'rgba(229, 115, 115, 0.85)' }]} />
                <View style={styles.cardContent}>
                  <Image source={require('../assets/gec-seal.png')} style={styles.cardLogo} />
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>GEC B.E ADMISSION</Text>
                    <Text style={styles.cardSubtitle}>2025-26</Text>
                  </View>
                  <View style={styles.visitButton}>
                    <Text style={styles.visitButtonText}>Visit</Text>
                    <Feather name="chevron-right" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.admissionCard}
              onPress={() => router.push('/me-admission')}
            >
              <ImageBackground
                source={{ uri: 'https://placehold.co/600x200/CCCCCC/FFFFFF?text=Campus' }}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={[styles.cardOverlay, { backgroundColor: 'rgba(102, 187, 106, 0.85)' }]} />
                <View style={styles.cardContent}>
                  <Image source={require('../assets/gec-seal.png')} style={styles.cardLogo} />
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>GEC M.E ADMISSION</Text>
                    <Text style={styles.cardSubtitle}>2025-26</Text>
                  </View>
                  <View style={styles.visitButton}>
                    <Text style={styles.visitButtonText}>Visit</Text>
                    <Feather name="chevron-right" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          
          {/* Notices Section */}
          <View style={styles.noticesSection}>
            <Text style={styles.sectionTitle}>Notices</Text>
            {notices.map((notice) => (
              <View key={notice.id} style={styles.noticeCard}>
                <View style={styles.noticeHeader}>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  <Text style={styles.noticeDate}>{notice.date}</Text>
                </View>
                <Text style={styles.noticeDescription}>{notice.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Feather name="home" style={[styles.footerIcon, styles.footerIconActive]} />
          <Text style={[styles.footerText, styles.footerTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Feather name="book-open" style={styles.footerIcon} />
          <Text style={styles.footerText}>Schemes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleLogout}>
          <Feather name="log-out" style={styles.footerIcon} />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  // --- NAVBAR STYLES ---
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F0F4F8',
  },
  navBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  navBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  navBarSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  // --- SIDEBAR STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarContainer: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarHeader: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  sidebarProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    position: 'absolute',
    bottom: -40,
  },
  sidebarUserInfo: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  sidebarUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sidebarUserDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sidebarMenu: {
    // flex: 1, // Removed to allow natural scroll flow
    // paddingHorizontal: 20, // Removed as menu items have padding
    marginTop: 10,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20, // Padding is now here
  },
  sidebarMenuItemText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#444',
  },
  // --- MAIN CONTENT STYLES ---
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  admissionsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  admissionCard: {
    height: 120,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardLogo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 4,
  },
  visitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  visitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 4,
  },
  noticesSection: {},
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 20,
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noticeHeader: {
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    paddingBottom: 10,
    marginBottom: 10,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  noticeDate: {
    fontSize: 12,
    color: '#888',
  },
  noticeDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  // --- FOOTER STYLES ---
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    fontSize: 24,
    color: '#888888',
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  footerIconActive: {
    color: '#E57373',
  },
  footerTextActive: {
    color: '#E57373',
  },
});

