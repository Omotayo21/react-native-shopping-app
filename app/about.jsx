import { useRouter } from "expo-router";
import React from "react";
import { View, Text, ScrollView, StyleSheet,TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const AboutPage = () => {
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
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Replace with your app logo
          style={styles.logo}
        />
        <Text style={styles.title}>About Us</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Welcome to our e-commerce app! We are dedicated to providing you with
          the best shopping experience. Our mission is to offer high-quality
          products at affordable prices, delivered right to your doorstep.
        </Text>
        <Text style={styles.text}>
          Our team is passionate about creating a seamless and enjoyable
          shopping experience for you. We are constantly working to improve our
          app and add new features to meet your needs.
        </Text>
        <Text style={styles.text}>
          Thank you for choosing us. We appreciate your support and look forward
          to serving you!
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
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
  text: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
});

export default AboutPage;
