<script setup lang="ts">

const services = [
  'Home Caregiving',
  'Physical Therapy',
  'Nursing Home Facility',
  'Care Coordination'
]

const company = [
  'About Us',
  'Our Team',
  'Facilities',
  'Contact'
]

</script>


<template>

  <footer class="footer">

    <div class="footer-container">


      <!-- =================================
           ABOUT
      ================================== -->

      <div class="footer-about">

        <img
          src="/assets/homemedix-logo.png"
          alt="HomeMedix Logo"
        >

        <p>
          Providing compassionate and professional
          healthcare services for individuals and
          families.
        </p>

      </div>


      <!-- =================================
           SERVICES
      ================================== -->

      <div class="footer-column">

        <h3>
          Services
        </h3>

        <a
          v-for="service in services"
          :key="service"
          href="#services"
        >
          {{ service }}
        </a>

      </div>


      <!-- =================================
           COMPANY
      ================================== -->

      <div class="footer-column">

        <h3>
          Company
        </h3>

        <a
          v-for="item in company"
          :key="item"
          :href="
            item === 'About Us'
              ? '#about'
              : item === 'Our Team'
                ? '#team'
                : item === 'Facilities'
                  ? '#facilities'
                  : '#contact'
          "
        >
          {{ item }}
        </a>

      </div>

    </div>


    <!-- =================================
         FOOTER BOTTOM
    ================================== -->

    <div class="footer-bottom">

      <span>
        © 2026 HomeMedix. All rights reserved.
      </span>

      <div>

        <a href="#">
          Privacy Policy
        </a>

        <a href="#">
          Terms
        </a>

      </div>

    </div>

  </footer>

</template>


<style scoped>

/* =====================================================
   FOOTER
===================================================== */

.footer {

  padding: 70px 20px 20px;

  /* Footer Background */
  background: #121a2a;

  /* White */
  color: #ffffff;

}


/* =====================================================
   FOOTER CONTAINER
===================================================== */

.footer-container {

  max-width: 1200px;

  margin: auto;

  display: grid;

  grid-template-columns: 2fr 1fr 1fr;

  gap: 70px;

}


/* =====================================================
   ABOUT
===================================================== */

.footer-about img {

  width: 150px;

  margin-bottom: 20px;

}


.footer-about p {

  max-width: 450px;

  /* Light gray / muted text */
  color: #b8cccf;

  line-height: 1.7;

}


/* =====================================================
   FOOTER COLUMNS
===================================================== */

.footer-column h3 {

  margin-top: 0;

  margin-bottom: 20px;

  /* White */
  color: #ffffff;

  font-size: 16px;

  font-weight: 700;

}


/* =====================================================
   FOOTER LINKS
===================================================== */

.footer a {

  display: block;

  margin-bottom: 12px;

  /* Muted text */
  color: #b8cccf;

  text-decoration: none;

  transition: color 0.2s ease;

}


.footer a:hover {

  /* Light Blue */
  color: #4bc8ec;

}


/* =====================================================
   FOOTER BOTTOM
===================================================== */

.footer-bottom {

  max-width: 1200px;

  margin: 60px auto 0;

  padding-top: 20px;

  /* Border */
  border-top: 1px solid #315159;

  display: flex;

  justify-content: space-between;

  /* Muted text */
  color: #8faeb2;

  font-size: 14px;

}


/* =====================================================
   FOOTER BOTTOM LINKS
===================================================== */

.footer-bottom div {

  display: flex;

  gap: 20px;

}


.footer-bottom a {

  margin-bottom: 0;

  color: #8faeb2;

}


.footer-bottom a:hover {

  color: #4bc8ec;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 700px) {

  .footer {

    padding: 60px 20px 20px;

  }


  .footer-container {

    grid-template-columns: 1fr;

    gap: 40px;

  }


  .footer-bottom {

    flex-direction: column;

    gap: 20px;

  }

}

</style>