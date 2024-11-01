// PinLockScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const PinLock = () => {
  const [pin, setPin] = useState('');       // To hold the new or confirmed PIN
  const [confirmPin, setConfirmPin] = useState(''); // To hold the confirmation PIN
  const [storedPin, setStoredPin] = useState(null); // To store the set PIN for validation
  const [isPinSet, setIsPinSet] = useState(false);  // Track if PIN has been set

  const handleSetPin = () => {
    if (pin === confirmPin) {
      setStoredPin(pin);
      setPin('');
      setConfirmPin('');
      setIsPinSet(true);
      Alert.alert('Success', 'PIN has been set!');
    } else {
      Alert.alert('Error', 'PINs do not match.');
    }
  };

  const handleValidatePin = () => {
    if (pin === storedPin) {
      Alert.alert('Success', 'PIN is correct!');
    } else {
      Alert.alert('Error', ' You Enter Incorrect PIN.');
    }
    setPin('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isPinSet ? 'Enter your PIN' : 'Set a PIN'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="numeric"
      />

      {!isPinSet && (
        <TextInput
          style={styles.input}
          placeholder="Confirm PIN"
          value={confirmPin}
          onChangeText={setConfirmPin}
          secureTextEntry
          keyboardType="numeric"
        />
      )}

      <Button
        title={isPinSet ? 'Validate PIN' : 'Set PIN'}
        onPress={isPinSet ? handleValidatePin : handleSetPin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default PinLock;
