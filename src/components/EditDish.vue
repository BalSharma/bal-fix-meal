<template>
  <div v-if="dish" class="edit-dish container">
    <h2>Editing Meal {{dish.title}}</h2>
    <form @submit.prevent="editDish">
      <div class="field title">
        <label for="title">Dish Title</label>
        <input type="text" name="title" v-model="dish.title" />
      </div>
      <div v-for="(ing, index) in dish.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients:</label>
        <input type="text" name="ingredient" v-model="dish.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Update Ingredients</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="updateIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <!-- <button class="red white-text">Add Dish</button> -->
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="waves-effect red btn">
          <i class="material-icons left">add_to_photos</i>
          Update Meal
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditDish",
  data() {
    return {
      dish: null,
      feedback: null,
      another: null
    };
  },
  created() {
    // get the reference of doc, cannot get with id, we don't know
    // we have dishType, so give me exact dishType value stored in db.
    // where takes 3 params. 1st is property, 2nd is evaluation parameter
    // like '> , < , ==', 3rd part is what we wants to be equal to
    let refDoc = db
      .collection("dishes")
      .where("dishType", "==", this.$route.params.dish_type);
    // to retrieve it we must say get(), it is async task takes time
    // & returns promise
    refDoc
      .get()
      .then(sanpshot => {
        // cycle through item. data() function gives actual data.
        sanpshot.forEach(item => {
          // console.log(item.data());
          this.dish = item.data();
          // this doesn't id value yet add it up. Now we have everything
          // in dish object.
          this.dish.id = item.id;
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    editDish() {
      // console.log("hello");
      if (this.dish.title) {
        this.feedback = null;
        this.dish.dishType = slugify(this.dish.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // first we need to grab record to edit it. single document we
        // can grab by .doc(id). In created hook we added id in this.dish
        // so we have access of id, then we want to update
        db.collection("dishes")
          .doc(this.dish.id)
          .update({
            title: this.dish.title,
            ingredients: this.dish.ingredients,
            dishType: this.dish.dishType
          })
          .then(snap => {
            // console.log("here" + snap);
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log("update failed.");
          });
      } else {
        this.feedback = "Must enter dish title!";
      }
      // console.log(this.dish);
      // console.log(` after Dish: ${this.title}
      // Ingredients: ${this.ingredients}
      // DishType: ${this.slug}`);
    },
    updateIngredient() {
      if (this.another) {
        this.dish.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Must enter ingredients!";
      }
    },
    deleteIng(ingre) {
      this.dish.ingredients = this.dish.ingredients.filter(item => {
        return ingre !== item;
      });
      // console.log(`Title: ${this.dish.title}
      //  Ingredients: ${this.dish.ingredients}`);
    }
  }
};
</script>
<style>
.edit-dish {
  margin-top: 60px;
  padding: 20px;
  max-width: 450px;
}
.edit-dish h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-dish .field {
  margin: 20px auto;
  position: relative;
}

.edit-dish .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.2em;
  cursor: pointer;
}
</style>