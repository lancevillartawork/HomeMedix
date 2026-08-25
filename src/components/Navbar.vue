<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="navbar">

    <!-- MAIN NAVIGATION -->
    <div class="container nav-wrap">

      <!-- BRAND -->
      <a
        href="#home"
        class="brand"
        aria-label="HomeMedix home"
        @click="closeMobileMenu"
      >
        <img
          src="/assets/homemedix-logo.png"
          alt="HomeMedix logo"
        >
      </a>


      <!-- DESKTOP NAVIGATION -->
      <nav
        class="desktop-nav"
        aria-label="Main navigation"
      >

        <a href="#services">
          Services
        </a>

        <a href="#about">
          About
        </a>

        <a href="#facilities">
          Facilities
        </a>

        <a href="#team">
          Team
        </a>

        <a href="#contact">
          Contact
        </a>

      </nav>


      <!-- DESKTOP ACTIONS -->
      <div class="nav-actions">

        <!-- PHONE -->
        <a
          class="phone-link"
          href="tel:+18005554747"
        >

          <!-- Phone Icon -->
          <svg
            class="phone-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.92V20a2 2 0 0 1-2.18 2
              A19.79 19.79 0 0 1 3 5.18
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

          (800) 555-4747

        </a>


        <!-- GET CARE NOW -->
        <a
          class="btn btn-primary btn-small"
          href="#contact"
        >
          Get Care Now
        </a>

      </div>


      <!-- MOBILE MENU BUTTON -->
      <button
        class="menu-button"
        type="button"
        aria-label="Open menu"
        :aria-expanded="mobileMenuOpen"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >

        <!-- Menu Icon -->
        <svg
          v-if="!mobileMenuOpen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />

          <path
            d="M4 12H20"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />

          <path
            d="M4 18H20"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>


        <!-- Close Icon -->
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />

          <path
            d="M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>

      </button>

    </div>


    <!-- MOBILE NAVIGATION -->
    <nav
      v-if="mobileMenuOpen"
      class="mobile-nav"
      aria-label="Mobile navigation"
    >

      <a
        href="#services"
        @click="closeMobileMenu"
      >
        Services
      </a>

      <a
        href="#about"
        @click="closeMobileMenu"
      >
        About
      </a>

      <a
        href="#facilities"
        @click="closeMobileMenu"
      >
        Facilities
      </a>

      <a
        href="#team"
        @click="closeMobileMenu"
      >
        Team
      </a>

      <a
        href="#contact"
        @click="closeMobileMenu"
      >
        Contact
      </a>

      <a
        class="btn btn-primary"
        href="#contact"
        @click="closeMobileMenu"
      >
        Get Care Now
      </a>

    </nav>

  </header>
</template>


<style scoped>

/* ========================================
   NAVBAR
======================================== */

.navbar {
  position: sticky;

  top: 0;

  z-index: 1000;

  width: 100%;

  background: #ffffff;

  border-bottom: 1px solid #e8e8e8;
}


/* ========================================
   CONTAINER
======================================== */

.container {
  width: 100%;

  max-width: 1200px;

  margin: 0 auto;

  padding: 0 24px;
}


/* ========================================
   NAV WRAP
======================================== */

.nav-wrap {
  height: 76px;

  display: flex;

  align-items: center;
}


/* ========================================
   BRAND / LOGO
======================================== */

.brand {
  display: flex;

  align-items: center;

  flex-shrink: 0;

  text-decoration: none;
}

.brand img {
  width: 145px;

  height: auto;

  display: block;
}


/* ========================================
   DESKTOP NAV
======================================== */

.desktop-nav {
  display: flex;

  align-items: center;

  gap: 34px;

  margin-left: auto;

  margin-right: 45px;
}

.desktop-nav a {
  color: #1a3575;

  font-size: 15px;

  font-weight: 400;

  text-decoration: none;

  transition: color 0.2s ease;
}

.desktop-nav a:hover {
  color: #173779;
}


/* ========================================
   NAV ACTIONS
======================================== */

.nav-actions {
  display: flex;

  align-items: center;

  gap: 18px;

  flex-shrink: 0;
}


/* ========================================
   PHONE LINK
======================================== */

.phone-link {
  display: flex;

  align-items: center;

  gap: 7px;

  color: #062b75;

  font-size: 15px;

  font-weight: 600;

  text-decoration: none;

  white-space: nowrap;

  transition: color 0.2s ease;
}

.phone-link:hover {
  color: #173779;
}

.phone-icon {
  flex-shrink: 0;
}


/* ========================================
   BUTTON
======================================== */

.btn {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  border-radius: 6px;

  text-decoration: none;

  font-weight: 700;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-primary {
  background: #173779;

  color: #ffffff;
}

.btn-primary:hover {
  background: #102d64;

  transform: translateY(-1px);
}


/* Small desktop button */

.btn-small {
  min-height: 42px;

  padding: 0 18px;

  font-size: 14px;
}


/* ========================================
   MOBILE MENU BUTTON
======================================== */

.menu-button {
  display: none;

  align-items: center;

  justify-content: center;

  width: 42px;

  height: 42px;

  margin-left: auto;

  padding: 0;

  border: none;

  background: transparent;

  color: #173779;

  cursor: pointer;
}


/* ========================================
   MOBILE NAV
======================================== */

.mobile-nav {
  display: none;
}


/* ========================================
   TABLET
======================================== */

@media (max-width: 1050px) {

  .desktop-nav {
    gap: 22px;

    margin-right: 25px;
  }

  .phone-link {
    display: none;
  }

}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 800px) {

  .nav-wrap {
    height: 68px;
  }

  .brand img {
    width: 125px;
  }

  .desktop-nav,
  .nav-actions {
    display: none;
  }

  .menu-button {
    display: flex;
  }


  /* Mobile Navigation */

  .mobile-nav {
    display: flex;

    flex-direction: column;

    gap: 0;

    padding: 10px 24px 25px;

    background: #ffffff;

    border-top: 1px solid #eeeeee;
  }

  .mobile-nav a:not(.btn) {
    padding: 15px 0;

    border-bottom: 1px solid #eeeeee;

    color: #34466b;

    font-size: 16px;

    text-decoration: none;
  }

  .mobile-nav a:not(.btn):hover {
    color: #173779;
  }

  .mobile-nav .btn {
    margin-top: 18px;

    min-height: 46px;

    width: 100%;
  }

}

</style>