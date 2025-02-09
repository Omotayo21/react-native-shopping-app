import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
 
  Image
} from "react-native"

const Completed = () => {
    return (
      <ScrollView>
        {" "}
        <Image
          source={require("@/assets/images/Frame 5 (1).png")}
          style={{
            width: 220,
            height: 180,
            alignSelf: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        />
        <View>
          <Text style= {styles.title}>Your order has been completed </Text>
          <Text style={styles.sentence}>Your item is on its way </Text>
        </View>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 10,
    textAlign: "center",
  },
  sentence : {
    textAlign: 'center',
fontSize: 10,
  }
});
export default Completed;
 
 