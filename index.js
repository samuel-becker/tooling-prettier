const uuid = () => {
  let i, random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
};

const pluralize = (count, word) => (count === 1 ? word : word + 's');

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: '1',
          title: 'Finish TodoApp'
        },
        {
          id: '2',
          title: 'Install Prettier'
        }
      ]
    };
  }

  addTodo(title) {
    const todos = this.state.todos.concat({
      id: uuid(),
      title
    });
    this.setState({ todos });
  }

  removeTodo(id) {
    const todos = this.state.todos.filter(todo => {
      if (todo.id !== id) return todo;
    });
    this.setState({ todos });
  }

  render() {
    return React.createElement(
      'div',
      {
        className: 'todoapp'
      },
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          {
            className: 'header'
          },
          React.createElement('h1', null, 'todos'),
          React.createElement(TodoInput, {
            add: this.addTodo.bind(this)
          })
        ),
        React.createElement(
          'section',
          {
            className: 'main'
          },
          React.createElement(TodoList, {
            todos: this.state.todos,
            remove: this.removeTodo.bind(this)
          })
        ),
        React.createElement(Footer, {
          todos: this.state.todos
        })
      )
    );
  }
}

const Footer = ({ todos }) => {
  if (todos.length < 1) {
    return null;
  }
  const activeTodoWord = pluralize(todos.length, 'item');
  return React.createElement(
    'footer',
    { className: 'footer' },
    React.createElement(
      'span',
      {
        className: 'todo-count'
      },
      React.createElement('strong', null, todos.length),
      ' ',
      activeTodoWord,
      ' left'
    )
  );
};

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }

    event.preventDefault();
    const val = this.refs['input'].value.trim();

    if (val) {
      this.props.add(val);
      this.refs['input'].value = '';
    }
  }

  render() {
    return React.createElement('input', {
      className: 'new-todo',
      ref: 'input',
      onKeyDown: e => {
        this.handleNewTodoKeyDown(e);
      },
      placeholder: 'What needs to be done?'
    });
  }
}

const TodoList = ({ todos, remove }) => {
  if (todos.length < 1) {
    return null;
  }
  const todoList = todos.map(todo => {
    return React.createElement(Todo, {
      todo,
      key: todo.id,
      remove: remove
    });
  });
  return React.createElement(
    'ul',
    {
      className: 'todo-list'
    },
    todoList
  );
};

const Todo = ({ todo, remove }) => {
  return React.createElement(
    'li',
    null,
    React.createElement('label', null, todo.title),
    React.createElement('button', {
      className: 'destroy',
      onClick: () => remove(todo.id)
    })
  );
};

ReactDOM.render(React.createElement(TodoApp, null), document.getElementsByClassName('todoapp')[0]);
