import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const RatingScreen = () => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (star) => {
    setRating(star);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)} style={styles.estrela}>
          {i <= rating ? (
            <Image source={require('./src/assets/cheia.png')} style={{ width: 80, height: 80 }} />
          ) : (
            <Image source={require('./src/assets/vazia.png')} style={{ width: 80, height: 80 }} />
          )}
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.txt}>Classifique sua viagem:</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderStars()}
        </View>
        <Text style={styles.txt1}>Sua avaliação: {rating} estrelas</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  txt: {
    color: 'black',
    fontSize: 35,
  },
  txt1: {
    color: 'black',
    fontSize: 25,
    marginTop: 20
  },
  estrela: {
    marginTop: 10
  },
});

export default RatingScreen;
