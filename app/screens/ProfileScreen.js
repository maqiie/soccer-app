import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card } from '@gluestack-ui/themed';
import { auth } from '../../assets/services/firebaseConfig';
import ProtectedScreen from '../screens/ProtectedScreen';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [user] = useAuthState(auth);
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || 'Guest User');
  const [favoriteTeam, setFavoriteTeam] = useState(user?.favoriteTeam || '');
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || 'https://via.placeholder.com/150');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login'); // Ensure user is redirected
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };
  

  const handleDeleteAccount = async () => {
    Alert.alert('Delete Account', 'This action cannot be undone. Proceed?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: async () => {
          try {
            await user.delete();
            navigation.navigate('Login');
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        }, style: 'destructive' },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      await user.updateProfile({
        displayName: name,
        photoURL: profilePicture,
      });
      // Assuming you have a way to update favoriteTeam in your user profile
      // await updateFavoriteTeam(favoriteTeam);
      setEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ProtectedScreen>
      <View style={styles.container}>
        <Card style={styles.profileCard}>
          <Avatar
            source={{ uri: profilePicture }}
            size="lg"
            alt="User Avatar"
            style={styles.avatar}
          />
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Favorite Team"
                value={favoriteTeam}
                onChangeText={setFavoriteTeam}
              />
              <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
              </TouchableOpacity>
              <Button onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.favoriteTeam}>{favoriteTeam ? `Favorite Team: ${favoriteTeam}` : ''}</Text>
              <TouchableOpacity onPress={() => setEditing(true)} style={styles.settingItem}>
                <Text style={styles.settingText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingItem}>
                <Text style={styles.settingText}>Account Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.settingItem}>
                <Text style={styles.settingText}>Notification Preferences</Text>
              </TouchableOpacity>
            </>
          )}
          <Button onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.buttonText}>Logout</Text>
          </Button>
          <Button onPress={handleDeleteAccount} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </Button>
        </Card>
      </View>
    </ProtectedScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#6200EE',
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  favoriteTeam: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  settingItem: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#D9534F',
    borderRadius: 8,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
