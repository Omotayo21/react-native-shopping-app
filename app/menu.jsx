import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Menu = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topIconsContainer}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.header}>Menu</Text>
      </View>
      <View style={styles.menuContainer}>
        <MenuItem
          title="About"
          icon="information-circle"
          onPress={() => handleNavigation("about")}
        />
        <MenuItem
          title="Contact"
          icon="mail"
          onPress={() => handleNavigation("contact")}
        />
        <MenuItem
          title="Help"
          icon="help-circle"
          onPress={() => handleNavigation("help")}
        />
        <MenuItem
          title="Orders"
          icon="cart"
          onPress={() => handleNavigation("Orders")}
        />
        <MenuItem
          title="Favorites"
          icon="heart"
          onPress={() => handleNavigation("favourites")}
        />
        <MenuItem
          title="Profile"
          icon="person"
          onPress={() => handleNavigation("profile")}
        />
        <MenuItem
          title="Settings"
          icon="settings"
          onPress={() => handleNavigation("settings")}
        />
        <MenuItem
          title="Logout"
          icon="log-out"
          onPress={() => handleNavigation("logout")}
        />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#007BFF" />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  topIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  iconCircle: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#EAEAEA",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
  },
  menuContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
});

export default Menu;
