import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function TodoForm({
  todos,
  setTodos,
  editId,
  setEditId,
  title,
  setTitle,
  description,
  setDescription,
}) {
  const titleRef = useRef(null);
  const descRef = useRef(null);

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

  return (
    <View style={styles.inputContainer}>
      <TextInput
        ref={titleRef}
        style={styles.input}
        placeholder="Enter Title"
        onChangeText={(text) => onChangeText("title", text)}
        value={title}
      ></TextInput>
      <TextInput
        ref={descRef}
        multiline
        numberOfLines={5}
        onChangeText={(text) => onChangeText("description", text)}
        style={styles.input}
        placeholder="Enter Description"
        value={description}
      ></TextInput>
      <View style={styles.inputButtonCont}>
        <Pressable
          style={styles.inputButton}
          android_ripple={{ color: "#859dfc" }}
          onPress={saveTodo}
        >
          <Text style={styles.inputButtonText}>
            {editId ? "Update Todo" : "Add Todo"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
