import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { NavigationProp, Todo } from '../../../utils/types';
import CustomCheckbox from '../CustomCheckbox';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

type TodoItemProps = {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
    handleModal: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, handleModal }) => {
    const navigation = useNavigation<any>();
    const strikeAnim = useRef(new Animated.Value(todo.completed ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(strikeAnim, {
            toValue: todo.completed ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [todo.completed]);

    const lineWidth = strikeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const onEdit = () => {
        navigation.navigate('AddTodo', { id: todo.id });

    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => handleModal(todo)}>
            <View style={styles.todoContent}>
                <CustomCheckbox
                    checked={todo.completed}
                    onToggle={onToggle}
                    size={18}
                    color="#767676"
                    style={styles.checkbox}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.titleText} numberOfLines={1}>
                        {todo.title}
                    </Text>
                    <Animated.View style={[styles.strikeThrough, { width: lineWidth }]} />
                </View>
            </View>

            <View style={styles.actions}>
                <EntypoIcon
                    name="edit"
                    size={20}
                    color="#767676"
                    onPress={onEdit}
                    style={{ marginRight: 12 }}
                />
                <EntypoIcon
                    name="cross"
                    size={24}
                    color="#767676"
                    onPress={onDelete}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 6,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#e2e0da',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    todoContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkbox: {
        width: '10%',
    },
    textWrapper: {
        position: 'relative',
        width: '80%',
    },
    todoText: {
        fontSize: 14,
        color: '#767676',
        textTransform: 'capitalize',
    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textTransform: 'capitalize',
    },
    metaText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
    },
    strikeThrough: {
        position: 'absolute',
        height: 2,
        backgroundColor: '#767676',
        top: '45%',
        transform: [{ translateY: -1 }],
        left: 0,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default React.memo(TodoItem);
