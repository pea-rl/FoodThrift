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
           </v-card>
        </v-modal>
      </v-col>
      <v-col cols="6" style="height: 400px">
        <v-text-field v-model="search" label="Search"></v-text-field>
        <v-data-table :items="filteredPersons" :headers="headers" class="elevation-1" >
          <template v-slot:item.Email="{ item }">
            {{ item.Email}}
          </template>   

                <template v-slot:item.Status="{ item }">
        {{ item.Status}}
      </template>
      <template v-slot:item.Actions="{ item }">
      <v-select :items="actions" v-model="selectedAction" @change="updateStatus(item.Email, selectedAction)"></v-select>
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
        { text: 'Set status', value: 'Actions' },
        { text: '', value: 'Edit' },
      ],
      actions: ['Active', 'Inactive'],
      selectedAction: '',
      modal:false,
      selectedPerson: {},
      search: ''
    }
  },
    computed: {
      filteredPersons() {
      return this.Persons.filter(Persons => {
        return Persons.Email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
    },

    created () {
    firebase.database().ref('Persons').on('value', snapshot => {
      this.Persons = Object.values(snapshot.val())
    })
  },

      methods: {
    openModal (item) {
      this.selectedPerson = item
      this.modal = true
    },
    updateStatus(email, newStatus) {
      if(!this.actions.includes(newStatus)){
        return;
      }
      const statusRef = firebase.database().ref(`Persons`);
       firebase.database().ref('Persons').orderByChild('Email').equalTo(email).once("value", function(snapshot) {
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
  },


  
}
</script>
