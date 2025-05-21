import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import TodoItem from "./TodoItem";
import { Todo } from "../../../utils/types";

interface TodoListProps {
    todos: Todo[];
    loading: boolean;
    hasMore: boolean;
    loadMore: () => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    handleModal: (todo: Todo) => void;
    onRefresh: () => void;
    refreshing: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    loading,
    hasMore,
    loadMore,
    onToggle,
    onDelete,
    handleModal,
    onRefresh,
    refreshing,
}) => {
    if (loading && todos.length === 0) {
        return <ActivityIndicator size="large" color="#4f4f4f" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    if (!loading && todos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No todos available. Add some tasks!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TodoItem
                    todo={item}
                    onToggle={() => onToggle(item.id)}
                    onDelete={() => onDelete(item.id)}
                    handleModal={handleModal}
                />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListFooterComponent={
                loading ? (
                    <ActivityIndicator size="small" color="#4f4f4f" />
                ) : !hasMore ? (
                    <Text style={styles.endText}>You’ve reached the end!</Text>
                ) : null
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
        />
    );
};


export default TodoList;

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#767676',
    },
    endText: {
        textAlign: 'center',
        paddingVertical: 10,
        color: '#767676',
    },
})
