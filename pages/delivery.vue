<template>
  <v-container>
    <h2>Donation List</h2>
    <v-data-table :items="Donation" :headers="headers" class="elevation-1">
      <template v-slot:item.ID="{ item }">
        {{ item.ID }}
      </template>
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
      <template v-slot:item.DeliverySchedule="{ item }">
        {{ item.DeliverySchedule }}
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
        { text: 'ID', value: 'ID' },
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
    createDeliverySchedule(ID) {
      this.selectedId = ID
      this.showDatePicker = true
    },

    saveDeliverySchedule(item) {
    if (this.selectedDate) {
    let date = new Date(this.selectedDate)
    let DeliverySchedule = date.toLocaleDateString()
    firebase.database().ref('Donation').once('value', snapshot => {
      let match = false
      snapshot.forEach(childSnapshot => {
        let donation = childSnapshot.val()
        if (donation.ID === item.ID &&
            donation.title === item.title && 
            donation.description === item.description && 
            donation.pickUpDate === item.pickUpDate && 
            donation.transportMethod === item.transportMethod) {
          firebase.database().ref(`Donation/${childSnapshot.key}`).update({ DeliverySchedule: DeliverySchedule })
          match = true
        }
      })
      if (match) {
        this.showDatePicker = false
      } else {
        console.log('Donation not found')
      }
    })
  }
}

  }
}
</script>
