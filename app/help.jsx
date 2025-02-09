import { useRouter } from "expo-router";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const HelpPage = () => {
  const router = useRouter()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topIconsContainer}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Help & Support</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>How to Use the App</Text>
        <Text style={styles.text}>
          1. **Browse Products**: Use the home page to browse through our wide
          range of products.
        </Text>
        <Text style={styles.text}>
          2. **Add to Cart**: Tap on a product to view details and add it to
          your cart.
        </Text>
        <Text style={styles.text}>
          3. **Checkout**: Go to your cart, review your order, and proceed to
          checkout.
        </Text>
        <Text style={styles.text}>
          4. **Track Orders**: View your order history and track the status of
          your orders.
        </Text>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Text style={styles.text}>
          **Q: How do I reset my password?**
          {"\n"}
          A: Go to the login page and tap on "Forgot Password."
        </Text>
        <Text style={styles.text}>
          **Q: How can I contact support?**
          {"\n"}
          A: Visit the Contact Us page to reach out via email or phone.
        </Text>
        <Text style={styles.text}>
          **Q: What payment methods are accepted?**
          {"\n"}
          A: We accept credit/debit cards, PayPal, and other popular payment
          methods.
        </Text>
      </View>
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
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
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
  text: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
});

export default HelpPage;
