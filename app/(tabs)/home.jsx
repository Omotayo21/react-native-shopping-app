import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { ThemeContext } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState({});
  const [addedToCart, setAddedToCart] = useState({}); // Track added products
  const [favorites, setFavorites] = useState([]); // Track favorited products

  // Fetch user profile and favorites
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://shopping-api-app.vercel.app/api/user",
        {
          headers: { Authorization: token },
        }
      );
      const data = await response.json();
      setUser(data);

      // Fetch user's favorites
      const favoritesResponse = await fetch(
        "https://shopping-api-app.vercel.app/api/favorites",
        {
          headers: { Authorization: token },
        }
      );
      const favoritesData = await favoritesResponse.json();
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching profile or favorites:", error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      setFilteredProducts(response.data);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(response.data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUserProfile();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Open product details modal
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  // Close product details modal
  const closeProductDetails = () => {
    setIsModalVisible(false);
  };

  // Handle category selection
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // Add to cart
  const addToCart = async (product) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch("https://shopping-api-app.vercel.app/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        }),
      });

      // Update the addedToCart state
      setAddedToCart((prev) => ({ ...prev, [product.id]: true }));

      Toast.show({ type: "success", text1: "Added to cart!" });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
//const isFavorite = favorites.some(
//  (item) => item.productId.toString() === selectedProduct.id.toString()
//);
  // Toggle favorites
  const toggleFavorite = async (product) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://shopping-api-app.vercel.app/api/favorites/toggle-favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Update the favorites state
        setFavorites(data.favorites);

        Toast.show({
          type: "success",
          text1: data.message,
        });
      } else {
        throw new Error(data.error || "Failed to toggle favorite");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  // Render product item
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => openProductDetails(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            addedToCart[item.id] && styles.disabledButton,
          ]}
          onPress={() => addToCart(item)}
          disabled={addedToCart[item.id]}
        >
          <Text style={styles.addToCartText}>
            {addedToCart[item.id] ? "Added to Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Top Icons */}
      <View style={styles.topIconsContainer}>
        <Text style={styles.name}>Hello, {user ? user.name : "guest"}</Text>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => router.push("/menu")}
        >
          <Ionicons name="menu" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Rahman's Store</Text>
      {/* Search Bar */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Category Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(null)}
          >
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>

      {/* Product Details Modal */}
      <Modal
        key={favorites.length} // Force re-render when favorites change
        isVisible={isModalVisible}
        onBackdropPress={closeProductDetails}
        onSwipeComplete={closeProductDetails}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {selectedProduct && (
            <ScrollView>
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
              <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
              <Text style={styles.modalCategory}>
                Category: {selectedProduct.category}
              </Text>
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>
              <Text style={styles.modalRatings}>
                Rating: {selectedProduct.rating.rate}
                <Ionicons name="star" color="#FFD700" size={14} />
              </Text>
              <Text style={styles.modalCounts}>
                Reviews : {selectedProduct.rating.count}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[
                    styles.modalAddToCartButton,
                    addedToCart[selectedProduct.id] && styles.disabledButton,
                  ]}
                  onPress={() => addToCart(selectedProduct)}
                  disabled={addedToCart[selectedProduct.id]}
                >
                  <Text style={styles.modalAddToCartText}>
                    {addedToCart[selectedProduct.id]
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconHeartCircle}
                  onPress={() => toggleFavorite(selectedProduct)}
                >
                  <Ionicons name="heart" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};




const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
    },
    topIconsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      marginTop: 30,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    iconHeartCircle: {
      marginTop: 7,
      marginLeft: 3,
    },
    searchWrapper: {
      marginBottom: 16,
    },
    searchInput: {
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      height: 48,
      width: "100%",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 24,
      paddingHorizontal: 16,
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
    },
    categoryContainer: {
      marginBottom: 16,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#ccc",
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      marginRight: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    selectedCategoryButton: {
      backgroundColor: "#007BFF",
      borderColor: "#ccc",
    },
    categoryButtonText: {
      fontSize: 14,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    productList: {
      paddingBottom: 16,
      marginTop: 20,
    },
    productItem: {
      flex: 1,
      margin: 8,
      padding: 16,
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      alignItems: "center",
    },
    productImage: {
      width: "100%",
      height: 120,
      resizeMode: "contain",
      marginBottom: 8,
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    productName: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 4,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    productPrice: {
      fontSize: 16,
      color: "#888",
      marginBottom: 8,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    addToCartButton: {
      backgroundColor: "#007BFF",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    disabledButton: {
      backgroundColor: "#ccc", // Change color for disabled state
    },
    addToCartText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "bold",
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: "85%",
    },
    modalImage: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    modalPrice: {
      fontSize: 18,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      marginBottom: 16,
    },
    modalDescription: {
      fontSize: 16,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      marginBottom: 16,
    },
    modalAddToCartButton: {
      backgroundColor: "#007BFF",
      paddingVertical: 12,
      borderRadius: 20,
      alignItems: "center",
      width: 320,
      height: 50,
    },
    modalAddToCartText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    buttons: {
      flexDirection: "row",
    },
    modalRatings: {
      fontSize: 16,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      marginBottom: 10,
    },
    modalCounts: {
      fontSize: 16,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      marginBottom: 8,
    },
    modalCategory: {
      fontWeight: "bold",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    name: {
      fontWeight: "bold",
      fontSize: 20,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#007BFF",
      marginBottom: 20,
      textAlign: "center",
    },
  });

export default Home;
