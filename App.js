import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Heading from "./app/Heading";
import Input from "./app/Input";
import Button from "./app/Button";
import TodoList from "./app/TodoList";

let todoIndex = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      todos: [],
      type: "All"
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  inputChange(inputValue) {
    this.setState({ inputValue });
  }
  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }
    const todo = {
      title: this.state.inputValue,
      todoIndex,
      complete: false
    };
    todoIndex++;
    const todos = [...this.state.todos, todo];
    this.setState({ todos, inputValue: "" });
  }
  deleteTodo(todoindex) {
    let { todos } = this.state;
    todos = todos.filter(todo => todo.todoIndex !== todoindex);
    this.setState = { todos };
  }
  toggleComplete(todoindex) {
    let todos = this.state.todos;
    todos.forEach(todo => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
  }
  render() {
    const { inputValue, todos } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.contnet}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={text => this.inputChange(text)}
          />
          <TodoList
            todos={todos}
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}
          />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});
export default App;
