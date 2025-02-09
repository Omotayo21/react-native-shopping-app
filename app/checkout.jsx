import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import storage
import axios from "axios";
const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [promoCode, setPromoCode] = useState("");

  // Fetch cart data from AsyncStorage
  useEffect(() => {
    const fetchCartData = async () => {
      try {
       const token = await AsyncStorage.getItem("token");
       if (!token) return;

       const response = await axios.get(
         "https://shopping-api-app.vercel.app/api/cart",
         {
           headers: { Authorization: token }, // ✅ Fix: Properly format Authorization
         }
       );

       setCartItems(response.data); 
      
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 10.0;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    console.log("Order placed!");
    // Add logic to process the order
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topIconsContainer}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.productId} style={styles.orderItem}>
              <Text style={styles.orderItemText}>
                {item.title} (x{item.quantity})
              </Text>
              
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 10 }}>No items in cart</Text>
        )}

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Shipping</Text>
          <Text style={styles.summaryText}>${shippingCost.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tax</Text>
          <Text style={styles.summaryText}>${tax.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total</Text>
          <Text style={styles.summaryTotal}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Ionicons name="location" size={20} color="#007BFF" />
          <View style={styles.addressDetails}>
            <Text style={styles.addressText}>{shippingAddress.name || "No address set"}</Text>
            <Text style={styles.addressText}>{shippingAddress.address || "Add an address"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Change Address</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          <Ionicons name="card" size={20} color="#007BFF" />
          <Text style={styles.paymentText}>
            {paymentMethod.type ? `${paymentMethod.type} ****${paymentMethod.last4}` : "No payment method"}
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Change Payment Method</Text>
        </TouchableOpacity>
      </View>

      {/* Promo Code */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promo Code</Text>
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  topIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 30,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderItemText: {
    fontSize: 16,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: "#888",
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  addressDetails: {
    marginLeft: 8,
  },
  addressText: {
    fontSize: 16,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  paymentText: {
    fontSize: 16,
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
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutPage;
