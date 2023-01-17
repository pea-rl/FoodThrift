<template>
  <v-container>
    <h2>Campaigns List</h2>
    <v-data-table :items="Campaigns" :headers="headers" :sort-by="sortBy" :sort-desc.sync="sortDesc" class="elevation-1">
      <template v-slot:item.ReqTitle="{ item }">
        {{ item.ReqTitle}}
      </template>
      <template v-slot:item.Description="{ item }">
        {{ item.Description }}
      </template>
      <template v-slot:item.BenefName="{ item }">
        {{ item.BenefName }}
      </template>
      <template v-slot:item.BenefAdd="{ item }">
        {{ item.BenefAdd }}
      </template>
      <template v-slot:item.ItemNeeded="{ item }">
        {{ item.ItemNeeded }}
      </template>
      <template v-slot:item.DateNeeded="{ item }">
        {{ item.DateNeeded }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      sortBy: 'ID',
      sortDesc: true,
      Campaigns: [],
      headers: [
        { text: 'ID', value: 'ID' },
        { text: 'Title', value: 'ReqTitle' },
        { text: 'Description', value: 'Description' },       
        { text: 'Target', value: 'BenefName' },
        { text: 'Items Needed', value: 'ItemNeeded' },
        { text: 'BenefAdd', value: 'BenefAdd' },
        { text: 'Date Needed', value: 'DateNeeded' },
        
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
