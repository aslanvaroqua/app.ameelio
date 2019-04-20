import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, SimpleAccordion, SearchInmateForm } from 'dan-components';

import { accordionContent } from './dummyData';

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
       <PapperBlock title="LETTERS" desc="" icon="ios-mail-outline">
          <h2>Connect with inmates with four easy steps.</h2>
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
