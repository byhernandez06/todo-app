import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from '../slices/authSlice';
import { AppDispatch } from '../app/store';
import TabNavigator from './TabNavigator';
import EditTodoScreen from '../screens/EditTodoScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{
                headerTitle: 'Tasks App',
                headerLeft: () => null,
                headerRight: () => (
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                    />
                ),
            }} />
            <Stack.Screen name="EditTodo" component={EditTodoScreen} />
        </Stack.Navigator>
    )
};

export default AppNavigator;
