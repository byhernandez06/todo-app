import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActiveTasksScreen from '../screens/ActiveTasksScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ActiveTasks" component={ActiveTasksScreen} options={{ headerShown: false }} />
            <Tab.Screen name="CompletedTasks" component={CompletedTasksScreen} options={{ title: 'Completed Tasks' }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
