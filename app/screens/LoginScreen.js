import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { signIn, signUp } from "../../assets/services/AuthService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (isLogin) => {
    setLoading(true);
    setError("");
    try {
      const user = isLogin ? await signIn(email, password) : await signUp(email, password);
      const action = isLogin ? "Logged in" : "Account created";
      Alert.alert("Success", `${action} as ${user.email}`);
      navigation.navigate("Home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title={isLogin ? "Login" : "Sign Up"} onPress={() => handleAuth(isLogin)} />
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  toggleText: {
    marginTop: 15,
    textAlign: "center",
    color: "#007BFF",
  },
});

export default LoginScreen;
