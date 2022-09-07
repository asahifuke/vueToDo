Vue.createApp({
  data () {
    return {
      todos: []
    }
  },
  created: function () {
    this.$_all()
  },

  methods: {
    create () {
      this.$_createTodo()
      this.$_save()
      this.title = ''
      this.$_all()
    },

    edit (todo) {
      this.$_changeIsEditings(todo)
      this.$_save()
      this.$_all()
    },

    update (todo) {
      this.$_changeIsEditings(todo)
      this.$_save()
      this.$_all()
    },

    destroy (todo) {
      this.$_filterTodo(todo)
      this.$_save()
      this.$_all()
    },

    $_all () {
      this.todos = JSON.parse(localStorage.getItem('todos'))
    },

    $_filterTodo (todo) {
      this.todos = this.todos.filter(nowTodo => {
        return this.$_isTodoNotClicked(nowTodo, todo)
      })
    },

    $_isTodoNotClicked (nowTodo, todo) {
      return nowTodo.id !== todo.id
    },

    $_changeIsEditings (todo) {
      return this.todos.map(nowTodo => this.$_changeIsEditing(nowTodo, todo))
    },

    $_changeIsEditing (nowTodo, todo) {
      if (!this.$_isTodoNotClicked(nowTodo, todo)) {
        nowTodo.isEditing = !nowTodo.isEditing
      }
      return nowTodo
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
