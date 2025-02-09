


import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { ThemeContext } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../authService";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(
          "https://shopping-api-app.vercel.app/api/user",
          {
            headers: { Authorization: token },
          }
        );

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const styles = getStyles(theme);
const logoutAction = async () => {
  await logout()
  console.log("logout successful")
  router.push("/login");

}
  const userinfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    profilePicture: "https://via.placeholder.com/150",
    addresses: [
      { id: 1, type: "Home", address: "123 Main St, New York, NY 10001" },
      { id: 2, type: "Work", address: "456 Broadway, New York, NY 10002" },
    ],
    paymentMethods: [
      { id: 1, type: "Visa", last4: "1234" },
      { id: 2, type: "PayPal", email: "johndoe@example.com" },
    ],
    orders: [
      { id: 1, date: "2023-10-01", total: 99.99, status: "Delivered" },
      { id: 2, date: "2023-09-25", total: 49.99, status: "Shipped" },
    ],
    wishlist: [
      { id: 1, name: "Product 1", image: "https://via.placeholder.com/100" },
      { id: 2, name: "Product 2", image: "https://via.placeholder.com/100" },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      {/* User Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoItem}>
          <Ionicons name="person" size={20} color="#007BFF" />
          <Text style={styles.infoText}>{user.name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={20} color="#007BFF" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={20} color="#007BFF" />
          <Text style={styles.infoText}>{userinfo.phone}</Text>
        </View>
      </View>
      {/* Address Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Addresses</Text>
        {userinfo.addresses.map((address) => (
          <View key={address.id} style={styles.infoItem}>
            <Ionicons name="location" size={20} color="#007BFF" />
            <View>
              <Text style={styles.infoText}>{address.type}</Text>
              <Text style={styles.infoSubText}>{address.address}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {userinfo.paymentMethods.map((payment) => (
          <View key={payment.id} style={styles.infoItem}>
            <Ionicons name="card" size={20} color="#007BFF" />
            <Text style={styles.infoText}>
              {payment.type} ****{payment.last4}
            </Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>
      </View>

      {/* Order History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {userinfo.orders.map((order) => (
          <View key={order.id} style={styles.infoItem}>
            <Ionicons name="receipt" size={20} color="#007BFF" />
            <View>
              <Text style={styles.infoText}>Order #{order.id}</Text>
              <Text style={styles.infoSubText}>
                {order.date} - ${order.total} - {order.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Wishlist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wishlist</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {userinfo.wishlist.map((item) => (
            <View key={item.id} style={styles.wishlistItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.wishlistImage}
              />
              <Text style={styles.wishlistText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Dark Mode</Text>
          <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>
      </View>
     
      {/* Logout */}

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={logoutAction}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Function to generate styles dynamically based on theme
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      flex: 1,
      padding: 16,
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 24,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 8,
    },
    profileName: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    profileEmail: {
      fontSize: 16,
      color: "#888",
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    infoText: {
      fontSize: 16,
      marginLeft: 8,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    section: {
    marginBottom: 24,
  },
 
  infoSubText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  wishlistItem: {
    marginRight: 16,
    alignItems: "center",
  },
  wishlistImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  wishlistText: {
    fontSize: 14,
    marginTop: 8,
  },
    preferenceItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    preferenceText: {
      fontSize: 16,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    logoutButton: {
      backgroundColor: "#FF3B30",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 20,
    },
    logoutButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    
  });

export default Profile;

