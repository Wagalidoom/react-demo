import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

const FilmList = (props) => {
    const [_films, setFilms] = useState([]);

    const _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm);
        props.navigation.navigate("FilmDetail", { idFilm: idFilm });
    }

    return (<FlatList
        extraData={props.favoritesFilm}
        data={_films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
            <FilmItem
                film={item}
                displayDetailForFilm={_displayDetailForFilm}
                isFilmFavorite={(props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
            />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
            if (props.page < props.totalPages) {
                console.log("reload other films");
                props._loadFilms();
            }
        }}
    />)
}

export default FilmList