import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";


export default function Home({route, navigation}) {
  const { user } = route.params;
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [audio, setmedia] = useState([]);

  const handlePlayButton =async(myfile)=>{
    const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({
          uri:myfile,
        });
        await playbackObject.playAsync();
  }

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "recordings/",
          { intermediates: true }
        );
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });

        // This is for simply playing the sound back
       /* const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({
          uri: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });
        await playbackObject.playAsync();
*/
        setmedia([...audio,{
          id:fileName,
          fileName:fileName,
          file:FileSystem.documentDirectory + "recordings/" + `${fileName}`
        }]);
        // resert our states to record again
        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log("Saved audio file to", savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={()=>navigation.navigate('Profile',{user:user})} style={{marginBottom:50, textAlign:'start', backgroundColor:'red', color:'white'}}>
      <Text>Profile</Text>
    </TouchableOpacity>
    <View style={{flexDirection:'row'}}>
    <Text style={{fontSize:30, fontWeight:'bold'}}>Welcome, </Text>
    <Text style={{marginTop:20}}>{user}</Text>
    </View>
    <Text style={{marginTop:30 }}>Start recording</Text>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome
          name={recording ? "stop-circle" : "circle"}
          size={64}
          color="white"
          
        />

      </TouchableOpacity>
      <Text
        style={styles.recordingStatusText}
      >{`Recording status: ${recordingStatus}`}</Text>

      {audio?.map((item)=>(
        <View key={item.id} style={styles.col1}>
        <Text>{item.fileName}</Text>
        <TouchableOpacity onPress={()=>handlePlayButton(item.file)}>
        <Text style={{marginLeft: 50, borderWidth: 1, }}>play</Text>
        </TouchableOpacity>
      </View>
      ))}
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "red",
  },
  recordingStatusText: {
    marginTop: 16,
  },
  col1:{
    display:'flex',
    flexDirection:'row',
    marginTop:10,
    textAlign:'center',



  }
});
