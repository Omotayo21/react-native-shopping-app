import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router";
import { register } from "./authService";
import Toast from "react-native-toast-message";
export default function SignupPage() {
  const navigation = useNavigation();
  const router = useRouter()
  const [user, setUser] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateEmail = () => {
    if (
      !user.email.includes("@gmail.com") &&
      !user.email.includes("@yahoo.com")
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email:
          "Please enter a valid email address ending with @gmail.com or @yahoo.com",
      }));
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (user.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      return false;
    }
    return true;
  };

  const signupAction = async (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      try {
        setLoading(true);
const name = user.name;
const email = user.email;
       const password = user.password;
        await register(name, email, password)
        console.log("sucessful")
          Toast.show({ type: "success", text1: "signup  successful!" });
          navigation.replace("login");
       
       } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.name));
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Create an account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={user.username}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="name@mail.com"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 8 characters long"
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            buttonDisabled || loading ? styles.disabledButton : null,
          ]}
          onPress={signupAction}
          disabled={buttonDisabled || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.replace("login")}
          >
            Visit Login page
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#2F855A",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#F1F1F1",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#9AE6B4",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: "#2D3748",
    fontSize: 14,
    marginTop: 20,
  },
  link: {
    color: "#007BFF",
    fontWeight: "500",
  },
});
