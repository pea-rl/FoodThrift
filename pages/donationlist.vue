<template>
  <v-container>
    <h2>Donation List</h2>
    <v-data-table :items="Donation" :headers="headers" class="elevation-1">
      <template v-slot:item.Title="{ item }">
        {{ item.Title}}
      </template>
      <template v-slot:item.Description="{ item }">
        {{ item.Description }}
      </template>

      <template v-slot:item.Item2Donate="{ item }">
        {{ item.Item2Donate }}
      </template>

      <template v-slot:item.Location="{ item }">
        {{ item.Location }}
      </template>
      <template v-slot:item.FoodType="{ item }">
        {{ item.FoodType }}
      </template>
      <template v-slot:item.FoodExpiry="{ item }">
        {{ item.FoodExpiry }}
      </template>
      
      <template v-slot:item.PickUPDate="{ item }">
        {{ item.PickUPDate }}
      </template>
      <template v-slot:item.TransportMethod="{ item }">
        {{ item.TransportMethod }}
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
        { text: 'Item to Donate', value: 'Item2Donate' },      
        { text: 'Food Type', value: 'FoodType' },
        { text: 'Food Expiry', value: 'FoodExpiry' },
        { text: 'Pick up Date', value: 'PickUPDate' },
        { text: 'Transport Method', value: 'TransportMethod' },
        
      ]
    }
  },
  created () {
    firebase.database().ref('Donation').on('value', snapshot => {
      this.Donation = Object.values(snapshot.val())
    })
  }
}
</script>
