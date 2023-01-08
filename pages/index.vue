<template>


<body>
<header>
  <div><br><br></div>
</header>
  <div id="wrapper">

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
 <v-container>       
  <v-card elevation="15">
        <div class="container-fluid container">
          <h3
            class="text-dark mb-1"
            style="
              text-align: center;
              font-family: Biryani, sans-serif;
              font-weight: bold;
              padding: 10px;
              margin: 5px;"
          >
            DASHBOARD
          </h3>
          <div class="row">
            <div
              class="col-md-6 col-xl-3 mb-4"
              style="max-width: 50%; max-height: 111px"
            >
              <div class="card shadow border-start-primary py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div
                        class="text-uppercase text-primary fw-bold text-xs mb-1"
                      >
                        <span>Total Number of Donors:</span>
                      </div>
                      <div class="text-dark fw-bold h5 mb-0">
                        <span>{{ Donor }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card shadow border-start-primary py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div
                        class="text-uppercase text-primary fw-bold text-xs mb-1"
                      >
                        <span>Total Number of beneficiaries:</span>
                      </div>
                      <div class="text-dark fw-bold h5 mb-0">
                        <span>{{ Persons }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             <div
              class="col-md-6 col-xl-3 mb-4"
              style="max-width: 50%; max-height: 111px"
            >
              <div class="card shadow border-start-info py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div class="text-uppercase text-warning fw-bold text-xs mb-1">
                        <span>Number of Donations:</span>
                      </div>
                      <div class="text-dark fw-bold h5 mb-0">
                        <span>{{ Donation }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            <div
              class="col-md-6 col-xl-3 mb-4"
              style="max-width: 50%; max-height: 111px"
            >
              <div class="card shadow border-start-info py-2">
                <div class="card-body">
                  <div class="row align-items-end no-gutters">
                    <div class="col me-2">
                      <div class="text-uppercase text-warning fw-bold text-xs mb-1">
                        <span>Number of Donation Drives:</span>
                      </div>
                      <div class="text-dark fw-bold h5 mb-0">
                        <span>{{ Campaigns }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
  </v-card>
 </v-container>
      </div><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <footer class="bg-white sticky-footer">
        <div class="container my-auto">
          <div class="text-center my-auto copyright">
            <span>Copyright © FoodThrift 2022</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</body>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      Donor: 0,
      Campaigns: 0,
      Donation: 0,
      //beneficiaries: 0
    }
  },
  created() {
    // Set up references to the four nodes
    const DonorRef = firebase.database().ref('Donor')
    const CampaignsRef = firebase.database().ref('Campaigns')
    const DonationRef = firebase.database().ref('Donation')
    const PersonsRef = firebase.database().ref('Persons')

    // Listen for changes to the data in each node
    DonorRef.on('value', snapshot => {
      this.Donor = snapshot.numChildren()
    })
    CampaignsRef.on('value', snapshot => {
      this.Campaigns = snapshot.numChildren()
    })
    DonationRef.on('value', snapshot => {
      this.Donation = snapshot.numChildren()
    })
    PersonsRef.on('value', snapshot => {
      this.Persons = snapshot.numChildren()
    })
  }
}
</script>