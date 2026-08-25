<script setup lang="ts">
function scrollToServices() {
  document
    .getElementById('services')
    ?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" class="hero">

    <!-- Left Side -->
    <div class="hero-content">

      <p class="eyebrow">
        COMPASSIONATE HEALTHCARE
      </p>

      <h1>
        Care that feels
        <br>
        <em>like home.</em>
      </h1>

      <p class="hero-description">
        HomeMedix provides expert caregiving,
        physical therapy, and residential nursing
        with the warmth and dignity every person
        deserves.
      </p>

      <div class="hero-buttons">

        <a
          href="#contact"
          class="btn btn-primary"
        >
          Request a Consultation
        </a>

        <button
          class="btn btn-outline"
          @click="scrollToServices"
        >
          Explore Services
        </button>

      </div>

    </div>

    <!-- Right Side -->
    <div class="hero-image">

      <img
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
        alt="Healthcare professional caring for a patient"
      >

    </div>

  </section>
</template>

<style scoped>

.hero {
  min-height: 750px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: #1a3575;
  color: white;
}

/* Left Content */

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 80px;
}

.eyebrow {
  margin: 0 0 20px;

  color: #8dd7c7;

  font-size: 14px;
  font-weight: 700;

  letter-spacing: 2px;
}

h1 {
  margin: 0 0 25px;

  font-size: clamp(50px, 6vw, 80px);
  line-height: 1.05;
}

h1 em {
  font-family: Georgia, serif;
  font-weight: 400;
}

.hero-description {
  max-width: 560px;

  color: #d4e2e4;

  font-size: 18px;
  line-height: 1.7;
}

/* Buttons */

.hero-buttons {
  display: flex;
  gap: 15px;

  margin-top: 25px;
}

.btn {
  padding: 14px 22px;

  border-radius: 5px;

  font-size: 14px;
  
  font-weight: 600;

  cursor: pointer;

  text-decoration: none;
}

.btn-primary {
  background: #4bc8ec;
  color: white;
}

.btn-primary:hover {
  background: #a5e5d7;
}

.btn-outline {
  border: 1px solid white;

  background: transparent;

  color: white;
}

.btn-outline:hover {
  background: white;
  color: #123b46;
}

/* Image */

.hero-image {
  min-height: 650px;
}

.hero-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

/* Mobile */

@media (max-width: 800px) {

  .hero {
    grid-template-columns: 1fr;
  }

  .hero-content {
    padding: 70px 25px;
  }

  .hero-image {
    min-height: 400px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    text-align: center;
  }

}

</style>