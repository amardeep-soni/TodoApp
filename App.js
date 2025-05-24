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
} from "react-native";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
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
        <TodoForm
          todos={todos}
          setTodos={setTodos}
          editId={editId}
          setEditId={setEditId}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        ></TodoForm>

        <Text style={styles.secondHeading}>Todos</Text>
        <View style={styles.itemCont}>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setEditId={setEditId}
            setTitle={setTitle}
            setDescription={setDescription}
          ></TodoList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f72fc",
    borderBottomEndRadius: 32,
    borderBottomStartRadius: 32,
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
