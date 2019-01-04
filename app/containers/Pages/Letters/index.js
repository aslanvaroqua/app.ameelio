import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, SimpleAccordion, SearchInmateForm } from 'dan-components';

const accordionContent = [
  { heading: '1. Search', content: 'Find any prisoner in the U.S. using our nationwide inmate databse.' },
  { heading: '2. Compose', content: 'Simply type and attach photos.' },
  { heading: '3. Send', content: 'We convert each letter into physical mail, and ship it using a trsuted partner.' },
  { heading: '4. Receive', content: 'We include a pre-addressed return envelope in each letter we mail.' },
];

class Letters extends React.Component {
  render() {
    const title = brand.name + ' - Letters';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="SEND LETTERS AND PHOTOS" desc="" icon="ios-mail-outline">
          At any given time, 1.5 million inmates are living in remote prisons across the
          country. Due to restricted internet access and costly phone services physical
          mail remains a key source of connection for inmates. With Courier, you can send
          letters and photos right from your computer and smartphone.
        </PapperBlock>
        <PapperBlock title="Connect with inmates with four easy steps." desc="" icon="">
          <SimpleAccordion content={accordionContent} />
        </PapperBlock>
        <PapperBlock title="Search inmate" desc="" icon="">
          <SearchInmateForm />
        </PapperBlock>
      </div>
    );
  }
}

export default Letters;
