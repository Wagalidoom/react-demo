import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import Search from './Components/Search';
import FilmDetail from './Components/FilmDetail';
import Store from './Store/configureStore'
import { Provider } from 'react-redux';
import Favorites from './Components/Favorites';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Rechercher" component={Search} />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Search"
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === 'Search') {
                console.log("oui");
                return <Image source={require('./Images/ic_search.png')} style={styles.icon} />
              } else if (route.name === 'Favorites') {
                return <Image source={require('./Images/ic_favorite.png')} style={styles.icon} />
              }
            },
          })}
           tabBarOptions={{
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
          }}  >
          <Tab.Screen name="Search" component={Home} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30
  }
});



