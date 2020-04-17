import React, { useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';


export default function New() {
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => { }}>
                <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Nome do autor"
                placeholderTextColor="#999"
                value={author}
                onChangeText={author => setAuthor(author)}
            />

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Local da foto"
                placeholderTextColor="#999"
                value={place}
                onChangeText={place => setPlace(place)}
            />

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Descrição"
                placeholderTextColor="#999"
                value={description}
                onChangeText={description => setDescription(description)}
            />

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Hashtags"
                placeholderTextColor="#999"
                value={hashtags}
                onChangeText={hashtags => setHashtags(hashtags)}
            />

            <TouchableOpacity
                style={styles.shareButton}
                onPress={() => { }}>
                <Text style={styles.shareButtonText}>Compartilhar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
  
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
  });