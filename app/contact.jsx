import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const ContactPage = () => {
      const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log("Form submitted:", { name, email, message });
    // Add logic to send the message
  };

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
        <Text style={styles.title}>Contact Us</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Have questions or need assistance? We're here to help! Reach out to us
          via email, phone, or the contact form below.
        </Text>
        <Text style={styles.contactInfo}>Email: support@example.com</Text>
        <Text style={styles.contactInfo}>Phone: +1 (123) 456-7890</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: "#007BFF",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  messageInput: {
    height: 120,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactPage;
