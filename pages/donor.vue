<template>
  <v-container>
    <h2>Donors List</h2>
    <v-row>
      <v-col cols="6">
        <v-modal v-model="modal" centered>
          <v-card class="text-left">
            <v-card-title > <B>First Name: &nbsp;</B>{{ selectedPerson.Fname }} </v-card-title> 
            <v-card-title > <B>Last Name: &nbsp;</B>{{ selectedPerson.Lname }} </v-card-title> 
            <v-card-title > <B>Email: &nbsp;</B>{{ selectedPerson.Email }} </v-card-title> 
            <v-card-title > <B>Address: &nbsp;</B>{{ selectedPerson.Address }} </v-card-title> 
           <!-- <v-card-title > <B>Address: &nbsp;</B>{{ selectedPerson.Address }} </v-card-title> //Wala sa db -->
           <v-card-title > <B>Account Type: &nbsp;</B>{{ selectedPerson.AccType }} </v-card-title> 
           <v-card-title > <B>Business Name: &nbsp;</B>{{ selectedPerson.BusinessName }} </v-card-title> 
           <v-card-title > <B>Business Contact Number: &nbsp;</B>{{ selectedPerson.BusinessContact }} </v-card-title>           
           <v-card-title > <B>Business TIN: &nbsp;</B>{{ selectedPerson.BusinessTIN }} </v-card-title> 
           <!--<v-card-title > <B>Subscription: &nbsp;</B>{{ selectedPerson.Subscription }}</v-card-title>-->
           <!--<v-card-title > <B>Account Type: &nbsp;</B>{{ selectedPerson.AccType }} </v-card-title> 
           <v-card-title > <B>Account Type: &nbsp;</B>{{ selectedPerson.AccType }} </v-card-title> //Extra-->
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deletePerson(selectedPerson.Email)">Delete</v-btn>
          </v-card-actions>
        </v-modal>
      </v-col>
      <v-col cols="6" style="height: 400px">
        <v-data-table :items="Persons" :headers="headers" class="elevation-1" >
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
       // { text: 'Password', value: 'Password' },
        { text: '', value: 'Edit' },
      ],
      modal: false,
      selectedPerson: {}
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
    deletePerson (id) {
    firebase.database().ref(`Persons/${id}`).remove()
}
  }
}
</script>
<style>
  /* make the v-container overflow-y scrollable */
  .v-container1 {
    overflow-y: scroll;
  }
</style>

