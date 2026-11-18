<script setup lang="ts">
const careServices = [
  {
    title: 'Personal Care Assistance',
    description:
      'Support with bathing, grooming, dressing, mobility, and other daily personal care needs.'
  },
  {
    title: 'Companionship',
    description:
      'Friendly companionship and meaningful interaction to promote emotional well-being and reduce isolation.'
  },
  {
    title: 'Daily Living Assistance',
    description:
      'Help with everyday routines, light household activities, meal assistance, and maintaining a comfortable home environment.'
  },
  {
    title: 'Medication Reminders',
    description:
      'Timely reminders to help clients follow their prescribed medication schedules.'
  },
  {
    title: 'Mobility Support',
    description:
      'Assistance with safe movement around the home, transfers, walking, and daily activities.'
  },
  {
    title: 'Family Support',
    description:
      'Regular communication with families to help keep them informed about the care and well-being of their loved one.'
  }
]

const idealFor = [
  'Older adults who want to remain comfortable at home',
  'Individuals who need assistance with daily activities',
  'Clients recovering from illness or hospitalization',
  'Families who need additional caregiving support',
  'Individuals who benefit from regular companionship'
]
</script>

<template>
  <main class="service-page">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>

      <div class="container hero-content">
        <p class="eyebrow">HOMEMEDIX HOME CARE</p>

        <h1>
          Compassionate care,
          <br />
          right at home.
        </h1>

        <p class="hero-description">
          Personalized caregiving services designed to help your loved
          ones live safely, comfortably, and independently in the place
          they know best.
        </p>

        <a href="#get-care" class="primary-button">
          Get Care Now
        </a>
      </div>
    </section>


    <!-- OVERVIEW -->
    <section class="overview section">
      <div class="container overview-grid">

        <div>
          <p class="eyebrow">OVERVIEW</p>

          <h2>
            Quality care that feels
            personal.
          </h2>
        </div>

        <div class="overview-text">
          <p>
            At HomeMedix, we understand that home is where many people
            feel safest and most comfortable. Our home caregiving
            service provides compassionate support tailored to each
            client's individual needs and daily routine.
          </p>

          <p>
            Our caregivers work closely with clients and their families
            to provide dependable assistance while promoting dignity,
            comfort, independence, and quality of life.
          </p>
        </div>

      </div>
    </section>


    <!-- SERVICES INCLUDED -->
    <section class="included section">

      <div class="container">

        <div class="section-heading">
          <p class="eyebrow">SERVICES INCLUDED</p>

          <h2>
            Support for everyday living.
          </h2>

          <p>
            Our caregiving services can be tailored depending on the
            needs and preferences of each client.
          </p>
        </div>


        <div class="care-grid">

          <article
            v-for="(service, index) in careServices"
            :key="service.title"
            class="care-card"
          >
            <span class="card-number">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <h3>{{ service.title }}</h3>

            <p>
              {{ service.description }}
            </p>
          </article>

        </div>

      </div>

    </section>


    <!-- WHO IT'S FOR -->
    <section class="who-section section">

      <div class="container who-grid">

        <div class="who-image">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
            alt="HomeMedix home caregiving"
          />
        </div>


        <div class="who-content">

          <p class="eyebrow">WHO IT'S FOR</p>

          <h2>
            Helping families care for
            the people they love.
          </h2>

          <p>
            Home caregiving may be an ideal option for individuals who
            want additional support while continuing to live in their
            own home.
          </p>


          <ul>
            <li
              v-for="item in idealFor"
              :key="item"
            >
              <span class="check">✓</span>

              {{ item }}
            </li>
          </ul>

        </div>

      </div>

    </section>


    <!-- CTA -->
    <section id="get-care" class="cta-section">

      <div class="container cta-content">

        <div>
          <p class="cta-eyebrow">
            START YOUR CARE JOURNEY
          </p>

          <h2>
            Care begins with a
            conversation.
          </h2>

          <p>
            Tell us about your loved one's needs and our team will help
            you understand the HomeMedix care options available to your
            family.
          </p>
        </div>


        <RouterLink
          to="/#contact"
          class="cta-button"
        >
          Contact HomeMedix →
        </RouterLink>

      </div>

    </section>

  </main>
</template>


<style scoped>
.service-page {
  background: #ffffff;
  color: #172033;
}

