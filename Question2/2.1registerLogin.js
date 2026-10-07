import { useState } from "react";
import { TextInput, Button, Alert, View } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";

export default function AuthScreen() {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!studentName || !email || !password) {
      Alert.alert("Please complete all fields");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registration Successful");
    } catch (error) {
      Alert.alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Successful");
    } catch (error) {
      Alert.alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? "Please Wait..." : "Register"}
        onPress={register}
        disabled={loading}
      />

      <Button
        title={loading ? "Please Wait..." : "Login"}
        onPress={login}
        disabled={loading}
      />
    </View>
  );
}