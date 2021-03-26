import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmItem from './FilmItem'
import FilmList from './FilmList';

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
const Search = (props) => {
    const [_films, setFilms] = useState([]);
    const [_isLoading, setIsLoading] = useState(false);
    const _text = useRef('');
    const _page = useRef(0);
    const _totalPages = useRef(0);
    const newLoad = useRef(false);

    const _searchFilms = () => {
        newLoad.current = true;
        _page.current = 0;
        _totalPages.current = 0;
        setFilms([]);
    }

    useEffect(() => {
        if (newLoad.current) {
            console.log("Page : " + _page.current + " / TotalPages : " + _totalPages.current + " / Nombre de films : " + _films.length)
            newLoad.current = false;
            _loadFilms();
        }
    }, [_films]);

    const _loadFilms = () => {
        console.log(_text);
        if (_text.current.length > 0) {
            setIsLoading(true);
            getFilmsFromApiWithSearchedText(_text.current, _page.current + 1).then(data => {
                _page.current = data.page;
                _totalPages.current = data.total_pages;
                setFilms([..._films, ...data.results]);
                setIsLoading(false);
            });
        }
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

    return (
        <View style={styles.main_container}>
            <TextInput style={styles.textinput} placeholder='Titre du film' onChangeText={(text) => _text.current = text} onSubmitEditing={() => _searchFilms()} />
            <Button title='Rechercher' onPress={() => { _searchFilms() }} />
            <FilmList
                films={_films}
                navigation={props.navigation}
                loadFilms={_loadFilms}
                page={_page.current}
                totalPages={_totalPages.current}
            />
            {_displayLoading()}
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 30
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});



export default connect(mapStateToProps)(Search)