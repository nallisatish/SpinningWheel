// ScratchCardScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScratchView } from 'react-native';
// import ScratchView from 'react-native-scratch';

const ScratchCardScreen = () => {
    const [isScratched, setIsScratched] = useState(false);

    const handleScratchComplete = () => {
        setIsScratched(true);
        Alert.alert("Congratulations!", "You've unlocked a reward!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scratch to reveal your prize!</Text>

            <ScratchView
                style={styles.scratchCard}
                brushSize={50}
                onScratchProgress={(progress) => {
                    if (progress > 70 && !isScratched) {
                        handleScratchComplete();
                    }
                }}
                onScratchComplete={handleScratchComplete}
                imageUrl="https://your-image-url.com/cover.png" // Cover image
                resourceName="prize" // Hidden image or text behind the scratch card
            >
                {isScratched ? (
                    <Text style={styles.rewardText}>🎉 You won a prize! 🎉</Text>
                ) : (
                    <Text style={styles.hiddenText}>Scratch to reveal!</Text>
                )}
            </ScratchView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    scratchCard: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 10,
        overflow: 'hidden',
    },
    hiddenText: {
        fontSize: 18,
        color: 'white',
    },
    rewardText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default ScratchCardScreen;
