<template>
<div>
  <v-container>
    <h2>Delivery Status</h2>
    <v-data-table :items="Notification" :headers="headers" class="elevation-1">
      <template v-slot:item.Sender="{ item }">
        {{ item.Sender}}
      </template>
      <template v-slot:item.Description="{ item }">
        {{ item.Description }}
      </template>
      <template v-slot:item.Target="{ item }">
        {{ item.Target }}
      </template>
      <template v-slot:item.Date="{ item }">
        {{ item.Date }}
      </template>

      <template v-slot:item.Status="{ item }">
        {{ item.Status }}
  <v-btn @click="updateStatus(item)">Set Status</v-btn>
      </template>
      
     
    </v-data-table>
  </v-container>
</div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      
Notification: [],
      headers: [
        { text: 'Sender', value: 'Sender' },
        { text: 'Description', value: 'Description' },       
        { text: 'Target', value: 'Target' },
        { text: 'Date', value: 'Date' },
        { text: 'Status', value: 'Status' }
      ]
    }
  },
  created () {
    firebase.database().ref('Notification').on('value', snapshot => {
      this.Notification = Object.values(snapshot.val())
    })
  },
  methods: {
  updateStatus(Notification) {
    const ref = firebase.database().ref(`Notification/${Notification.id}`)
    Notification.status = Notification.status === 'To be Delivered' ? 'To be Picked up' : 'Delivered'
    ref.update({ status: Notification.status }, error => {
      if (error) {
        console.log(error)
      }
    })
  }
}
}
</script>
