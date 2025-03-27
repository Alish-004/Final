import React from 'react';

const VehicleRentalSystem = () => {
  return (
    <div style={styles.app}>
      <Header />
      <Home />
      <AboutUs />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.headerTitle}>Vehicle Rental System</h1>
      <nav style={styles.nav}>
        <a href="#home" style={styles.navLink}>Home</a>
        <a href="#about" style={styles.navLink}>About Us</a>
        <a href="#rent" style={styles.navLink}>Rent a Vehicle</a>
        <a href="#contact" style={styles.navLink}>Contact Us</a>
      </nav>
    </header>
  );
};

const Home = () => {
  return (
    <section id="home" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Welcome to Vehicle Rental</h2>
        <p style={styles.sectionText}>
          Your one-stop solution for renting cars, bikes, and trucks. Explore our wide range of vehicles to suit your needs. Enjoy seamless and affordable rentals for every journey.
        </p>
        <button style={styles.button}>Rent Now</button>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>About Us</h2>
        <p style={styles.sectionText}>
          Welcome to our vehicle rental service! We are a premier vehicle rental company committed to providing you with top-notch vehicles for all your travel needs.
          Whether you need a car for a weekend getaway, a bike for a quick city commute, or a truck for moving, we've got you covered.
        </p>
        <p style={styles.sectionText}>
          Our mission is to offer affordable, reliable, and convenient rental solutions to individuals and businesses alike. With a wide range of vehicles and
          exceptional customer service, we strive to make every journey a memorable one.
        </p>
        <p style={styles.sectionText}>
          Why choose us? Our fleet is regularly serviced and updated to ensure safety and comfort. We also provide flexible rental options and competitive pricing
          to suit your budget.
        </p>
        <h3 style={styles.subTitle}>Our History</h3>
        <p style={styles.sectionText}>
          Founded in 2010, Vehicle Rental System started as a small local business with just a handful of cars. Over the years, we have grown into a trusted name in the
          vehicle rental industry, expanding our fleet and services to meet the growing demands of our customers.
        </p>
        <h3 style={styles.subTitle}>Our Team</h3>
        <p style={styles.sectionText}>
          Our team consists of experienced professionals who are passionate about providing the best rental experience. From customer service representatives to
          maintenance staff, everyone at Vehicle Rental System is dedicated to ensuring your satisfaction.
        </p>
        <h3 style={styles.subTitle}>Our Values</h3>
        <p style={styles.sectionText}>
          At Vehicle Rental System, we value transparency, integrity, and customer satisfaction above all else. We believe in building long-term relationships with our
          customers by offering reliable services and maintaining the highest standards of professionalism.
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>© 2023 Vehicle Rental System. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  header: {
    backgroundColor: '#004aad',
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  headerTitle: {
    margin: '0',
    fontSize: '2rem',
  },
  nav: {
    marginTop: '10px',
  },
  navLink: {
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  section: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionTitle: {
    color: '#004aad',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  subTitle: {
    color: '#004aad',
    fontSize: '1.5rem',
    marginTop: '30px',
    marginBottom: '10px',
  },
  sectionText: {
    color: '#555',
    lineHeight: '1.6',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#004aad',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: '#004aad',
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  footerText: {
    margin: '0',
    fontSize: '0.9rem',
  },
};

export default AboutUs;