import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { login } from "./authService";
import { useRouter } from "expo-router";

const Login = () => {
  const navigation = useNavigation();
const router = useRouter()
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const loginAction = async () => {
    if (validateEmail() && validatePassword()) {
      try {
        setLoading(true);
       const email = user.email
       const password = user.password
         await login(email, password);
          Toast.show({ type: "success", text1: "Login successful!" });
        console.log("successful")
          router.replace("/(tabs)/home");
       

       
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: error.message,
        });
        setNotification({
          type: "error",
          message: "Incorrect email or password",
        });
        setTimeout(() => setNotification(null), 3000);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 7) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign into your account</Text>
        <TextInput
          placeholder="name@mail.com"
          style={[styles.input, errors.email && styles.inputError]}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          style={[styles.input, errors.password && styles.inputError]}
          secureTextEntry
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={loginAction}
          style={[
            styles.button,
            buttonDisabled && styles.buttonDisabled,
            loading && styles.loadingButton,
          ]}
          disabled={buttonDisabled || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account yet?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.replace("signup")}
          >
            Sign up
          </Text>
        </Text>

        {notification && (
          <View
            style={[
              styles.notification,
              notification.type === "error"
                ? styles.errorNotification
                : styles.successNotification,
            ]}
          >
            <Text style={styles.notificationText}>{notification.message}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: "#000",
  },
  inputError: {
    borderColor: "#E53E3E",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#007BFF",
    fontSize: 14,
    textAlign: "right",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#A0AEC0",
  },
  loadingButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 14,
    color: "#4A5568",
    textAlign: "center",
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  notification: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  errorNotification: {
    backgroundColor: "#E53E3E",
  },
  successNotification: {
    backgroundColor: "#38A169",
  },
  notificationText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Login;
