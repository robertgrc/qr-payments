import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { SourceReader, PapperBlock } from 'dan-components';
import { AdvTableDemo, AdvFilter } from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function AdvancedTable() {
  const title = brand.name + ' - Table';
  const description = brand.desc;
  const docSrc = 'containers/Tables/demos/';
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
      <PapperBlock whiteBg icon="ion-ios-clipboard-outline" title="Tabla de Usuarios" desc="Descripcion de Usuarios y Estados de sus aportes">
        <div>
          <AdvFilter />
          {/* <SourceReader componentName={docSrc + 'AdvFilter.js'} /> */}
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(AdvancedTable);
