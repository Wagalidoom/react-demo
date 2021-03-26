
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

const FilmDetail = (props) => {
    const [_film, setFilm] = useState(undefined);
    const [_isLoading, setIsLoading] = useState(true);


    const _displayFavoriteImage = () => {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (props.favoritesFilm.findIndex(item => item.id === _film.id) !== -1) {
          // Film dans nos favoris
          sourceImage = require('../Images/ic_favorite.png')
        }
        return (
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
        )
    }

    const _displayLoading = () => {
        if (_isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    const _toggleFavorite = () => {
        const action = { type: 'TOGGLE_FAVORITE', value: _film };
        props.dispatch(action);
    }

    const _displayFilm = () => {
        if (_film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(_film.backdrop_path) }}
                    />
                    <Text style={styles.title_text}>{_film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => _toggleFavorite()}>
                        {_displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{_film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(_film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {_film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {_film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(_film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {_film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {_film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }

    useEffect(() => {
        console.log(props.route.params);
        getFilmDetailFromApi(props.route.params.idFilm).then(data => {
            setFilm(data);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        console.log("componentDidUpdate : ")
        console.log(props.favoritesFilm)
    }, [props]);


    return (
        <View style={styles.main_container}>
            {_displayLoading()}
            {_displayFilm()}
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

export default connect(mapStateToProps)(FilmDetail);

