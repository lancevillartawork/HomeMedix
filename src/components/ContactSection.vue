<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  service: '',
  message: ''
})

const formMessage = ref('')

function submitForm() {
  formMessage.value =
    'Thank you! Your message has been received. We will get back to you soon.'

  form.value = {
    name: '',
    phone: '',
    service: '',
    message: ''
  }
}
</script>

<template>

  <section
    class="contact-section"
    id="contact"
  >

    <div class="contact-container">


      <!-- =========================
           HEADING
      ========================== -->

      <div class="center-heading light">

        <p class="eyebrow accent">
          Get In Touch
        </p>

        <h2>
          Ready to take the<br>
          next step?
        </h2>

        <p>
          Whether you need home care for a loved one,
          post-surgical therapy, or are exploring our
          nursing home facility, our care coordinators
          are ready to guide you — with no pressure
          and no obligation.
        </p>

      </div>


      <!-- =========================
           CONTACT CARDS
      ========================== -->

      <div class="contact-cards">


        <!-- PHONE -->

        <a
          href="tel:+63286373571"
          class="contact-card"
        >

          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.92V20a2 2 0 0 1-2.18 2
              A19.79 19.79 0 0 1 3.01 5.18
              A2 2 0 0 1 5 3h3.09
              a2 2 0 0 1 2 1.72
              c.12.9.33 1.78.62 2.63
              a2 2 0 0 1-.45 2.11L9 10.73
              a16 16 0 0 0 4.27 4.27
              l1.27-1.27
              a2 2 0 0 1 2.11-.45
              c.85.29 1.73.5 2.63.62
              A2 2 0 0 1 21 16l1 .92Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <small>
            Call Us
          </small>

          <strong>
            (02) 8637-3571
          </strong>

        </a>


        <!-- EMAIL -->

        <a
          href="mailto:HomeMedix.ptcaregiving@gmail.com"
          class="contact-card"
        >

          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="2"
            />

            <path
              d="M3 7L12 13L21 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <small>
            Email Us
          </small>

          <strong>
            HomeMedix.ptcaregiving@gmail.com
          </strong>

        </a>


        <!-- LOCATION -->

        <a
          href="https://www.google.com/maps/search/?api=1&query=124+A.+Flores+St%2C+Marikina"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-card"
        >

          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 10C20 15 12 21 12 21
              S4 15 4 10
              A8 8 0 1 1 20 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <circle
              cx="12"
              cy="10"
              r="2.5"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>

          <small>
            Visit Us
          </small>

          <strong>
            124 A. Flores St, Marikina
          </strong>

        </a>

      </div>


      <!-- =========================
           CONTACT FORM
      ========================== -->

      <form
        class="contact-form"
        @submit.prevent="submitForm"
      >


        <!-- NAME + PHONE -->

        <div class="form-row">

          <label>
            Full Name

            <input
              v-model="form.name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            >

          </label>


          <label>
            Phone Number

            <input
              v-model="form.phone"
              type="tel"
              name="phone"
              placeholder="09*********"
              required
            >

          </label>

        </div>


        <!-- SERVICE -->

        <label>
          I am interested in

          <select
            v-model="form.service"
            name="service"
            required
          >

            <option
              value=""
              disabled
            >
              Select a service...
            </option>

            <option value="Home Caregiving">
              Home Caregiving
            </option>

            <option value="Physical Therapy">
              Physical Therapy
            </option>

            <option value="Nursing Home Facility">
              Nursing Home Facility
            </option>

            <option value="General Inquiry">
              General Inquiry
            </option>

          </select>

        </label>


        <!-- MESSAGE -->

        <label>
          Message

          <textarea
            v-model="form.message"
            name="message"
            rows="4"
            placeholder="Tell us a bit about the care you're looking for..."
            required
          ></textarea>

        </label>


        <!-- SUBMIT -->

        <button
          class="btn btn-accent full-width"
          type="submit"
        >

          Send Message

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />

            <path
              d="M13 6L19 12L13 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

        </button>


        <!-- FORM MESSAGE -->

        <p
          v-if="formMessage"
          class="form-message"
          role="status"
        >
          {{ formMessage }}
        </p>

      </form>

    </div>

  </section>

</template>


<style scoped>

/* =====================================================
   CONTACT SECTION
===================================================== */

