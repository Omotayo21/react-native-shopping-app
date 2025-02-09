import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login"); // Replace with your actual next page route
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,

        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Image source={require("../assets/images/Dark Logo.png")} style={styles.logo} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default Home;
