<template>
  <v-container>
    <h2>Donors List</h2>
    <v-row>
      <v-col cols="6">
        <v-modal v-model="modal" centered>
          <v-card class="text-left">
            <v-card-title > <B>First Name: &nbsp;</B>{{ selectedDonor.Fname }} </v-card-title> 
            <v-card-title > <B>Last Name: &nbsp;</B>{{ selectedDonor.Lname }} </v-card-title> 
            <v-card-title > <B>Email: &nbsp;</B>{{ selectedDonor.Email }} </v-card-title> 
            <v-card-title > <B>Address: &nbsp;</B>{{ selectedDonor.Address }} </v-card-title> 
           <v-card-title > <B>Account Type: &nbsp;</B>{{ selectedDonor.AccType }} </v-card-title> 
           <v-card-title > <B>Business Name: &nbsp;</B>{{ selectedDonor.BusinessName }} </v-card-title> 
           <v-card-title > <B>Business Contact Number: &nbsp;</B>{{ selectedDonor.BusinessContact }} </v-card-title>           
           <v-card-title > <B>Business TIN: &nbsp;</B>{{ selectedDonor.BusinessTIN }} </v-card-title> 
           <v-card-title > Status: &nbsp;{{ selectedDonor.Status }}
           <v-btn @click="updateStatus">Set Status</v-btn> </v-card-title>
           <!--<v-card-title > <B>Subscription: &nbsp;</B>{{ selectedDonor.Subscription }}</v-card-title>-->
           <!--<v-card-title > <B>Account Type: &nbsp;</B>{{ selectedDonor.AccType }} </v-card-title> 
           <v-card-title > <B>Account Type: &nbsp;</B>{{ selectedDonor.AccType }} </v-card-title> //Extra-->
          </v-card>
          
        </v-modal><!---End of modal-->
      </v-col>
      <v-col cols="6" style="height: 400px">
        <v-text-field v-model="search" label="Search"></v-text-field><!--Search bar-->
        <v-data-table :items="filteredDonor" :headers="headers" class="elevation-1" >
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
      Donor: [],
      headers: [
        { text: 'Email', value: 'Email' },
       // { text: 'Password', value: 'Password' },
        { text: '', value: 'Edit' },
      ],
      modal: false,
      selectedDonor: {},
      search:''

    }
  },
  computed: {
    filteredDonor() {
      return this.Donor.filter(Donor => {
        return Donor.Email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created () {
    firebase.database().ref('Donor').on('value', snapshot => {
      this.Donor = Object.values(snapshot.val())
    })
  },
  methods: {
    openModal (item) {
      this.selectedDonor = item
      this.modal = true
    },
    updateStatus() {
if(this.selectedDonor.Status === 'Active') {
this.selectedDonor.Status = 'Inactive'
} else {
this.selectedDonor.Status = 'Active'
}
firebase.database().ref('Donor/' + this.selectedDonor.id).update({
Status: this.selectedDonor.Status
})
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

