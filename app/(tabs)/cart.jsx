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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // ✅ Fix: Import axios
import { useFocusEffect } from "expo-router";
const CartPage = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [cart, setCart] = useState([]);


    const fetchCart = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://shopping-api-app.vercel.app/api/cart",
          {
            headers: { Authorization: token }, // ✅ Fix: Properly format Authorization
          }
        );

        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
   useFocusEffect(
     useCallback(() => {
      
       fetchCart(); 

       return () => {
         console.log("Cart screen unfocused");
       };
     }, [])
   );

  // ✅ Fix: Define missing functions
  const increaseQuantity = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "https://shopping-api-app.vercel.app/api/cart/increase",
        { productId },
        {
          headers: { Authorization: token },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };
const decreaseQuantity = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "https://shopping-api-app.vercel.app/api/cart/decrease",
        { productId },
        {
          headers: { Authorization: token },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "https://shopping-api-app.vercel.app/api/cart/remove",
        { productId },
        {
          headers: { Authorization: token },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartTitle}>{item.title}</Text>
        <Text style={styles.cartPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.productId)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.productId)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.productId)}
      >
        <Ionicons name="trash" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.productId}
        ListEmptyComponent={
          <Image
            source={require("@/assets/images/mtcart.png")}
            style={{
              width: 320,
              height: 280,
              alignSelf: "center",
              marginTop: 100,
            }}
          />
        }
      />
      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
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
    cartItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#1E1E1E" : "#F5F5F5",
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    cartImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    cartDetails: {
      flex: 1,
    },
    cartTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    cartPrice: {
      fontSize: 14,
      color: theme === "dark" ? "#BBBBBB" : "#555555",
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    quantityButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#007BFF",
      justifyContent: "center",
      alignItems: "center",
    },
    quantityButtonText: {
      color: "#fff",
      fontSize: 18,
    },
    quantityText: {
      fontSize: 16,
      marginHorizontal: 8,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    removeButton: {
      padding: 8,
    },
    checkoutButton: {
      backgroundColor: "#007BFF",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
    },
    checkoutButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default CartPage;
