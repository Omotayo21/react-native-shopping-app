import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; 
import { useFocusEffect } from "expo-router";
const FavouritesPage = () => {
   const { theme } = useContext(ThemeContext);
   const styles = getStyles(theme);
  const [favourites, setFavourites] = useState([
  
  ]);
const fetchFavorites = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const response = await axios.get(
      "https://shopping-api-app.vercel.app/api/favorites",
      {
        headers: { Authorization: token }, // ✅ Fix: Properly format Authorization
      }
    );

    setFavourites(response.data);
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};
 useFocusEffect(
   useCallback(() => {
    
     fetchFavorites(); 

     return () => {
       console.log("Cart screen unfocused");
     };
   }, [])
 );

  const removeFromFavourites = async (productId) => {
  try{ const token = await AsyncStorage.getItem("token");
      await axios.post(
        "https://shopping-api-app.vercel.app/api/favorites/remove",
        { productId },
        {
          headers: { Authorization: token },
        }
      );
      console.log('sucessfully removed')
      fetchFavorites();
    } catch (error) {
      console.error("Error removing item:", error);
  };
};

  const renderFavouriteItem = ({ item }) => (
    <View style={styles.favouriteItem}>
      <Image source={{ uri: item.image }} style={styles.favouriteImage} />
      <View style={styles.favouriteDetails}>
        <Text style={styles.favouriteTitle}>{item.title}</Text>
        <Text style={styles.favouritePrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromFavourites(item.productId)}
      >
        <Ionicons name="heart" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourites</Text>
      <FlatList
        data={favourites}
        renderItem={renderFavouriteItem}
        keyExtractor={(item) => item.productId}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favourites added yet.</Text>
        }
      />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
    },
    favouriteItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    favouriteImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    favouriteDetails: {
      flex: 1,
    },
    favouriteTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    favouritePrice: {
      fontSize: 14,
      color: "#888",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    removeButton: {
      padding: 8,
    },
    emptyText: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 24,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginLeft: 20,
    },
  });

export default FavouritesPage;
