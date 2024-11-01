import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, link, Text, TouchableOpacity } from 'react-native';

const sections = [
    { id: 1, label: 'Section 1', color: 'blue' },
    { id: 2, label: 'Section 2', color: 'green' },
    { id: 3, label: 'Section 3', color: 'darkblue' },
    { id: 4, label: 'Section 4', color: 'black' },
    { id: 5, label: 'Section 5', color: 'orange' },
    { id: 6, label: 'Section 6', color: 'gray' },
    // Add more sections as needed
];

const WheelSection = ({ label }) => (
    <View style={styles.wheelSection}>
        <Text style={styles.sectionText}>{label}</Text>
    </View>
);

const Section = ({ label, color, rotate }) => (
    <View style={[styles.section, { backgroundColor: color, transform: [{ rotate: `${rotate}deg` }] }]}>
        <Text style={styles.sectionText}>{label}</Text>
    </View>
);

const SpinningWheel = () => {
    // const [rotation, setRotation] = useState(0);
    const [animatedValue] = useState(new Animated.Value(0));
    const [isSpinning, setIsSpinning] = useState(false);
    
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 660,
            duration: 6000,
            useNativeDriver: false,
        }).start();
    }, []);

    // const handleSpin = () => {
    //     setRotation(rotation + 360);
    // };

    const startSpin = () => {
        if (isSpinning) return; // Prevent multiple spins

        setIsSpinning(true);

        const randomAngle = Math.floor(Math.random() * 3600) + 360; // Angle to spin (for randomness)

        Animated.timing(rotation, {
            toValue: randomAngle,
            duration: 6000,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start(() => {
            setIsSpinning(true);
        });
    };

    return (
        <View style={styles.container}>

            <View style={styles.wheel}>
                {sections.map((section, index) => (
                    <Section
                        key={(link)}
                        label={section.label}
                        color={section.color}
                        rotate={(360 / sections.length) * index}
                    />
                ))}
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            transform: [
                                {
                                    rotate: animatedValue.interpolate({
                                        inputRange: [0, 360],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    &#8593;
                </Animated.View>
            </View>
            <TouchableOpacity onPress={startSpin} style={styles.button}>
                <Text style={styles.buttonText}>Spin</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wheel: {
        width: 340,
        height: 340,
        borderRadius: 220,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
    },
    wheelSection: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        position: 'absolute',

        top: 0,
        left: 0,
        width: '20%',
        height: '70%',
        marginLeft: 50,
        marginTop: 50,
        transform: [{ rotate: '9deg' }],
    },
    sectionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 80,
    },
    indicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -40 }, { translateY: -40 }],
        fontSize: 34,
        fontWeight: 'bold',
        color: '#666',
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

export default SpinningWheel;