.contact-section {

  padding: 96px 24px;

  color: #ffffff;

  background-color: #1a3575;

}

.contact-container {

  max-width: 820px;

  margin-left: auto;

  margin-right: auto;

}


/* =====================================================
   HEADING
===================================================== */

.center-heading {

  text-align: center;

  margin-bottom: 40px;

}

.center-heading.light h2 {

  color: #ffffff;

}

.center-heading.light p:last-child {

  color: rgba(255, 255, 255, 0.72);

  line-height: 1.7;

}

.eyebrow {

  margin-bottom: 12px;

  font-size: 13px;

  font-weight: 700;

  letter-spacing: 2px;

  text-transform: uppercase;

}

.eyebrow.accent {

  color: #4bc8ec;

}

.center-heading h2 {

  margin: 0 0 20px;

  color: #ffffff;

  font-size: 48px;

  line-height: 1.1;

}


/* =====================================================
   CONTACT CARDS
===================================================== */

.contact-cards {

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 14px;

  margin-bottom: 38px;

}

.contact-card {

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 5px;

  padding: 24px 14px;

  text-align: center;

  color: #ffffff;

  text-decoration: none;

  background-color: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(255, 255, 255, 0.14);

  border-radius: 13px;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

}

.contact-card:hover {

  background-color: rgba(255, 255, 255, 0.13);

  transform: translateY(-2px);

}

.contact-card svg {

  width: 21px;

  color: #4bc8ec;

  margin-bottom: 4px;

}

.contact-card small {

  color: rgba(255, 255, 255, 0.55);

  font-size: 12px;

}

.contact-card strong {

  color: #ffffff;

  font-size: 13px;

  font-weight: 600;

}


/* =====================================================
   CONTACT FORM
===================================================== */

.contact-form {

  padding: 32px;

  background-color: rgba(255, 255, 255, 0.06);

  border: 1px solid rgba(255, 255, 255, 0.12);

  border-radius: 17px;

}


/* =====================================================
   FORM ROW
===================================================== */

.form-row {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 16px;

}


/* =====================================================
   LABELS
===================================================== */

.contact-form label {

  display: block;

  margin-bottom: 16px;

  color: #ffffff;

  font-size: 12px;

  font-weight: 700;

}


/* =====================================================
   INPUT / SELECT / TEXTAREA
===================================================== */

.contact-form input,
.contact-form select,
.contact-form textarea {

  display: block;

  width: 100%;

  margin-top: 7px;

  padding: 13px 14px;

  box-sizing: border-box;

  color: #ffffff;

  background-color: rgba(255, 255, 255, 0.1);

  border: 1px solid rgba(255, 255, 255, 0.18);

  border-radius: 8px;

  outline: none;

  font-family: inherit;

  font-size: 14px;

  transition: border-color 0.2s ease;

}


/* =====================================================
   PLACEHOLDER
===================================================== */

.contact-form input::placeholder,
.contact-form textarea::placeholder {

  color: rgba(255, 255, 255, 0.45);

}


/* =====================================================
   INPUT FOCUS
===================================================== */

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {

  border-color: #4bc8ec;

}


/* =====================================================
   SELECT OPTIONS
===================================================== */

.contact-form option {

  color: #172033;

  background-color: #ffffff;

}


/* =====================================================
   TEXTAREA
===================================================== */

.contact-form textarea {

  resize: vertical;

  min-height: 110px;

}


/* =====================================================
   BUTTON
===================================================== */

.btn {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  padding: 13px 20px;

  border-radius: 8px;

  font-family: inherit;

  font-weight: 700;

  text-decoration: none;

}

.btn-accent {

  color: #1a3575;

  background-color: #4bc8ec;

}

.btn-accent:hover {

  filter: brightness(1.05);

}

.full-width {

  width: 100%;

  border: none;

  cursor: pointer;

}


/* =====================================================
   FORM MESSAGE
===================================================== */

.form-message {

  margin: 15px 0 0;

  text-align: center;

  font-size: 14px;

  color: #b9f2c9;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 700px) {

  .contact-section {

    padding: 70px 20px;

  }

  .center-heading h2 {

    font-size: 38px;

  }

  .contact-cards {

    grid-template-columns: 1fr;

  }

  .form-row {

    grid-template-columns: 1fr;

    gap: 0;

  }

  .contact-form {

    padding: 24px;

  }

}

</style>