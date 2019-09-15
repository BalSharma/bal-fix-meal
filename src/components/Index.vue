<template>
  <div class="index container">
    <div class="card blue-grey darken-1" v-for="dish in dishes" :key="dish.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteDish(dish.id)">delete</i>
        <h2>{{dish.title}}</h2>
        <ul class="ingredient">
          <li v-for="(ing, index) in dish.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn large halfway-fab red">
        <router-link :to="{name: 'EditDish', 
          params: {dish_type: dish.dishType}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      dishes: []
    };
  },
  created() {
    // fetch data, when it takes some time to get data it
    // returns back promise.
    db.collection("dishes")
      .get()
      .then(snapshot => {
        // snapshot contains database so grab & save to dishes
        snapshot.forEach(doc => {
          // doc.id contains id & doc.data() contains data
          // console.log(doc.data(), doc.id);
          // first get each dish item, add id on that item then
          // store inot dishes [] array
          let dish = doc.data();
          dish.id = doc.id;
          this.dishes.push(dish);
        });
      })
      .catch();
  },
  methods: {
    deleteDish(id) {
      // delete doc from database. Returns promise
      db.collection("dishes")
        .doc(id)
        .delete()
        .then(() => {
          // we have deleted backend but not front end so sync
          // frontend as well
          this.dishes = this.dishes.filter(item => {
            return item.id !== id;
          });
        });
      // console.log(id);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  color: seashell;
  margin-top: 0px;
  text-align: center;
}
.index .ingredient {
  margin: 30px auto;
}
.index .ingredient li {
  /* next to each other */
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
