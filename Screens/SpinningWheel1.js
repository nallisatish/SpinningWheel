import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const WheelSection = ({ label }) => (
    <View style={styles.wheelSection}>
        <Text style={styles.sectionText}>{label}</Text>
    </View>
);

// const sections = ['1', '2', '3', '4', '5', '6', '7', '8'];
// return (
//     <Animated.View style={[styles.wheel, { transform: [{ rotate: spinInterpolation }] }]}>
//         {sections.map((label, index) => (
//             <WheelSection key={index} label={label} />
//         ))}
//     </Animated.View>
// );


export default function SpinningWheel1() {
    const rotation = useRef(new Animated.Value(0)).current;
    const [isSpinning, setIsSpinning] = useState(false);

    const startSpin = () => {
        if (isSpinning); // Prevent multiple spins

        setIsSpinning(true);

        const randomAngle = Math.floor(Math.random() * 3600) + 360; // Angle to spin (for randomness)

        Animated.timing(rotation, {
            toValue: randomAngle,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start(() => {
            setIsSpinning(false);
        });
    };
    // Add to the end of startSpin
    Animated.timing(rotation, {
        toValue: randomAngle,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
    }).start(() => {
        setIsSpinning(false);
        const selectedSection = (Math.floor((randomAngle % 360) / (360 / sections.length)));
        alert(`You landed on: ${sections[selectedSection]}`);
    });


    const spinInterpolation = rotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.wheel, { transform: [{ rotate: spinInterpolation }] }]}>
                {/* Your wheel sections go here */}
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
    },
    wheel: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    wheelSection: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionText: {
        fontSize: 16,
        color: '#fff',
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
