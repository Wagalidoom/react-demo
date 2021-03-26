import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getImageFromApi } from '../API/TMDBApi'

const FilmItem = ({ film, displayDetailForFilm, isFilmFavorite }) => {

    const _displayFavoriteImage = () => {
        if (isFilmFavorite) {
            // Si la props isFilmFavorite vaut true, on affiche le 🖤
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../Images/ic_favorite.png')}
                />
            )
        }
    }
    return (
        <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
            <Image
                style={styles.image}
                source={{ uri: getImageFromApi(film.poster_path) }}
            />
            <View style={styles.content_container}>
                <View style={styles.header_container}>
                {_displayFavoriteImage()}
                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.vote_text}>{film.vote_average}</Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                </View>
                <View style={styles.date_container}>
                    <Text style={styles.date_text}>{film.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
});

export default FilmItem