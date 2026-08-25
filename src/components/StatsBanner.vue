<script setup lang="ts">

const stats = [
  {
    number: '2,400+',
    label: 'Patients Served'
  },

  {
    number: '18',
    label: 'Years of Care'
  },

  {
    number: '98%',
    label: 'Family Satisfaction'
  },

  {
    number: '120+',
    label: 'Healthcare Professionals'
  }
]

</script>

<template>

  <section class="stats-section">

    <div class="stats-container">

      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat"
      >

        <strong>
          {{ stat.number }}
        </strong>

        <span>
          {{ stat.label }}
        </span>

      </div>

    </div>

  </section>

</template>

<style scoped>

.stats-section {
  padding: 70px 20px;

  background: #f2f7f6;
}

.stats-container {
  max-width: 1100px;

  margin: auto;

  display: grid;

  grid-template-columns: repeat(4, 1fr);
}

.stat {
  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;
}


/* =========================
   STAT NUMBER
========================= */

.stat strong {
  display: block;

  font-family: "Lora", serif;

  font-size: 34px;

  color: #1a3575;
}


/* =========================
   STAT LABEL
========================= */

.stat span {
  margin-top: 8px;

  color: #666;

  font-size: 14px;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

  .stats-container {
    grid-template-columns: 1fr 1fr;

    gap: 40px;
  }

}

</style>