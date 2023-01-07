<template>
  <v-app>
    <v-content >
        <!-- desktop -->
        <!-- <div class="d-none d-md-block"></div> -->
        <!-- mobile -->
        <div class="d-block">
          <v-container fluid class="jello-topbar">
            <v-row no-gutters align="center" justify="start">
              <v-col cols="1" class="flex-grow-0 flex-shrink-0">
                <v-icon @click="drawer = true">mdi-menu</v-icon>
              </v-col>
              <v-col
                cols="1"
                style="min-width: 100px; max-width:100%;"
                class="flex-grow-1 flex-shrink-0"
              >
                <v-row no-gutters align="center" justify="center">
                  <nuxt-link to="/">
                    <v-row no-gutters align="Left" justify="center">
                      <h3 class="logo">Dashboard&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    </v-row>
                  </nuxt-link>
                  <nuxt-link to="/notes">
                    <v-row no-gutters align="Left" justify="center">
                      <h3 class="logo">Notes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    </v-row>
                  </nuxt-link>
                  <nuxt-link to="/beneficiary">
            <v-row no-gutters align="left" justify="center">
              <h3 class="logo">Beneficiaries&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            </v-row>
          </nuxt-link>
          <nuxt-link to="/donor">
            <v-row no-gutters align="left" justify="center">
              <h3 class="logo">Donors&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            </v-row>
          </nuxt-link>
          <nuxt-link to="/campaignlist">
            <v-row no-gutters align="left" justify="Center">
              <h3 class="logo">Campaigns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            </v-row>
          </nuxt-link>
          <nuxt-link to="/donationlist">
            <v-row no-gutters align="left" justify="Center">
              <h3 class="logo">Donations&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            </v-row>
          </nuxt-link>
          <nuxt-link to="/notification">
            <v-row no-gutters align="left" justify="Center">
              <h3 class="logo">Notifications&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            </v-row>
          </nuxt-link>

          <nuxt-link to="/auth/signout">
            <v-row no-gutters align="left" justify="Center">
              <v-icon color="#e6d8bb">mdi-exit-to-app</v-icon>
            </v-row>
          </nuxt-link>
          
          

                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-navigation-drawer v-model="drawer" fixed left class="d-block">
              <v-container fluid class="jello-topbar">
                <v-row no-gutters align="center" justify="space-between">
                  <v-icon @click="drawer = false">mdi-close</v-icon>

                    <v-row no-gutters align="center" justify="end"> 
                        <p class="jello-user">Signed in as<br>
                        {{ $nuxt.$fire.auth.currentUser.email }}</p>
                        &nbsp;
                         <v-icon>mdi-account-circle-outline</v-icon>
                    </v-row>

                </v-row>
              </v-container>
              <v-container class="d-block menu-items">
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <br />
                    
                  </div>
                  <div class="d-flex">
                    <nuxt-link to="/">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>Notes</b>
                    </nuxt-link>
                  </div>
                    <div class="d-flex">
                      <nuxt-link to="/users">
                       <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>User</b>
                      </nuxt-link> <br>
                    </div>
                      
                    <div class="d-flex">
                      <nuxt-link to="/campaignlist">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>Campaign</b>
                      </nuxt-link><br>
                    </div>
                  <div class="d-flex">
                      <nuxt-link to="/donationlist">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>Donation</b>
                      </nuxt-link>
                  </div>

                  <div class="d-flex">
                      <nuxt-link to="/notification">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>Notifications</b>
                      </nuxt-link>
                  </div>

                  <div class="d-flex">
                    <nuxt-link to="/auth/signout">
                      <v-icon>mdi-exit-to-app</v-icon>&nbsp;&nbsp;<b>Sign out</b>
                    </nuxt-link>
                  </div>
                </div>

              
                  
              </v-container>
          </v-navigation-drawer>
        </div>
        <!-- content -->
          <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.menu-items a {
  color: $text-color;
  padding: 10px 0px 10px 3px;
  font-size: 24px;
}
</style>
