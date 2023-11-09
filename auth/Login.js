import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { firebase_auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login({ navigation }) {
  //const navigation = props.navigation;
  //const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const Login= async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Logged in successfully");
      navigation.navigate('Home',{user:response.user.email})
      console.log("navigated")
    } catch (error) {
      console.log("error");
      alert("Sign in failed:" + error.message);
    }
  };

  return (
    <View>
    <View style={{marginHorizontal:30, marginTop: 140}}>
    <Text
        style={{
          color: "#e75480",
          fontSize: 45,
        }}
      >
        Log In
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#e75480",
          color: "#e75480",
          //width: 300,
          marginTop:50,
          height:45,
          borderRadius:16,
          textAlign:'center'
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
          //width: 300,
          marginTop: 30,
          height:45,
          textAlign:'center',
          borderRadius:16
        }}
        placeholder="Password"
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity onPress={Login} style={{backgroundColor:"#e75480", marginTop:30, height:45, borderRadius:16,}}>
        <Text style={{  alignSelf:'center', marginTop:10, fontSize:20, color:'white'}}>Log In</Text>
      </TouchableOpacity>
      <Text style={{textAlign:'center', marginTop:20, fontSize:30}}>OR</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Registration')} style={{backgroundColor:'purple', marginTop:20, height:45, borderRadius:16,}}>
        <Text style={{  alignSelf:'center', marginTop:10,  fontSize:20, color:'white'}}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{color:'purple'}}>Forgot Password?</Text>
      <TouchableOpacity>
      <Text>Click here</Text>
      </TouchableOpacity>
    </View>
    
    </View>
  );
}
