(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{634:function(e,t,n){"use strict";n.r(t);n(167);var o=n(90),r={data:function(){return{Donation:[],headers:[{text:"Title",value:"Title"},{text:"Description",value:"Description"},{text:"Item to Donate",value:"Item2Donate"},{text:"Food Type",value:"FoodType"},{text:"Food Expiry",value:"FoodExpiry"},{text:"Pick up Date",value:"PickUPDate"},{text:"Transport Method",value:"TransportMethod"},{text:"Delivery Schedule",value:"DeliverySchedule"},{text:"",value:"Edit"}]}},created:function(){var e=this;o.a.database().ref("Donation").on("value",(function(t){e.Donation=Object.values(t.val())}))},methods:{navigateToDelivery:function(){this.$nuxt.$router.push("/delivery")}}},v=n(56),c=n(73),l=n.n(c),d=n(487),f=n(469),m=n(627),component=Object(v.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("h2",[e._v("Donation List")]),e._v(" "),n("v-data-table",{staticClass:"elevation-1",attrs:{items:e.Donation,headers:e.headers},scopedSlots:e._u([{key:"item.Title",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.Title)+"\n    ")]}},{key:"item.Description",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.Description)+"\n    ")]}},{key:"item.Item2Donate",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.Item2Donate)+"\n    ")]}},{key:"item.Location",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.Location)+"\n    ")]}},{key:"item.FoodType",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.FoodType)+"\n    ")]}},{key:"item.FoodExpiry",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.FoodExpiry)+"\n    ")]}},{key:"item.PickUPDate",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.PickUPDate)+"\n    ")]}},{key:"item.TransportMethod",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.TransportMethod)+"\n    ")]}},{key:"item.DeliverySchedule",fn:function(t){var n=t.item;return[e._v("\n      "+e._s(n.DeliverySchedule)+"\n    ")]}},{key:"item.Edit",fn:function(t){t.item;return[n("v-btn",{attrs:{color:"primary"},on:{click:e.navigateToDelivery}},[e._v("Set Delivery")])]}}])})],1)}),[],!1,null,null,null);t.default=component.exports;l()(component,{VBtn:d.a,VContainer:f.a,VDataTable:m.a})}}]);