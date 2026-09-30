// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    })
  ),
}));

// Mock expo-image
jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Image: React.forwardRef((props, ref) =>
      React.createElement(View, { ...props, ref, testID: props.testID || 'expo-image' })
    ),
    clearMemoryCache: jest.fn(() => Promise.resolve()),
    clearDiskCache: jest.fn(() => Promise.resolve()),
    prefetch: jest.fn(() => Promise.resolve(true)),
  };
});
