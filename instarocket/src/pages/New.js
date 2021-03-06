import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import {ScrollView, View, StyleSheet, TouchableOpacity, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';

export default function New({ navigation }) {

    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');

    function handleSelectImage() {
        ImagePicker.showImagePicker({
            title: 'Selecionar Imagem',
        }, upload => {
            if (upload.didCancel) {
                return;
                // console.log("Cancelado pelo Usuário")
            }
            if (upload.error) {
                return
                // console.log("Ocorreu um erro")
            }
            else {
                const preview = {
                    uri: `data:image/jpeg;base64,${upload.data}`
                }

                // let prefix;
                // let ext;

                // if (upload.fileName) {
                //     [prefix, ext] = upload.fileName.split('.');
                //     ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;

                // } else {
                //     prefix = new Date().getTime();
                //     ext = 'jpg'
                // }

                // const image = {
                //     fileName: upload.fileName,//`${prefix}.${ext}`
                //     uri: upload.uri,
                //     type: upload.type,
                // }

                setPreview(preview);
                setImage(upload);
            }
        })
    }

    async function handleSubmit() {

        RNFetchBlob.fetch('POST', 'http://192.168.0.106:3333/posts', {
            Authorization: "bearer access-token",
            'Content-Type': 'application/octet-stream',
        }, [
            { name: 'image', filename: image.fileName, type: image.type, data: RNFetchBlob.wrap(image.uri) },
            { name: 'author', data: author },
            { name: 'place', data: place },
            { name: 'description', data: description },
            { name: 'hashtags', data: hashtags },
        ])
            // .then(response => { console.log(response) })
            .catch(error => alert("Houve um erro ao realizar o post"))

        navigation.navigate('Feed')
    }

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="padding">

                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={handleSelectImage}>
                            <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
                        </TouchableOpacity>

                        {preview &&
                            <Image style={styles.preview} source={preview} />
                        }

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
                            onPress={handleSubmit}>
                            <Text style={styles.shareButtonText}>Compartilhar</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>

        </ScrollView>
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