<template>
  <div>
    <v-container>
      <h2>Delivery Status</h2>
      <v-data-table :items="Notification" :headers="headers" :sort-by="sortBy" :sort-desc.sync="sortDesc" class="elevation-1">
         <!--<template v-slot:item.ID="{ item  }">
          {{ item.ID}}
        </template>-->
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
        <template v-slot:item.TobeDelivered="{ item }">
        <v-btn @click="updateStatus(item.Date, 'To be Delivered')">Update Status</v-btn>

        </template>
        <template v-slot:item.Delivered="{ item }">
        <v-btn @click="updateStatus(item.Date, 'Delivered')">Update Status</v-btn>
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
        //{ text: 'ID', value: 'ID' },
        { text: 'Sender', value: 'Sender' },
        { text: 'Description', value: 'Description' },       
        { text: 'Target', value: 'Target' },
        { text: 'Date', value: 'Date' },
        { text: 'Status', value: 'Status' },
        { text: 'Set as delivered', value: 'Delivered' },
        { text: 'Set as to be delivered', value: 'TobeDelivered' }
      ]
    }
  },
  created () {
    firebase.database().ref('Notification').on('value', snapshot => {
      this.Notification = Object.values(snapshot.val())
    })
  },
  methods: {
    updateStatus(date, newStatus) {
      if(newStatus !== 'Delivered' && newStatus !== 'To be Delivered'){
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
