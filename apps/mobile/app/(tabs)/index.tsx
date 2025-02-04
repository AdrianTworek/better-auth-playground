import { Image, StyleSheet, TextInput, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useSession, signUp, signIn, signOut } from '@/lib/auth-client';
import { useState } from 'react';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);

  const { data } = useSession();

  const handleSubmit = async () => {
    if (registerMode) {
      await signUp.email({ name, email, password });
    } else {
      await signIn.email({ email, password });
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {data?.user ? (
        <ThemedView>
          <ThemedText>Logged in as: {data.user.name}</ThemedText>
          <Button title="Sign out" onPress={() => signOut()} />
        </ThemedView>
      ) : (
        <ThemedView>
          {registerMode ? (
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoCapitalize="none"
            />
          ) : null}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button title={registerMode ? 'Register' : 'Login'} onPress={handleSubmit} />

          <ThemedView>
            {registerMode ? (
              <Button title="Already have an account? Login" onPress={() => setRegisterMode(false)} />
            ) : (
              <Button title="Don't have an account? Register" onPress={() => setRegisterMode(true)} />
            )}
          </ThemedView>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    color: 'white',
  },
});
