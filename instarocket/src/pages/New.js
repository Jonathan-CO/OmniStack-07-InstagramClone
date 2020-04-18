import React, { useState } from 'react';
import api from '../services/api';
import FormData, {getHeaders} from 'form-data';
import ImagePicker from 'react-native-image-picker';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';


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
                console.log("Cancelado pelo Usuário")
            }
            if (upload.error) {
                console.log("Ocorreu um erro")
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

                const image = {
                    uri: upload.uri,//.replace('content://', ''),
                    type: upload.type,
                    name: upload.fileName,//`${prefix}.${ext}`
                    // size: upload.fileSize
                }
                setPreview(preview);
                setImage(image);
                // setImage(image);
            }
        })
    }

    async function handleSubmit() {

        const post = new FormData();
        post.append('image', image);
        post.append('author', author);
        post.append('place', place);
        post.append('description', description);
        post.append('hashtags', hashtags);

        // let formHeaders = post.getHeaders();

        api.interceptors.request.use((config)=>{
            config.headers = {'content-type': `multipart/form-data`}
            console.log(config.data['_parts']);
            return config
        })

    
        await api.post(
            '/posts',
            post,
        )
        .then(response=>console.log(response))
        .catch(error => console.log(error));

        // navigation.navigate('Feed')
    }

    return (
        <View style={styles.container}>
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