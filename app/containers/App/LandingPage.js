import React from 'react';
import {
  Banner,
  Feature,
  Showcase,
  Testimonials,
  Technology,
  Pricing,
  Contact
} from 'dan-components';

import Corporate from '../Templates/Corporate';

class LandingPage extends React.Component {
  render() {
    return (
      <Corporate>
        <section id="banner">
          <Banner />
        </section>
        <section id="feature">
          <Feature />
        </section>
        <section id="showcase">
          <Showcase />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="tech">
          <Technology />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </Corporate>
    );
  }
}

export default LandingPage;
