<template>
  <v-container>
    <h2>Beneficiaries List</h2>
    <v-row>
      <v-col cols="6">
        <v-modal v-model="modal" centered>
          <v-card class="text-left">
            <v-card-title > First Name: &nbsp;{{ selectedPerson.Fname }} </v-card-title> 
            <v-card-title > Last Name: &nbsp;{{ selectedPerson.Lname }} </v-card-title> 
            <v-card-title > Email: &nbsp;{{ selectedPerson.Email }} </v-card-title> 
            <v-card-title > Address: &nbsp;{{ selectedPerson.Address }} </v-card-title> 
            <v-card-title > Account Type: &nbsp;{{ selectedPerson.AccType }} </v-card-title> 
            <v-card-title > Business Name: &nbsp;{{ selectedPerson.BusinessName }} </v-card-title> 
            <v-card-title > Business Contact Number: &nbsp;{{ selectedPerson.BusinessContact }} </v-card-title>           
            <v-card-title > Business TIN: &nbsp;{{ selectedPerson.BusinessTIN }} </v-card-title>
            <v-card-title > User Account: &nbsp;{{ selectedPerson.UserAcc }} </v-card-title>  
            <v-card-title > Status: &nbsp;{{ selectedPerson.Status }}
            <v-btn @click="updateStatus">Set Status</v-btn> </v-card-title> 
           </v-card>
           <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deletePerson">Delete</v-btn>
           </v-card-actions>
        </v-modal>
      </v-col>
      <v-col cols="6" style="height: 400px">
        <v-text-field v-model="search" label="Search"></v-text-field>
        <v-data-table :items="filteredPersons" :headers="headers" class="elevation-1" >
          <template v-slot:item.Email="{ item }">
            {{ item.Email}}
          </template>   
          <template v-slot:item.Edit="{ item }">
            <v-btn @click="openModal(item)">See More</v-btn>
          </template> 
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      Persons: [],
      headers: [
        { text: 'Email', value: 'Email' },
        { text: 'Status', value: 'Status' },
        { text: '', value: 'Edit' },
      ],
      modal: false,
      selectedPerson: {},
      search:''
    }
  },
  computed: {
filteredPersons() {
return this.persons.filter(person => {
return person.Email.toLowerCase().includes(this.search.toLowerCase())
})
}
},
created () {
firebase.database().ref('Persons').on('value', snapshot => {
this.persons = Object.values(snapshot.val())
})
},
methods: {
openModal (item) {
this.selectedPerson = item
this.modal = true
},
async deletePerson() {
const db = firebase.database()
await db.ref('Persons/${this.selectedPerson.id}').remove()
this.modal = false
},
updateStatus() {
  if(this.selectedPerson.Status === 'Active') {
    this.selectedPerson.Status = 'Inactive'
  } else {
    this.selectedPerson.Status = 'Active'
  }
  firebase.database().ref('Persons/' + this.selectedPerson.id).update({
    Status: this.selectedPerson.Status
  })
},


}
}
</script>
