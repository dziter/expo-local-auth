import React, {useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [hardwareData, setHardwareData] = useState('Checking hardware...');
  const [enrollmentData, setEnrollmentData] = useState(
    'Checking enrollment...',
  );
  const [authenticationData, setAuthenticationData] = useState(
    'Awaiting authentication...',
  );

  const checkHardwareSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    setHardwareData(
      hasHardware ? 'Hardware support available' : 'No hardware support',
    );
  };

  const checkEnrollment = async () => {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setEnrollmentData(
      isEnrolled ? 'Enrollment is detected' : 'No enrollment found',
    );
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      disableDeviceFallback: true,
      requireConfirmation: false,
    });
    setAuthenticationData(
      result.success ? 'Authenticated successfully' : 'Authentication failed',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Check Hardware" onPress={checkHardwareSupport} />
        <Text>{hardwareData}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Check Enrollment" onPress={checkEnrollment} />
        <Text>{enrollmentData}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Authenticate" onPress={authenticate} />
        <Text>{authenticationData}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
