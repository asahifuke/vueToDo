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
      todo.isEditing = !todo.isEditing
      this.$_save()
    },

    destroy (todo) {
      this.todos = this.todos.filter(nowTodo => {
        return nowTodo.id !== todo.id
      })
      this.$_save()
    },

    $_getTodos () {
      return JSON.parse(localStorage.getItem('todos'))
    },

    $_save () {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
}).mount('#app')
