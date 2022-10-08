<template>
  <div v-if="currentBook" class="edit-form">
    <h4>Book</h4>
    <form action="">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentBook.title"/>
      </div>
      <div class="form-group">
        <label for="description">
          Description
        </label>
        <input type="text" class="form-control" id="description" v-model="currentBook.description"/>
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentBook.available ? "Available" : "Pending" }}
      </div>
    </form>
    <button
        class="btn btn-primary"
        v-if="currentBook.available"
        @click="updateAvailable(false)"
    >UnAvailable
    </button>
    <button
        v-else
        class="btn btn-primary"
        @click="updateAvailable(true)"
    >Available
    </button>
    <button
        class="btn btn-danger"
        @click="deleteBook"
    >Delete
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br>
    <p>Loading...</p>
  </div>
</template>


<script>
import BookService from "../../service/BookService";

export default {
  name: "book-item",
  data() {
    return {
      currentBook: null,
      message: ''
    }
  },
  mounted() {
    this.message=''
    this.getBook(this.$route.params.id)
  },
  methods: {
    getBook(id) {
      BookService.get(id)
          .then(response => {
            this.currentBook = response.data
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
          })
    },
    updateAvailable(status) {
      let data = {
        id: this.currentBook.id,
        title: this.currentBook.title,
        description: this.currentBook.description,
        available: status
      }
      BookService.update(this.currentBook.id, data)
          .then(response => {
            this.currentBook.available = status
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
          })
    },
    updateBook() {
      BookService.update(this.currentBook.id, this.currentBook)
          .then(response=>{
            console.log(response.data)
            this.message='The book was update success'
          })
          .catch(e=>{
            console.log(e)
          })
    },
    deleteBook(){
      BookService.delete(this.currentBook.id)
          .then(response=>{
            console.log(response.data)
            this.$router.push({name: 'books'})
          })
          .catch(e=>{
            console.log(e)
          })
    }
  }
}
</script>


<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;

}
.btn {
  margin-left: 10px;
}
</style>