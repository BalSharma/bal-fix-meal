<template>
  <div class="navbar">
    <nav class="nav-extented indigo accent-2">
      <div class="nav-content">
        <img src="@/assets/dada.jpg" alt="bal" />
        <router-link :to="{name: 'Index'}">
          <span class="nav-title">Bal Fixes Meal</span>
        </router-link>
        <a class="btn-floating btn-large red">
          <router-link :to="{name: 'AddDish'}">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script >
<style>
.navbar img {
  position: absolute;
  border-radius: 50%;
  margin-left: 30px;
  margin-top: 8px;
}
.navbar .nav-title {
  padding: 0 0 0 15px;
  margin-left: 100px;
}
.btn-floating {
  float: right;
  margin-top: 2rem;
}
</style>