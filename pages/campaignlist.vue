<template>
  <v-container>
    <h2>Campaigns List</h2>
    <v-data-table :items="Campaigns" :headers="headers" class="elevation-1">
      <template v-slot:item.Title="{ item }">
        {{ item.Title}}
      </template>
      <template v-slot:item.Description="{ item }">
        {{ item.Description }}
      </template>
      <template v-slot:item.Target="{ item }">
        {{ item.Target }}
      </template>
      <template v-slot:item.Location="{ item }">
        {{ item.Location }}
      </template>
      <template v-slot:item.DriveStart="{ item }">
        {{ item.DriveStart }}
      </template>
      
      <template v-slot:item.DriveEnd="{ item }">
        {{ item.DriveEnd }}
      </template>
      <template v-slot:item.DatePosted="{ item }">
        {{ item.DatePosted}}
      </template>


    </v-data-table>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      
Campaigns: [],
      headers: [
        { text: 'Title', value: 'Title' },
        { text: 'Description', value: 'Description' },       
        { text: 'Target', value: 'Target' },
        { text: 'Location', value: 'Location' },
        { text: 'DriveStart', value: 'DriveStart' },
        { text: 'DriveEnd', value: 'DriveEnd' },
        { text: 'DatePosted', value: 'DatePosted' },
        
      ]
    }
  },
  created () {
    firebase.database().ref('Campaigns').on('value', snapshot => {
      this.Campaigns = Object.values(snapshot.val())
    })
  }
}
</script>
