import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";

export default function TodoForm({
  todos,
  setTodos,
  addDialogId,
  setAddDialogId,
}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    if (addDialogId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === addDialogId
          ? { ...todo, title: title, description: description }
          : todo
      );
      setTodos(updatedTodos);
      setAddDialogId(null);
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

    // 👇 Blur the inputs to remove keyboard
    titleRef.current?.blur();
    descRef.current?.blur();
    console.log(todos);
    setAddDialogId(null);
  };

  useEffect(
    () => {
      if (addDialogId) {
        console.log('edit');
        const todo = todos.find((t) => t.id == addDialogId);
        if (!todo) {
          return;
        }
        setTitle(todo.title)
        setDescription(todo.description)
      } else {
        console.log('add');
        setTitle("");
        setDescription("");
      }
    }, []
  )
  return (
    <SafeAreaView style={styles.formContainer}>
      <View style={styles.topHead}>
        <Pressable style={[styles.topSide, styles.topLeft]} onPress={() => setAddDialogId(null)}>
          <Text style={styles.crossIcon}>X</Text>
        </Pressable>
        <Text style={styles.middleText}>{addDialogId == 0 ? "Add Todo" : "Update Todo"}</Text>
        <View style={[styles.topSide, styles.right]}>
          <Pressable style={styles.topButton} onPress={saveTodo}>
            <Text style={styles.topButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputCont}>
          <Text style={styles.placeholder}>Title*</Text>
          <TextInput
            ref={titleRef}
            style={styles.input}
            placeholder="Enter Title"
            onChangeText={(text) => onChangeText("title", text)}
            value={title}
          ></TextInput>
        </View>
        <View style={styles.inputCont}>
          <Text style={styles.placeholder}>Description*</Text>
          <TextInput
            ref={descRef}
            multiline
            numberOfLines={4}
            onChangeText={(text) => onChangeText("description", text)}
            style={[styles.input, styles.descInput]}
            placeholder="Enter Description"
            value={description}
          ></TextInput>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  topHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    alignItems: "center"
  },
  topSide: {
    width: 70,
  },
  topLeft: {
    width: 30
  },
  crossIcon: {
    fontSize: 18,
  },
  middleText: {
    fontSize: 24,
  },
  topButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#4f72fc",
    alignSelf: "flex-end",
  },
  topButtonText: {
    color: "white"
  },
  inputContainer: {
    marginTop: 24,
    gap: 8,
    paddingHorizontal: 16
  },
  inputCont: {
    marginVertical: 8
  },
  placeholder: {
    fontSize: 20,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#dddee1",
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 20,
    borderRadius: 12,
    backgroundColor: "white",
  },
  descInput: {
    height: 140,
    verticalAlign: "top"
  }
});
