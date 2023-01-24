<template>
  <v-container>
    <h2>Donation List</h2>
    <v-data-table :items="Donation" :headers="headers" class="elevation-1">
      <template v-slot:item.title="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:item.description="{ item }">
        {{ item.description }}
      </template>
      <template v-slot:item.location="{ item }">
        {{ item.location }}
      </template> 
      <template v-slot:item.pickUpDate="{ item }">
        {{ item.pickUpDate }}
      </template>
      <template v-slot:item.transportMethod="{ item }">
        {{ item.transportMethod }}
      </template>
      <template v-slot:item.deliverySchedule="{ item }">
        {{ item.deliverySchedule }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="createDeliverySchedule(item.id)">Create Delivery Schedule</v-btn>
        <v-date-picker v-if="showDatePicker && selectedId === item.id" 
                      v-model="selectedDate" 
                      @input="saveDeliverySchedule(item)"
                      :show-current="false" 
                      :no-title="true" 
                      :close-on-content-click="false"></v-date-picker>
      </template>
    </v-data-table>
     </v-container>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data () {
  return {
  Donation: [],
      headers: [
        { text: 'Title', value: 'Title' },
        { text: 'Description', value: 'Description' }, 
        { text: 'Pick up Date', value: 'PickUPDate' },
        { text: 'Transport Method', value: 'TransportMethod' },
        { text: 'Delivery Schedule', value: 'DeliverySchedule' },
        { text: '', value: 'actions' },
      ],
      showDatePicker: false,
      selectedId: null,
      selectedDate: null,
    }
  },
  created () {
    firebase.database().ref('Donation').on('value', snapshot => {
      this.Donation = Object.values(snapshot.val())
    })
  },
  methods: {
    createDeliverySchedule(id) {
      this.selectedId = id
      this.showDatePicker = true
    },
    saveDeliverySchedule(item) {
      if (this.selectedDate) {
        let date = new Date(this.selectedDate)
        let deliverySchedule = date.toISOString()
        firebase.database().ref('Donation').orderByChild('title').equalTo(item.title).once('value', snapshot => {
          if(snapshot.exists()){
            snapshot.forEach(childSnapshot => {
              if (childSnapshot.val().description === item.description && childSnapshot.val().pickUpDate === item.pickUpDate && childSnapshot.val().transportMethod === item.transportMethod) {
                firebase.database().ref(`Donation/${childSnapshot.key}`).update({ deliverySchedule: deliverySchedule })
                this.showDatePicker = false
              }
            })
          }else{
            console.log('Field not exists')
          }
        })
      }
    }
  }
}
</script>
