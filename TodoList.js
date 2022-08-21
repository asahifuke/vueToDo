Vue.createApp({
  data() {
    return {
      todos: []
    };
  },
  methods: {
    $_all() {
      const todos = [];
      for(let i = 0 ; i < localStorage.length ; i++) {
        const key = localStorage.key(i);
        const todo = JSON.parse(localStorage.getItem(key));
        todo['id'] = key;
        todos.push(todo);
      }
      this.todos = todos;
    },

    $_find(todo) {
      return JSON.parse(localStorage.getItem(todo.id));
    },

    create() {
      const todo = {
        title: this.title, 
        isEditing: false
      };
      localStorage.setItem(Date.now().toString(36) + Math.random().toString(36),  JSON.stringify(todo));
      this.$_all();
    },

    edit(todo) {
      const editingTodo = this.$_find(todo);
      editingTodo['isEditing'] = true;
      localStorage.setItem(todo.id, JSON.stringify(editingTodo));
      this.$_all();
    },

    update(todo) {
      const editingTodo = this.$_find(todo);
      editingTodo['isEditing'] = false;
      editingTodo['title'] = todo.title;
      localStorage.setItem(todo.id, JSON.stringify(editingTodo));
      this.$_all();
    },

    destroy(todo) {
      localStorage.removeItem(todo.id);
      this.$_all();
    },
  
    isEditing(todo) {
      return todo.isEditing;
    },
  }
}).mount('#app');
