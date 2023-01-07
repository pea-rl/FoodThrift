<template>
  <v-container>
    <h2>Donors List</h2>
    <v-row>
      <v-col cols="6">
        <v-modal v-model="modal" centered>
          <v-card class="text-left">
            <v-card-title > <B>First Name: &nbsp;</B>{{ selectedDonors.Fname }} </v-card-title> 
            <v-card-title > <B>Last Name: &nbsp;</B>{{ selectedDonors.Lname }} </v-card-title> 
            <v-card-title > <B>Email: &nbsp;</B>{{ selectedDonors.Email }} </v-card-title> 
            <v-card-title > <B>Address: &nbsp;</B>{{ selectedDonors.Address }} </v-card-title> 
           <!-- <v-card-title > <B>Address: &nbsp;</B>{{ selectedDonors.Address }} </v-card-title> //Wala sa db -->
           <v-card-title > <B>Account Type: &nbsp;</B>{{ selectedDonors.AccType }} </v-card-title> 
           <v-card-title > <B>Business Name: &nbsp;</B>{{ selectedDonors.BusinessName }} </v-card-title> 
           <v-card-title > <B>Business Contact Number: &nbsp;</B>{{ selectedDonors.BusinessContact }} </v-card-title>           
           <v-card-title > <B>Business TIN: &nbsp;</B>{{ selectedDonors.BusinessTIN }} </v-card-title> 
           <!--<v-card-title > <B>Subscription: &nbsp;</B>{{ selectedDonors.Subscription }}</v-card-title>-->
           <!--<v-card-title > <B>Account Type: &nbsp;</B>{{ selectedDonors.AccType }} </v-card-title> 
           <v-card-title > <B>Account Type: &nbsp;</B>{{ selectedDonors.AccType }} </v-card-title> //Extra-->
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deleteDonors(selectedDonors.Email)">Delete</v-btn>
          </v-card-actions>
        </v-modal>
      </v-col>
      <v-col cols="6" style="height: 400px">
        <v-data-table :items="Donors" :headers="headers" class="elevation-1" >
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
      Donors: [],
      headers: [
        { text: 'Email', value: 'Email' },
       // { text: 'Password', value: 'Password' },
        { text: '', value: 'Edit' },
      ],
      modal: false,
      selectedDonors: {}
    }
  },
  created () {
    firebase.database().ref('Donors').on('value', snapshot => {
      this.Donors = Object.values(snapshot.val())
    })
  },
  methods: {
    openModal (item) {
      this.selectedDonors = item
      this.modal = true
    },
    deleteDonors (id) {
    firebase.database().ref(`Donors/${id}`).remove()
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

