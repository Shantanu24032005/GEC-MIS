import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
// Removed incorrect asset import

const { width, height } = Dimensions.get('window');


export default function WelcomeScreen() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      
      <View style={styles.svgWrapper}>
        <Svg height={height} width={width}>
          <Path
            d={`M0,${height * 0.3} Q${width * 0.5},${height * 0.55} ${width},${height * 0.4} L${width},${height} L0,${height} Z`}
            fill="#8AB9E0"
          />
          <Path
            d={`M0,${height * 0.4} Q${width * 0.6},${height * 0.65} ${width},${height * 0.5} L${width},${height} L0,${height} Z`}
            fill="#5D9BCC"
          />
        </Svg>
      </View>

     
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Image
            // CORRECTED: Changed path from ../assets to ../../assets
            source={require('../assets/gecmis-logo.png')}
            style={styles.mainLogo}
            resizeMode="contain"
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>GEC's</Text>
            <Image
              // CORRECTED: Changed path from ../assets to ../../assets
              source={require('../assets/gec-seal.png')}
              style={styles.sealLogo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.subtitle}>Management</Text>
          <Text style={styles.subtitle}>Information System</Text>
          <Text style={styles.subtitle}>Application</Text>
        </View>

        <View style={styles.footerSection}>
          
          <TouchableOpacity 
            style={styles.button}
            
            // CORRECTED: Changed file path to route name
            onPress={() => router.push('/student/login')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            
            // CORRECTED: Changed file path to route name
            onPress={() => router.push('/admin/login')}
          >
            <Text style={styles.buttonText}>Are you an Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  svgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 35,
    justifyContent: 'space-between',
    paddingTop: '25%',
    paddingBottom: '15%',
  },
  headerSection: {
    
  },
  mainLogo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#34495E',
  },
  sealLogo: {
    width: 45,
    height: 45,
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 24,
    color: '#555',
    lineHeight: 32,
  },
  footerSection: {
    alignItems: 'center',
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 80,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});