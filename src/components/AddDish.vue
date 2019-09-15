<template>
  <div class="add-dish container">
    <h2 class="center-align indigo-text">Add New Meal</h2>
    <form @submit.prevent="AddDish">
      <div class="field title">
        <label for="title">Meal Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredients</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <!-- <button class="red white-text">Add Dish</button> -->
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="waves-effect red btn">
          <i class="material-icons left">add_to_photos</i>
          Add New Meal
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
import sulgify from "slugify";
import slugify from "slugify";
export default {
  name: "AddDish",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddDish() {
      // first check title is not null or empty
      if (this.title) {
        this.feedback = null;
        // we need slug also. slugify takes 2 parameter, 1st is what
        // needs to be slugify, 2nd is object. object contains different
        // option how we want to slugify.
        this.slug = slugify(this.title, {
          // any space changes to hyphen '-'
          // remove is regex, all chars inside regex we want to remove
          // globally. That can be title of dish that is fine but not
          // in the url slug. lower to true makes all lowecase
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        // talk to db, add function takes object & return promise
        // Object is record or document we want add to add

        db.collection("dishes")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            dishType: this.slug
          })
          .then(() => {
            // it takes sometime to complete once done redirect
            // home page index. This is how we redirect
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log("Loading data failed.");
          });
      } else {
        this.feedback = "Must enter dish title!";
      }

      // console.log(` after Dish: ${this.title}
      // Ingredients: ${this.ingredients}
      // DishType: ${this.slug}`);
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Must enter ingredients!";
      }
    },
    deleteIng(ingre) {
      this.ingredients = this.ingredients.filter(item => {
        return ingre !== item;
      });
    }
  }
};
</script>
<style>
.add-dish {
  margin-top: 60px;
  padding: 20px;
  max-width: 450px;
}
.add-dish h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-dish .field {
  margin: 20px auto;
  position: relative;
}

.add-dish .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.2em;
  cursor: pointer;
}
</style>