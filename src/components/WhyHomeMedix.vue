<script setup lang="ts">

const reasons = [
  {
    number: '01',
    title: 'Compassionate Care',
    description:
      'We treat every individual with dignity, respect, patience, and genuine compassion.'
  },

  {
    number: '02',
    title: 'Professional Team',
    description:
      'Our healthcare professionals are committed to providing reliable and quality care.'
  },

  {
    number: '03',
    title: 'Personalized Approach',
    description:
      'Every care plan is designed around the unique needs, goals, and preferences of each patient.'
  },

  {
    number: '04',
    title: 'Family Partnership',
    description:
      'We work closely with families to keep communication clear throughout the care journey.'
  }
]

</script>

<template>

  <section id="about" class="why-section">

    <div class="why-container">

      <!-- Left -->

      <div class="why-intro">

        <p class="eyebrow">
          WHY HOMEMEDIX
        </p>

        <h2>
          Guided by science.
          <br>
          <em>Driven by compassion.</em>
        </h2>

        <p class="description">
          We believe healthcare should be more than
          treatment. It should be an experience built
          around trust, comfort, dignity, and human
          connection.
        </p>

        <a
          href="#contact"
          class="learn-button"
        >
          Start Your Care Journey →
        </a>

      </div>

      <!-- Right -->

      <div class="reasons">

        <article
          v-for="reason in reasons"
          :key="reason.number"
          class="reason"
        >

          <span class="number">
            {{ reason.number }}
          </span>

          <div>

            <h3>
              {{ reason.title }}
            </h3>

            <p>
              {{ reason.description }}
            </p>

          </div>

        </article>

      </div>

    </div>

  </section>

</template>

<style scoped>

.why-section {
  padding: 110px 20px;

  background: #1a3575;
  color: white;
}

.why-container {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 90px;
}

.eyebrow {
  color: #8dd7c7;

  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
}

h2 {
  margin: 20px 0;

  font-size: 48px;
  line-height: 1.1;
}

h2 em {
  font-family: Georgia, serif;
  font-weight: normal;
}

.description {
  max-width: 550px;

  color: #d0e0e2;

  line-height: 1.8;
}

.learn-button {
  display: inline-block;

  margin-top: 25px;
  padding: 14px 22px;

  border-radius: 5px;

  background: #4bc8ec;
  color: #ffffff;

  text-decoration: none;
  font-weight: bold;
}

/* Reasons */

.reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 30px;
}

.reason {
  padding-top: 20px;

  border-top: 1px solid #49666d;
}

.number {
  display: block;

  margin-bottom: 15px;

  color: #8dd7c7;

  font-size: 14px;
}

.reason h3 {
  margin: 0 0 10px;

  color: white;

  font-size: 21px;
}

.reason p {
  margin: 0;

  color: #bfd0d2;

  line-height: 1.6;
}

/* Mobile */

@media (max-width: 800px) {

  .why-container {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: 38px;
  }

  .reasons {
    grid-template-columns: 1fr;
  }

}

</style>