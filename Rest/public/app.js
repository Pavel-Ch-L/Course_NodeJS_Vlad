new Vue({
  el: '#app',
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: []
    }
  },
  created() {
    fetch('/api/todo', {
      method: 'get'
    }).then(res => res.json()).then(todos => this.todos = todos)
      .catch(err => console.log(err))
  },
  methods: {

    addTodo() {
      const title = this.todoTitle.trim()
      if (!title) {
        return
      }
      fetch('/api/todo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      })
        .then(res => res.json())
        .then(({todo}) => {
          this.todos.push(todo)
          this.todoTitle = ''
        })
        .catch(err => console.log(err))
      this.todoTitle = ''
    },

    removeTodo(id) {
      fetch('/api/todo/' + id, {
        method: 'delete'
      }).then(this.todos = this.todos.filter(t => t.id !== id))
        .catch(err => console.log(err))
      
    },

    completeTodo(id) {
      fetch('/api/todo/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({done: true})
      })
        .then(res => res.json())
        .then(({todo}) => {
          const idx = this.todos.findIndex(c => c.id === todo.id)
          this.todos[idx].updatedAt = todo.updatedAt
        })
        .catch(err => console.log(err))
    }
  },
  filters: {

    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    
    date(value, withTime) {
      const option = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }
      if (withTime) {
        option.hour = '2-digit'
        option.minute = '2-digit'
        option.second = '2-digit'
      }
      return new Intl.DateTimeFormat('ru-RU', option).format(new Date(value))
    }
  }
})