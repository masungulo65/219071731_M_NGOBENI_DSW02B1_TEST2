import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

export default function DetailScreen({ route }) {

  const { id } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const getProduct = async () => {

      try {

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        const data = await response.json();

        setProduct(data);

      } catch (error) {

        setError('Could not load product');

      } finally {

        setLoading(false);

      }
    };

    getProduct();

  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />

      <Text style={styles.title}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        ${product.price}
      </Text>

      <Text style={styles.description}>
        {product.description}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },

  description: {
    fontSize: 16,
    lineHeight: 24
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});