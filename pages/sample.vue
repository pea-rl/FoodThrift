<template>
  <div>
    <form @submit.prevent="createItem">
      <label>
        Name:
        <input type="text" v-model="Name" />
      </label>
      <button type="submit">Create</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.Name }}
        <button @click="updateItem(item.id, item.Name)">Update</button>
        <button @click="deleteItem(item.Name)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  data() {
    return {
      
      items: [],
      Name: ''
    };
  },
  created() {
    // Get a reference to the Firebase Realtime Database
    const db = firebase.database()

    // Get a reference to the items node
    const itemsRef = db.ref('items')

    // Fetch the list of items from the database
    itemsRef.on('value', snapshot => {
  this.items = snapshot.val()
})
  },
  methods: {
    createItem() {
      // Get a reference to the Firebase Realtime Database
      const db = firebase.database()

      // Get a reference to the items node
      const itemsRef = db.ref('items')

      // Add a new item to the database
      itemsRef.push({
        name: this.name
      })

      // Clear the name field
      this.name = ''
    },
    updateItem(itemId, name) {
      // Get a reference to the item
      const itemRef = firebase.database().ref('items/' + itemId)
      // Update the item in the database
      itemRef.set({
        name: name
      });
    },
    deleteItem(itemName) {
      // Get a reference to the item
      const itemRef = firebase.database().ref('items/' + itemName)
      // Delete the item from the database
      itemRef.remove().then(function() {
        console.log('Item was deleted')
      });
    }
  }
};
</script>
