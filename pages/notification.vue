<template>
  <div>
    <v-container>
      <h2>Delivery Status</h2>
      <v-data-table :items="Notification" :headers="headers" :sort-by="sortBy" :sort-desc.sync="sortDesc" class="elevation-1">
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
        </template>
        <template v-slot:item.Actions="{ item }">
          <v-select :items="actions" v-model="selectedAction" @change="updateStatus(item.Date, selectedAction)"></v-select>
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
      sortBy: 'Date',
      sortDesc: true,
      Notification: [],
      headers: [
        { text: 'Sender', value: 'Sender' },
        { text: 'Description', value: 'Description' },       
        { text: 'Target', value: 'Target' },
        { text: 'Date', value: 'Date' },
        { text: 'Status', value: 'Status' },
        { text: 'Actions', value: 'Actions' }
      ],
      actions: ['For Pick-up', 'For Delivery', 'Picked Up', 'Delivered'],
      selectedAction: ''
    }
  },
  created () {
    firebase.database().ref('Notification').on('value', snapshot => {
      this.Notification = Object.values(snapshot.val())
    })
  },
  methods: {
    updateStatus(date, newStatus) {
      if(!this.actions.includes(newStatus)){
        return;
      }
      const statusRef = firebase.database().ref(`Notification`);
       firebase.database().ref('Notification').orderByChild('Date').equalTo(date).once("value", function(snapshot) {
                snapshot.forEach(function(data) {
                  const key = data.key;
                  statusRef.child(key).update({
                    Status: newStatus
                  })
                  .then(() => {
                      console.log("status updated")
                  })
                  .catch((error) => {
                      console.log(error)
                  })
                });
            });
    }
  }
}
</script>
