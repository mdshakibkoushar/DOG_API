import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useBreedStore } from './src/store/breedStore';

function MainApp() {
  // Listen to network status & handle offline sync
  useNetworkStatus();

  const initialize = useBreedStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary fallbackTitle="Application Error">
        <MainApp />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});
