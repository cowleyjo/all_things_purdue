import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function GymScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Gym</ThemedText>
      <ThemedText>
        This is a placeholder for the Gym tab. You can later add workout schedules, equipment info, or fitness stats here.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
