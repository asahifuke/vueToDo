Vue.createApp({
  data () {
    return {
      todos: []
    }
  },
  created () {
    if (!this.$_getTodos()) {
      localStorage.setItem('todos', JSON.stringify([]))
    }
    this.$_getTodos()
  },

  methods: {
    create () {
      this.$_createTodo()
      this.$_save()
      this.title = ''
    },

    edit (todo) {
      this.$_changeIsEditing(todo)
      this.$_save()
    },

    update (todo) {
      this.$_changeIsEditing(todo)
      this.$_save()
    },

    destroy (todo) {
      this.$_filterTodo(todo)
      this.$_save()
    },

    $_getTodos () {
      this.todos = JSON.parse(localStorage.getItem('todos'))
      return this.todos
    },

    $_filterTodo (todo) {
      this.todos = this.todos.filter(nowTodo => {
        return this.$_isTodoNotClicked(nowTodo, todo)
      })
    },

    $_isTodoNotClicked (nowTodo, todo) {
      return nowTodo.id !== todo.id
    },

    $_changeIsEditing (todo) {
      const index = this.todos.findIndex(nowTodo => nowTodo === todo)
      this.todos[index].isEditing = !todo.isEditing
    },

    $_save () {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },

    $_createTodo () {
      this.todos.push({
        id: Date.now().toString(36) + Math.random().toString(36),
        title: this.title,
        isEditing: false
      })
    }
  }
}).mount('#app')
