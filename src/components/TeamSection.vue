<script setup lang="ts">

const team = [
  {
    name: 'Dr. Margaret Osei',
    role: 'Medical Director',
    description:
      'Experienced healthcare professional dedicated to patient-centered care.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'James Whitfield',
    role: 'Lead Physical Therapist',
    description:
      'Specialist in rehabilitation and mobility-focused therapy.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'Clara Santos',
    role: 'Director of Nursing',
    description:
      'Committed to creating safe and dignified environments for patients.',
    image:
      'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'David Yuen',
    role: 'Care Coordinator',
    description:
      'Helps families and healthcare teams coordinate seamless care.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'Sophia Reyes',
    role: 'Senior Caregiver',
    description:
      'Provides compassionate daily care and meaningful support to every patient.',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80'
  }
]

</script>

<template>

  <section id="team" class="team-section">

    <div class="container">

      <!-- Heading -->

      <div class="heading">

        <p class="eyebrow">
          OUR CARE TEAM
        </p>

        <h2>
          Expertise you can trust.
          <br>
          People you can know.
        </h2>

        <p>
          Our multidisciplinary team brings
          experience, warmth, and a shared
          commitment to quality care.
        </p>

      </div>


      <!-- Team -->

      <div class="team-grid">

        <article
          v-for="person in team"
          :key="person.name"
          class="team-card"
        >

          <img
            :src="person.image"
            :alt="person.name"
          >

          <div class="team-info">

            <h3>
              {{ person.name }}
            </h3>

            <span>
              {{ person.role }}
            </span>

            <p>
              {{ person.description }}
            </p>

          </div>

        </article>

      </div>

    </div>

  </section>

</template>

<style scoped>

.team-section {
  padding: 110px 20px;

  background: white;
}

.container {
  max-width: 1200px;
  margin: auto;
}


/* =========================
   HEADING
========================= */

.heading {
  max-width: 700px;

  margin: auto;

  text-align: center;
}

.eyebrow {
  color: #277b73;

  font-size: 14px;

  font-weight: bold;

  letter-spacing: 2px;
}

.heading h2 {
  margin: 20px 0;

  color: #123b46;

  font-size: 46px;

  line-height: 1.1;
}

.heading > p:last-child {
  color: #666;

  line-height: 1.7;
}


/* =========================
   TEAM GRID
========================= */

.team-grid {

  display: grid;

  /*
    Five people on desktop.
  */
  grid-template-columns: repeat(5, 1fr);

  gap: 18px;

  margin-top: 60px;
}


/* =========================
   TEAM CARD
========================= */

.team-card {

  overflow: hidden;

  border: 1px solid #e2e8e7;

  background: white;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.team-card:hover {

  transform: translateY(-5px);

  box-shadow:
    0 10px 30px rgba(18, 59, 70, 0.10);
}


/* =========================
   TEAM IMAGE
========================= */

.team-card img {

  width: 100%;

  height: 260px;

  object-fit: cover;
}


/* =========================
   TEAM INFORMATION
========================= */

.team-info {

  padding: 20px;
}

.team-info h3 {

  margin: 0 0 5px;

  color: #123b46;

  font-size: 18px;

  line-height: 1.3;
}

.team-info span {

  color: #277b73;

  font-size: 13px;

  font-weight: bold;
}

.team-info p {

  margin-top: 12px;

  color: #666;

  font-size: 14px;

  line-height: 1.5;
}


/* =========================
   TABLET
========================= */

@media (max-width: 1050px) {

  .team-grid {

    grid-template-columns:
      repeat(3, 1fr);

  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 650px) {

  .team-grid {

    grid-template-columns:
      repeat(2, 1fr);

    gap: 12px;

  }

  .team-card img {

    height: 220px;

  }

  .team-info {

    padding: 15px;

  }

  .team-info h3 {

    font-size: 17px;

  }

}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 450px) {

  .team-grid {

    grid-template-columns: 1fr;

  }

  .team-card img {

    height: 300px;

  }

  .heading h2 {

    font-size: 36px;

  }

}

</style>