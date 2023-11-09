import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";
import { firestore_db } from "./Firebase";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Registration({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const auth = firebase_auth;

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

      // Save user data to Firestore
      const db = collection(firestore_db, "users"); // Replace "users" with your Firestore collection name
      const userData = {
        fullName,
        location,
        phone,
        email,
        // Add more user data as needed
      };

      const docRef = await addDoc(db, userData);
      console.log("User data added with ID: ", docRef.id);

      alert("Check your emails");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      alert("Sign up failed: " + error.message);
    }
  };

  return (
    <View>
      <View style={{ marginHorizontal: 30, marginTop: 70 }}>
        <Text
          style={{
            color: "#e75480",
            fontSize: 45,
          }}
        >
          Register account
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#e75480",
            color: "#e75480",
            width: 300,
            marginTop: 50,
            textAlign: "center",
            height: 45,
            borderRadius: 16,
          }}
          placeholder="Full names"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        ></TextInput>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#e75480",
            color: "#e75480",
            width: 300,
            marginTop: 30,
            textAlign: "center",
            height: 45,
            borderRadius: 16,
          }}
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        ></TextInput>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#e75480",
            color: "#e75480",
            width: 300,
            marginTop: 30,
            textAlign: "center",
            height: 45,
            borderRadius: 16,
          }}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        ></TextInput>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#e75480",
            color: "#e75480",
            width: 300,
            marginTop: 30,
            textAlign: "center",
            height: 45,
            borderRadius: 16,
          }}
          placeholder="Email address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#e75480",
            color: "#e75480",
            width: 300,
            marginTop: 30,
            height: 45,
            borderRadius: 16,
            textAlign: "center",
          }}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <TouchableOpacity
          onPress={signUp}
          style={{
            backgroundColor: "#e75480",
            marginTop: 30,
            height: 45,
            borderRadius: 16,
          }}
        >
          <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text>Already have an account?</Text>
          <Text
            style={{ color: "orange", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}
