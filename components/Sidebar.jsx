import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Sidebar = ({ navigation, closeDrawer }) => {
  const handleNavigation = (screen) => {
    navigation.navigate(screen); // Navigate to the selected screen
    closeDrawer(); // Close the sidebar after navigation
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleNavigation("About")}
      >
        <Ionicons name="information-circle" size={24} color="#007BFF" />
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleNavigation("Contact")}
      >
        <Ionicons name="mail" size={24} color="#007BFF" />
        <Text style={styles.menuText}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleNavigation("Help")}
      >
        <Ionicons name="help-circle" size={24} color="#007BFF" />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Sidebar;
