<template>
  <div class="home container">
    <button v-if="!addNew" @click="toggleAddNew" type="submit" class="btn btn-primary">Add New Message</button><br><hr>
    <div v-if="getError" class="alert alert-dismissible alert-danger">
      <button type="button" @click="toggleAddNew" class="close" data-dismiss="alert">&times;</button>
      <strong>Oh snap!</strong> <a href="#" class="alert-link">{{alertMessage}}</a>
  </div>
    <form v-if="addNew">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" value="Anonymous" >
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control" id="subject" placeholder="Enter a subject" required>
      </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
    </div>
    <div class="form-group">
        <label for="Image URL">Image URL</label>
        <input v-model="message.imageURL" type="text" class="form-control" id="imageURL" placeholder="Enter a image url">
    </div>
    <button @click="addMessage" type="submit" class="btn btn-primary">Add</button>
  </form>
  <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <div class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject" width="80px" height="auto">
        <div class="media-body">
          <h5 class="mt-0 mb-1">{{ message.username }}</h5>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
            {{ message.message }}
          <br>
          <small>{{ message.created }}</small>
          <br>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
const apiURL = 'http://localhost:5000/messages'

export default {
  name: 'Home',
  data: () => ({
    messages: [],
    addNew: false,
    getError: false,
    alertMessage: '',
    message: {
      username: '',
      subject: '',
      message: '',
      imageURL: ''
    }
  }),
  mounted () {
    fetch(apiURL).then(response => response.json()).then(result => {
      console.log(result)
      this.messages = result
    })
  },
  computed: {
    reversedMessages () {
      return this.messages.slice().reverse()
    }
  },
  methods: {
    addMessage () {
      console.log(this.message)
      fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json()).then(result => {
        console.log(result)
        if (result.details) {
          this.alertMessage = result.details.map(detail => detail.message).join('. ')
          this.getError = true
        } else {
          this.messages.push(result)
        }
      })
      this.toggleAddNew()
    },
    toggleAddNew () {
      this.addNew = !this.addNew
      this.getError = false
      this.alertMessage = ''
      this.message = {
        username: '',
        subject: '',
        message: '',
        imageURL: ''
      }
    }
  }
}
</script>

<style scoped>
hr {
  border-top-color: aliceblue;
}
</style>
