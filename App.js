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
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {
  const [todos, setTodos] = useState([]);

  const [descriptionShowId, setDescriptionShowId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const completeTodo = (isChecked, id) => {
    const newData = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: isChecked }; // return a new object with the updated value
      }
      return todo; // return the original object if no update is needed
    });

    setTodos(newData); // update the state
  };

  const onChangeText = (type, text) => {
    if (type == "title") {
      setTitle(text);
    } else if (type == "description") {
      setDescription(text);
    }
  };

  const saveTodo = () => {
    if (title == "") {
      return;
    }
    if (editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: title, description: description }
          : todo
      );
      setTodos(updatedTodos);
      setEditId(null);
    } else {
      let maxId = Math.max(...todos.map((t) => t.id), 0); // ensures at least 0
      const newId = maxId + 1;
      const todo = {
        id: newId,
        title: title,
        description: description,
        isCompleted: false,
      };
      setTodos([todo, ...todos]);
    }

    setTitle("");
    setDescription("");
    // 👇 Blur the inputs to remove keyboard
    titleRef.current?.blur();
    descRef.current?.blur();
    console.log(todos);
  };

  const onEdit = (id) => {
    const todo = todos.find((t) => t.id == id);
    if (!todo) {
      return;
    }
    setEditId(id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const onDelete = (id) => {
    console.log(id);
    const newTodo = todos.filter((t) => t.id != id);
    console.log(newTodo);

    setTodos([...newTodo]);
  };

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
        <></>

        <Text style={styles.secondHeading}>Todos</Text>
        <View style={styles.itemCont}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.topItem}>
                  <View style={styles.itemTextCont}>
                    <BouncyCheckbox
                      onPress={(isChecked) => completeTodo(isChecked, item.id)}
                      iconStyle={{
                        borderColor: "#9342f5",
                        alignSelf: "flex-start",
                      }}
                      textStyle={{ color: "white", marginLeft: -8 }}
                      size={28}
                      text={item.title}
                      isChecked={item.isCompleted}
                    />
                  </View>
                  <View style={styles.actionButtons}>
                    <View>
                      <Pressable
                        android_ripple={{ color: "#859dfc" }}
                        onPress={() => onEdit(item.id)}
                      >
                        <Text style={styles.editIcon}>📝</Text>
                      </Pressable>
                    </View>
                    <View>
                      <Pressable
                        android_ripple={{ color: "#859dfc" }}
                        onPress={() => onDelete(item.id)}
                      >
                        <Text style={styles.deleteIcon}>🗑️</Text>
                      </Pressable>
                    </View>
                    <View>
                      <Pressable android_ripple={{ color: "#859dfc" }}>
                        <Text
                          style={styles.arrow}
                          onPress={() =>
                            setDescriptionShowId(
                              descriptionShowId == item.id ? null : item.id
                            )
                          }
                        >
                          {descriptionShowId == item.id ? "⬆️" : "⬇️"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {descriptionShowId == item.id && (
                  <Text style={styles.itemDescription}>
                    {item.description
                      ? item.description
                      : "No Description available"}
                  </Text>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
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
  inputContainer: {
    marginTop: 24,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    paddingHorizontal: 16,
  },
  inputButtonCont: {
    borderRadius: 8,
    overflow: "hidden",
  },
  inputButton: {
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#4f72fc",
  },
  inputButtonText: {
    color: "white",
    fontSize: 17,
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
  item: {
    backgroundColor: "#4f72fc",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "start",
    marginTop: 8,
    padding: 14,
  },
  topItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  itemTextCont: {
    flexDirection: "row",
    width: "70%",
  },
  itemText: {
    fontSize: 16,
    color: "white",
  },
  itemDescription: {
    color: "white",
    borderTopWidth: 1,
    borderBottomColor: "white",
    paddingTop: 8,
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 2,
  },
  editIcon: {
    fontSize: 22,
  },
  deleteIcon: {
    fontSize: 22,
  },
  arrow: {
    fontSize: 22,
  },
});
