import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Todo } from "../../../utils/types";
import { View } from "react-native";
import moment from "moment";

interface TodoModalProps {
    visible: boolean;
    todo: Todo | null;
    onClose: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ visible, todo, onClose }) => {
    if (!todo) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Todo Details</Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>User ID:</Text> {todo.userId}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>ID:</Text> {todo.id}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Title:</Text> {todo.title}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Created At:</Text> {moment(todo.created_at).format('LLL')}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Updated At:</Text> {moment(todo.updated_at).format('LLL')}
                    </Text>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};
export default TodoModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4f4f4f',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
    },
})