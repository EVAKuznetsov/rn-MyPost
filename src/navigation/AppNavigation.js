import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from 'react-native-vector-icons'

import { MainScreen, PostScreen, AboutScreen, BookedScreen, CreatePostScreen } from '../screens'
import { THEME } from '../theme'
import { AppHeaderButton } from '../components'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const BottomTabs =
    Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator()

const postNavigatorOptions = {
    screenOptions: {
        headerTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR,
        },
        headerTitleAlign: 'center',
    },
    initialRouteName: 'Main',
}
const defaultHeaderOptions = (navigation, title = '') => ({
    headerTitle: title,
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
            <Item iconName="ios-menu" title="Take a post" onPress={() => navigation.openDrawer()} />
        </HeaderButtons>
    ),
})

const PostNavigator = () => (
    <Stack.Navigator {...postNavigatorOptions}>
        <Stack.Screen
            name="Main"
            component={MainScreen}
            options={({ navigation }) => ({
                ...defaultHeaderOptions(navigation, 'Мои посты'),
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
                        <Item
                            iconName="ios-camera"
                            title="Take a post"
                            onPress={() => navigation.navigate('CreatePost')}
                        />
                    </HeaderButtons>
                ),
            })}
        />

        <Stack.Screen
            name="Post"
            component={PostScreen}
            options={({ route }) => ({
                headerTitle: `пост от ${new Date(route.params.postDate).toLocaleDateString()}`,
            })}
        />
    </Stack.Navigator>
)
const BookedNavigator = () => (
    <Stack.Navigator {...postNavigatorOptions}>
        <Stack.Screen
            name="MainBooked"
            component={BookedScreen}
            options={({ navigation }) => ({
                ...defaultHeaderOptions(navigation, 'Избранное'),
            })}
        />

        <Stack.Screen
            name="PostBooked"
            component={PostScreen}
            options={({ route }) => ({
                headerTitle: `пост от ${new Date(route.params.postDate).toLocaleDateString()}`,
            })}
        />
    </Stack.Navigator>
)
const DrawerNavigator = () => (
    <Drawer.Navigator
        drawerType={'slide'}
        drawerContentOptions={{
            activeTintColor: THEME.MAIN_COLOR,
            labelStyle: { fontFamily: 'open-bold' },
        }}
    >
        <Drawer.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{
                drawerLabel: 'Главная',
                drawerIcon: info => <Ionicons name="ios-apps" size={22} color={info.color} />,
            }}
        />
        <Drawer.Screen
            name="About"
            component={AboutNavigator}
            options={{
                drawerLabel: 'О приложении',
                drawerIcon: info => (
                    <Ionicons name="ios-information-circle" size={22} color={info.color} />
                ),
            }}
        />
        <Drawer.Screen
            name="CreatePost"
            component={CreatePostNavigator}
            options={{
                drawerLabel: 'Новый пост',
                drawerIcon: info => <Ionicons name="ios-aperture" size={22} color={info.color} />,
            }}
        />
    </Drawer.Navigator>
)
const AboutNavigator = () => (
    <Stack.Navigator {...postNavigatorOptions}>
        <Stack.Screen
            name="About"
            component={AboutScreen}
            options={({ navigation }) => ({ ...defaultHeaderOptions(navigation, 'О Нас') })}
        />
    </Stack.Navigator>
)
const CreatePostNavigator = () => (
    <Stack.Navigator {...postNavigatorOptions}>
        <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={({ navigation }) => ({
                ...defaultHeaderOptions(navigation, 'Создание поста'),
            })}
        />
    </Stack.Navigator>
)
const BottomNavigator = () => (
    <BottomTabs.Navigator
        tabBarOptions={{ activeTintColor: THEME.MAIN_COLOR }}
        barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
        shifting={true}
    >
        <BottomTabs.Screen
            name="Posts"
            component={PostNavigator}
            options={{
                tabBarLabel: 'Все',
                tabBarIcon: info => <Ionicons name="md-filing" size={25} color={info.color} />,
            }}
        />
        <BottomTabs.Screen
            name="Booked"
            component={BookedNavigator}
            options={{
                tabBarLabel: 'Избранные',
                tabBarIcon: info => <Ionicons name={'ios-star'} size={25} color={info.color} />,
            }}
        />
    </BottomTabs.Navigator>
)
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    )
}

export default AppNavigation