.container {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

.section {
  padding: 100px 0;
}

.eyebrow {
  margin: 0 0 16px;
  color: #1a3575;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}


/* =========================
   HERO
========================= */

.hero {
  position: relative;
  min-height: 620px;

  display: flex;
  align-items: center;

  background:
    url('https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=1800&q=85')
    center / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(10, 35, 65, 0.92) 0%,
      rgba(10, 35, 65, 0.78) 45%,
      rgba(10, 35, 65, 0.20) 100%
    );
}

.hero-content {
  position: relative;
  z-index: 1;

  color: white;
}

.hero .eyebrow {
  color: #8ed8eb;
}

.hero h1 {
  max-width: 750px;

  margin-bottom: 25px;

  font-size: clamp(48px, 6vw, 76px);
  line-height: 1.05;

  color: white;
}

.hero-description {
  max-width: 620px;

  margin-bottom: 35px;

  color: rgba(255, 255, 255, 0.88);

  font-size: 18px;
  line-height: 1.8;
}

.primary-button {
  display: inline-block;

  padding: 16px 28px;

  background: #ffffff;

  color: #1a3575;

  border-radius: 4px;

  font-weight: 700;

  text-decoration: none;

  transition: 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
}


/* =========================
   OVERVIEW
========================= */

.overview-grid {
  display: grid;

  grid-template-columns: 0.9fr 1.1fr;

  gap: 90px;
}

.overview h2,
.section-heading h2,
.who-content h2 {
  color: #1a3575;

  font-size: clamp(36px, 4vw, 50px);

  line-height: 1.15;
}

.overview-text {
  color: #677184;

  font-size: 17px;

  line-height: 1.8;
}

.overview-text p {
  margin-bottom: 20px;
}


/* =========================
   SERVICES INCLUDED
========================= */

.included {
  background: #f5f7fa;
}

.section-heading {
  max-width: 680px;

  margin-bottom: 50px;
}

.section-heading > p:last-child {
  color: #677184;

  line-height: 1.7;
}

.care-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;
}

.care-card {
  padding: 35px;

  background: white;

  border: 1px solid #e2e7ee;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.care-card:hover {
  transform: translateY(-5px);

  box-shadow: 0 15px 35px rgba(23, 32, 51, 0.08);
}

.card-number {
  display: block;

  margin-bottom: 30px;

  color: #4bc8ec;

  font-size: 14px;

  font-weight: 700;
}

.care-card h3 {
  margin-bottom: 15px;

  color: #1a3575;

  font-size: 21px;
}

.care-card p {
  margin-bottom: 0;

  color: #677184;

  line-height: 1.7;
}


/* =========================
   WHO IT'S FOR
========================= */

.who-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  align-items: center;

  gap: 80px;
}

.who-image {
  height: 580px;
}

.who-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.who-content > p:not(.eyebrow) {
  color: #677184;

  line-height: 1.8;
}

.who-content ul {
  margin: 30px 0 0;

  padding: 0;

  list-style: none;
}

.who-content li {
  display: flex;

  align-items: flex-start;

  gap: 13px;

  margin-bottom: 17px;

  color: #444c5c;

  line-height: 1.6;
}

.check {
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  border-radius: 50%;

  background: #daeaf7;

  color: #1a3575;

  font-size: 12px;

  font-weight: 700;
}


/* =========================
   CTA
========================= */

.cta-section {
  padding: 80px 0;

  background: #1a3575;

  color: white;
}

.cta-content {
  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 50px;
}

.cta-content > div {
  max-width: 720px;
}

.cta-eyebrow {
  margin-bottom: 15px;

  color: #8ed8eb;

  font-size: 13px;

  font-weight: 700;

  letter-spacing: 2px;
}

.cta-content h2 {
  margin-bottom: 15px;

  color: white;

  font-size: clamp(34px, 4vw, 48px);
}

.cta-content p {
  margin-bottom: 0;

  color: rgba(255, 255, 255, 0.8);

  line-height: 1.7;
}

.cta-button {
  flex-shrink: 0;

  padding: 17px 26px;

  background: white;

  color: #1a3575;

  border-radius: 4px;

  font-weight: 700;

  text-decoration: none;

  transition: 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
}


/* =========================
   TABLET
========================= */

@media (max-width: 900px) {

  .section {
    padding: 75px 0;
  }

  .overview-grid,
  .who-grid {
    grid-template-columns: 1fr;

    gap: 45px;
  }

  .care-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .who-image {
    height: 450px;
  }

  .cta-content {
    align-items: flex-start;

    flex-direction: column;
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .container {
    width: min(100% - 30px, 1200px);
  }

  .hero {
    min-height: 570px;
  }

  .hero h1 {
    font-size: 45px;
  }

  .hero-description {
    font-size: 16px;
  }

  .care-grid {
    grid-template-columns: 1fr;
  }

  .care-card {
    padding: 28px;
  }

  .who-image {
    height: 350px;
  }

  .cta-section {
    padding: 65px 0;
  }

  .cta-button {
    width: 100%;

    box-sizing: border-box;

    text-align: center;
  }
}
</style>