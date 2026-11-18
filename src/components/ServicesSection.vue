<script setup lang="ts">
import { ref, computed } from 'vue'

interface Service {
  title: string
  description: string
  features: string[]
  image: string
  route: string
}

const selectedService = ref(0)

const services: Service[] = [
  {
    title: 'Home Caregiving',

    description:
      'Compassionate and personalized care delivered in the comfort of your own home. Our caregivers help with daily activities, companionship, medication reminders, and more.',

    features: [
      'Personalized care plans',
      'Companionship',
      'Daily living assistance',
      'Medication reminders'
    ],

    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',

    route: '/services/home-caregiving'
  },

  {
    title: 'Physical Therapy',

    description:
      'Professional physical therapy programs designed to improve mobility, strength, balance, and overall quality of life.',

    features: [
      'Mobility improvement',
      'Strength training',
      'Balance exercises',
      'Personalized therapy'
    ],

    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',

    route: '/services/physical-therapy'
  },

  {
    title: 'Nursing Home Facility',

    description:
      'A safe, comfortable, and supportive environment for individuals who require professional nursing care and assistance throughout the day.',

    features: [
      '24/7 nursing care',
      'Comfortable rooms',
      'Recreational activities',
      'Family visitation'
    ],

    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1000&q=80',

    route: '/services/nursing-home'
  }
]

const selectedServiceData = computed<Service>(() => {
  return services[selectedService.value]!
})
</script>

<template>
  <section id="services" class="services-section">

    <div class="container">

      <!-- SECTION TITLE -->
      <div class="section-heading">

        <p class="eyebrow">
          OUR SERVICES
        </p>

        <h2>
          Whole-person care,
          <br>
          wherever you are.
        </h2>

        <p>
          HomeMedix offers compassionate healthcare
          services designed around the needs of every
          individual and family.
        </p>

      </div>

      <!-- SERVICE BUTTONS -->
      <div class="service-tabs">

        <button
          v-for="(service, index) in services"
          :key="service.title"
          type="button"
          :class="{ active: selectedService === index }"
          @click="selectedService = index"
        >
          {{ service.title }}
        </button>

      </div>

      <!-- SERVICE CARD -->
      <div class="service-card">

        <!-- LEFT -->
        <div class="service-content">

          <span class="service-number">
            0{{ selectedService + 1 }}
          </span>

          <h3>
            {{ selectedServiceData.title }}
          </h3>

          <p>
            {{ selectedServiceData.description }}
          </p>

          <!-- FEATURES -->
          <ul>

            <li
              v-for="feature in selectedServiceData.features"
              :key="feature"
            >

              <span class="check">
                ✓
              </span>

              {{ feature }}

            </li>

          </ul>

          <!-- LEARN MORE -->
          <RouterLink :to="selectedServiceData.route">
            Learn More →
          </RouterLink>

        </div>

        <!-- RIGHT -->
        <div class="service-image">

          <img
            :src="selectedServiceData.image"
            :alt="selectedServiceData.title"
          >

        </div>

      </div>

    </div>

  </section>
</template>

<style scoped>

.services-section {
  padding: 100px 20px;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}


/* =========================
   SECTION HEADING
========================= */

.section-heading {
  max-width: 700px;
}

.eyebrow {
  margin: 0 0 15px;

  color: #277b73;

  font-size: 14px;
  font-weight: 700;

  letter-spacing: 2px;
}

h2 {
  margin: 0 0 20px;

  color: #123b46;

  font-size: 48px;
  line-height: 1.1;
}

.section-heading > p:last-child {
  color: #666666;

  line-height: 1.7;
}


/* =========================
   SERVICE TABS
========================= */

.service-tabs {
  display: flex;

  gap: 10px;

  margin-top: 50px;
  margin-bottom: 25px;
}

.service-tabs button {
  padding: 15px 22px;

  border: 1px solid #d8e1df;
  border-radius: 5px;

  background: white;

  color: #123b46;

  cursor: pointer;

  font-size: 15px;

  transition: 0.2s ease;
}

.service-tabs button:hover {
  border-color: #1a3575;
}

.service-tabs button.active {
  background: #1a3575;

  color: white;

  border-color: #1a3575;
}


/* =========================
   SERVICE CARD
========================= */

.service-card {
  display: grid;

  grid-template-columns: 1fr 1fr;

  min-height: 450px;

  border: 1px solid #e1e8e7;

  background: white;
}


/* =========================
   SERVICE CONTENT
========================= */

.service-content {
  padding: 55px;
}

.service-number {
  color: #277b73;

  font-size: 14px;

  font-weight: bold;
}

h3 {
  margin: 15px 0;

  color: #123b46;

  font-size: 32px;
}

.service-content p {
  color: #666666;

  line-height: 1.7;
}


/* =========================
   FEATURES
========================= */

.service-content ul {
  padding: 0;

  margin: 25px 0;

  list-style: none;
}

.service-content li {
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 12px;

  color: #444444;
}

.check {
  display: inline-flex;

  width: 22px;
  height: 22px;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e4f3ef;

  color: #277b73;

  font-size: 13px;
}


/* =========================
   LEARN MORE
========================= */

.service-content a {
  display: inline-block;

  color: #1a3575;

  font-weight: bold;

  text-decoration: none;

  transition: 0.2s ease;
}

.service-content a:hover {
  transform: translateX(4px);
}


/* =========================
   IMAGE
========================= */

.service-image {
  min-height: 450px;
}

.service-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {

  h2 {
    font-size: 38px;
  }

  .service-tabs {
    flex-direction: column;
  }

  .service-tabs button {
    width: 100%;
  }

  .service-card {
    grid-template-columns: 1fr;
  }

  .service-content {
    padding: 35px;
  }

  .service-image {
    min-height: 300px;
  }

}

</style>