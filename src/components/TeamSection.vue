<script setup lang="ts">

const team = [
  {
    name: 'Leah Marie D. Villarta, PTRP',
    role: 'CEO/FOUNDER',
    description:
      'Leads HomeMedix with a vision focused on compassionate, reliable, and patient-centered healthcare services.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'Marlon R. Segundo',
    role: 'CEO/FOUNDER',
    description:
      'Helps lead the organization in delivering quality healthcare while supporting the growth and development of HomeMedix.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'Dr. Oro-Josef Cheridine, MD',
    role: 'RESIDENT DOCTOR',
    description:
      'Provides medical supervision and professional care to residents while helping ensure their health, safety, and well-being.',
    image:
      'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'Joy Toralba',
    role: 'CLINICAL MANAGER',
    description:
      'Oversees clinical operations and coordinates healthcare services to ensure consistent, safe, and quality patient care.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },

  {
    name: 'Donna Galing',
    role: 'CAREGIVER SUPERVISOR',
    description:
      'Supervises caregivers and supports the delivery of compassionate, dependable, and personalized daily care for patients.',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80'
  }
]

</script>


<template>

  <section id="team" class="team-section">

    <div class="container">

      <!-- =========================
           HEADING
      ========================== -->

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


      <!-- =========================
           TEAM GRID
      ========================== -->

      <div class="team-grid">

        <article
          v-for="person in team"
          :key="person.name"
          class="team-card"
        >

          <!-- Team Image -->

          <img
            :src="person.image"
            :alt="person.name"
          >


          <!-- Team Information -->

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

/* =====================================================
   TEAM SECTION
===================================================== */

.team-section {

  padding: 110px 20px;

  /* White */
  background: #ffffff;

}


/* =====================================================
   CONTAINER
===================================================== */

.container {

  max-width: 1200px;

  margin: auto;

}


/* =====================================================
   HEADING
===================================================== */

.heading {

  max-width: 700px;

  margin: auto;

  text-align: center;

}


.eyebrow {

  margin: 0;

  /* Primary Blue */
  color: #1a3575;

  font-size: 14px;

  font-weight: 700;

  letter-spacing: 2px;

}


.heading h2 {

  margin: 20px 0;

  /* Primary Blue */
  color: #1a3575;

  font-size: 46px;

  line-height: 1.1;

}


.heading > p:last-child {

  margin: 0;

  /* Gray Text */
  color: #677184;

  line-height: 1.7;

}


/* =====================================================
   TEAM GRID
===================================================== */

.team-grid {

  display: grid;

  /*
    Five people on desktop.
  */

  grid-template-columns:
    repeat(5, 1fr);

  gap: 18px;

  margin-top: 60px;

}


/* =====================================================
   TEAM CARD
===================================================== */

.team-card {

  overflow: hidden;

  /* Border Color */
  border: 1px solid #e2e7ee;

  /* White */
  background: #ffffff;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.team-card:hover {

  transform: translateY(-5px);

  box-shadow:
    0 10px 30px rgba(26, 53, 117, 0.10);

}


/* =====================================================
   TEAM IMAGE
===================================================== */

.team-card img {

  display: block;

  width: 100%;

  height: 260px;

  object-fit: cover;

}


/* =====================================================
   TEAM INFORMATION
===================================================== */

.team-info {

  padding: 20px;

  display: flex;

  flex-direction: column;

}


/* =====================================================
   TEAM MEMBER NAME
===================================================== */

.team-info h3 {

  margin: 0 0 6px;

  /* Primary Blue */
  color: #1a3575;

  font-size: 18px;

  line-height: 1.3;

}


/* =====================================================
   TEAM MEMBER POSITION
===================================================== */

.team-info span {

  display: block;

  /* Light Blue */
  color: #4bc8ec;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 0.5px;

  line-height: 1.4;

}


/* =====================================================
   TEAM MEMBER DESCRIPTION
===================================================== */

.team-info p {

  margin: 12px 0 0;

  /* Gray Text */
  color: #677184;

  font-size: 14px;

  line-height: 1.5;

}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1050px) {

  .team-grid {

    grid-template-columns:
      repeat(3, 1fr);

  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 650px) {

  .team-section {

    padding: 80px 20px;

  }


  .team-grid {

    grid-template-columns:
      repeat(2, 1fr);

    gap: 12px;

    margin-top: 45px;

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


  .team-info span {

    font-size: 11px;

  }


  .team-info p {

    font-size: 13px;

  }

}


/* =====================================================
   SMALL MOBILE
===================================================== */

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