Vue.createApp({
  data () {
    return {
      todos: []
    }
  },

  created () {
    if (this.$_getTodos()) {
      this.todos = this.$_getTodos()
    }
  },

  methods: {
    create () {
      this.todos.push({
        id: Date.now().toString(36) + Math.random().toString(36),
        title: this.title,
        isEditing: false
      })
      this.$_save()
      this.title = ''
    },

    toggleUpdateButton (todo) {
      this.$_changeIsEditing(todo)
      this.$_save()
    },

    destroy (todo) {
      this.$_filterTodo(todo)
      this.$_save()
    },

    $_getTodos () {
      return JSON.parse(localStorage.getItem('todos'))
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
      todo.isEditing = !todo.isEditing
    },

    $_save () {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
}).mount('#app')
