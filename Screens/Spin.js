import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Spin() {
    const rotation = useRef(new Animated.Value(0)).current;
    const [isSpinning, setIsSpinning] = useState(false);
    const sections = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'];
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F3FF33', '#33FFF6'];

    const startSpin = () => {
        if (isSpinning) return; // Prevent multiple spins
        setIsSpinning(true);

        const randomRotation = Math.floor(Math.random() * 360) + 720; // Add extra spins
        Animated.timing(rotation, {
            toValue: randomRotation,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start(() => {
            setIsSpinning(false);
            determineWinner(randomRotation);
        });
    };

    const determineWinner = (angle) => {
        const sectionAngle = 360 / sections.length;
        const index = Math.floor(((angle % 360) + sectionAngle / 2) / sectionAngle) % sections.length;
        alert(`You won: ${sections[index]}`);
    };

    const spinInterpolation = rotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.wheel, { transform: [{ rotate: spinInterpolation }] }]}>
                {sections.map((section, index) => (
                    <View key={index} style={[styles.section, { transform: [{ rotate: `${index * (360 / sections.length)}deg` }] }]}>
                        <Text style={styles.sectionText}>{section}</Text>
                    </View>
                ))}
                
            </Animated.View>
            <TouchableOpacity onPress={startSpin} style={styles.button}>
                <Text style={styles.buttonText}>Spin</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    wheel: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.8,
        borderWidth: 9,
        borderColor: 'yellow',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        position: 'absolute',
        width: '70%',
        height: '70%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 150, 250, 0.2)',
        borderWidth: 1,
        borderColor: '#333',
    },
    sectionText: {
        fontSize: 34,
        color: 'white',
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
