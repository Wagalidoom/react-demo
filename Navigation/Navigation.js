import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilmDetail from '../Components/FilmDetail';
import Search from '../Components/Search';
import Favorites from '../Components/Favorites';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
  }
});

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: Search
  },
  Favorites: {
    screen: Favorites
  }
})

export default createAppContainer(MoviesTabNavigator);


