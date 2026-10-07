import React, { useEffect, useState } from "react";
import {
  View,
 Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYVlDkN71Udgf7y72ndvmDuwQIUbSghDE",
  authDomain: "fir-project-31e6d.firebaseapp.com",
  projectId: "fir-project-31e6d",
  storageBucket: "fir-project-31e6d.firebasestorage.app",
  messagingSenderId: "716964118561",
  appId: "1:716964118561:web:a9af95964da6198ce7a360"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [profile, setProfile] = useState(null);

  // =========================
  // 2.2 Persistent Authentication Flow
  // =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const profileRef = doc(db, "users", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setProfile(profileSnap.data());
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // =========================
  // 2.1 Registration and Login
  // =========================
  const register = async () => {
    if (!studentName || !email || !password) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      setProcessing(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      // =========================
      // 2.3 Create User-Owned Profile
      // =========================
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          studentName: studentName,
          email: email,
          createdAt: new Date().toISOString(),
        }
      );

      Alert.alert("Registration Successful");
    } catch (error) {
      Alert.alert("Registration Failed");
    } finally {
      setProcessing(false);
    }
  };

  // =========================
  // 2.1 Existing User Login
  // =========================
  const login = async () => {
    if (!email || !password) {
      Alert.alert("Enter Email and Password");
      return;
    }

    try {
      setProcessing(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert("Login Successful");
    } catch (error) {
      Alert.alert("Invalid Email or Password");
    } finally {
      setProcessing(false);
    }
  };

  // =========================
  // 2.4 Logout and Private-State Cleanup
  // =========================
  const logout = async () => {
    try {
      setProfile(null);
      await signOut(auth);
      Alert.alert("Logged Out");
    } catch (error) {
      Alert.alert("Logout Failed");
    }
  };

  // =========================
  // 2.2 Loading UI
  // =========================
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // =========================
  // 2.3 Retrieve and Display Own Profile
  // =========================
  if (user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 24 }}>
          Student Profile
        </Text>

        <Text>Name: {profile?.studentName}</Text>

        <Text>Email: {profile?.email}</Text>

        <Button
          title="Logout"
          onPress={logout}
        />
      </View>
    );
  }

  // =========================
  // 2.1 Authentication Screen
  // =========================
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button
        title={processing ? "Please Wait..." : "Register"}
        onPress={register}
        disabled={processing}
      />

      <View style={{ marginTop: 10 }} />

      <Button
        title={processing ? "Please Wait..." : "Login"}
        onPress={login}
        disabled={processing}
      />
    </View>
  );
}
