import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function App() {
  global.IP="192.168.0.103";

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
<Main />
  </QueryClientProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
