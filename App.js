import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from "react-native";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  
  const [addDialogId, setAddDialogId] = useState(null);

  return (
    <View style={styles.mainCont}>
      <StatusBar style="light" />
      <Pressable style={styles.addButton} onPress={() => setAddDialogId(0)}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
      <View style={styles.container}>
        <Image
          source={require("./assets/todo.png")}
          style={styles.image}
        ></Image>
        <View>
          <Text style={styles.heading}>Todo App</Text>
          <Text style={{ color: "#ffffff" }}>
            Organize Today. Achieve Tomorrow.
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 18, flex: 1 }}>
        <Modal animationType="slide"
          visible={addDialogId != null}
          transparent={false}
          onRequestClose={() => {
            setAddDialogId(null);
          }} >
          <TodoForm
            todos={todos}
            setTodos={setTodos}
            addDialogId={addDialogId}
            setAddDialogId={setAddDialogId}
          ></TodoForm>
        </Modal>

        <Text style={styles.secondHeading}>Todos</Text>
        <View style={styles.itemCont}>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setAddDialogId={setAddDialogId}
          ></TodoList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    position: "relative"
  },
  container: {
    paddingTop: 48,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f72fc",
    borderBottomEndRadius: 32,
    borderBottomStartRadius: 32,
  },
  addButton: {
    backgroundColor: "#4f72fc",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 24,
    right: 24,
    elevation: 5, // adds shadow on Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 68,
    height: 68,
  },
  secondHeading: {
    marginTop: 24,
    fontSize: 32,
    textAlign: "center",
  },
  itemCont: {
    marginTop: 8,
    flex: 1,
  },
});
