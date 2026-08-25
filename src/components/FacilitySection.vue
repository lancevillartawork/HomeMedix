<script setup lang="ts">

const facilities = [
  'Private Rooms',
  '24/7 Nursing Care',
  'Recreational Activities',
  'Family Visitation',
  'Therapy Areas',
  'Comfortable Environment'
]

</script>

<template>

  <section
    id="facilities"
    class="facility-section"
  >

    <div class="facility-container">

      <!-- Images -->

      <div class="facility-images">

        <img
          src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80"
          alt="HomeMedix facility"
        >

        <img
          src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=700&q=80"
          alt="Healthcare facility"
        >

      </div>

      <!-- Content -->

      <div class="facility-content">

        <p class="eyebrow">
          OUR FACILITY
        </p>

        <h2>
          A place that
          <br>
          feels like home.
        </h2>

        <p>
          Our facility is thoughtfully designed
          to balance professional healthcare
          with genuine comfort and warmth.
        </p>

        <p>
          From comfortable rooms to therapeutic
          spaces, every area is designed to support
          the wellbeing and dignity of our patients.
        </p>

        <div class="facility-tags">

          <span
            v-for="facility in facilities"
            :key="facility"
          >
            {{ facility }}
          </span>

        </div>

      </div>

    </div>

  </section>

</template>

<style scoped>

.facility-section {
  padding: 110px 20px;

  background: #f5f8f7;
}

.facility-container {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 80px;

  align-items: center;
}

/* Images */

.facility-images {
  display: grid;
  grid-template-columns: 1.4fr 1fr;

  gap: 15px;
}

.facility-images img {
  width: 100%;
  height: 430px;

  object-fit: cover;
}

.facility-images img:last-child {
  margin-top: 80px;

  height: 350px;
}

/* Content */

.eyebrow {
  color: #277b73;

  font-size: 14px;
  font-weight: bold;

  letter-spacing: 2px;
}

h2 {
  margin: 20px 0;

  color: #123b46;

  font-size: 48px;
  line-height: 1.1;
}

.facility-content > p:not(.eyebrow) {
  color: #666;

  line-height: 1.8;
}

/* Tags */

.facility-tags {
  display: flex;
  flex-wrap: wrap;

  gap: 10px;

  margin-top: 30px;
}

.facility-tags span {
  padding: 10px 15px;

  border-radius: 20px;

  background: #e2f0ed;
  color: #277b73;

  font-size: 14px;
}

/* Mobile */

@media (max-width: 850px) {

  .facility-container {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 600px) {

  .facility-images {
    grid-template-columns: 1fr;
  }

  .facility-images img,
  .facility-images img:last-child {
    height: 300px;
    margin-top: 0;
  }

  h2 {
    font-size: 38px;
  }

}

</style>