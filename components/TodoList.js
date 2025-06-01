import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function TodoList({ todos, setTodos, setAddDialogId }) {
  const [descriptionShowId, setDescriptionShowId] = useState(null);

  const completeTodo = (isChecked, id) => {
    const newData = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: isChecked }; // return a new object with the updated value
      }
      return todo; // return the original object if no update is needed
    });

    setTodos(newData); // update the state
  };

  const onDelete = (id) => {
    console.log(id);
    const newTodo = todos.filter((t) => t.id != id);
    console.log(newTodo);

    setTodos([...newTodo]);
  };

  return (
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
                  onPress={() => setAddDialogId(item.id)}
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
              {item.description ? item.description : "No Description available"}
            </Text>
          )}
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
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
