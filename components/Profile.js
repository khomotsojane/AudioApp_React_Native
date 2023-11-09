import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { firestore_db } from "../auth/Firebase";
import { useRoute } from "@react-navigation/native";

export default function Profile() {
  const route = useRoute();
  const user = route.params.user;
  console.log(user);
  const [userData, setUserData] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      const db = collection(firestore_db, "users"); // Replace "users" with your Firestore collection name
      const querySnapshot = await getDocs(db);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().email.trim().toLowerCase() === user.trim().toLowerCase()
        ) {
          setUserData(doc.data());
        }
      });
    }

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Pressable style={styles.imagePlaceholder} onPress={pickImageAsync}>
            <Text style={styles.imagePlaceholderText}>Select Image</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.texts}>
        <Text style={styles.userName}>
          {userData ? userData.fullName : "User's Full Name"}
        </Text>
        <Text style={styles.userInfo}>
          Email: {userData ? userData.email : "User's email"}
        </Text>
        <Text style={styles.userInfo}>
          Location: {userData ? userData.location : "User's Location"}
        </Text>
        <Text style={styles.userInfo}>
          Phone: {userData ? userData.phone : "User's Phone"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  picture: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: "white",
  },
  texts: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userName: {
    fontSize: 24,
  },
  userInfo: {
    fontSize: 18,
  },
});
