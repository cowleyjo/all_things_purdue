import { Image } from 'expo-image';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, {useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Platform, StyleSheet } from 'react-native';




export default function DiningScreen() {
  const [menu, setMenu] = useState<any>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://192.168.1.199:8000/dining_courts')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch failed:", err);
        setMenu(null);   // fallback so UI won't crash
        setLoading(false);
      });
  }, []);
  
  
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />

  const meals = 
    menu?.data?.diningCourtByName?.dailyMenu?.meals &&
    Array.isArray(menu.data.diningCourtByName.dailyMenu.meals)
    ? menu.data.diningCourtByName.dailyMenu.meals
    : [];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Dining Court Menu */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Earhart Menu</ThemedText>

        {menu?.data?.diningCourtByName?.dailyMenu?.meals?.length ? (
          menu.data.diningCourtByName.dailyMenu.meals.map((meal: any, mIdx: number) => (
            <View key={mIdx} style={{ marginBottom: 10 }}>
              <ThemedText type="defaultSemiBold">{meal.name}</ThemedText>
              <ThemedText>
                {meal.startTime && meal.endTime
                  ? `${new Date(meal.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} – ${new Date(meal.endTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}`
                  : 'Time not available'}
              </ThemedText>

              {meal.stations?.length ? (
                meal.stations.map((station: any, sIdx: number) => (
                  <View key={sIdx} style={{ marginLeft: 10, marginTop: 5 }}>
                    <ThemedText type="defaultSemiBold">{station.name}</ThemedText>

                    {station.items?.length ? (
                      station.items.map((itemObj: any, iIdx: number) => (
                        <ThemedText key={iIdx} style={{ marginLeft: 10 }}>
                          {itemObj.item.name}{' '}
                          {itemObj.item.traits?.length
                            ? `(${itemObj.item.traits.map((t: any) => t.name).join(', ')})`
                            : ''}
                        </ThemedText>
                      ))
                    ) : (
                      <ThemedText style={{ marginLeft: 10 }}>No items</ThemedText>
                    )}
                  </View>
                ))
              ) : (
                <ThemedText style={{ marginLeft: 10 }}>No stations</ThemedText>
              )}
            </View>
          ))
        ) : (
          <ThemedText>No menu available</ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
