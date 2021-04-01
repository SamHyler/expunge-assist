import React, { useEffect } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core';

import AffirmationComponent from 'components/AffirmationComponent';
import Header from 'components/Header';
import Form from 'components/Form';
import FormHeader from 'components/FormHeader';
import Landing from 'pages/Landing';

import { RoutingContext } from 'contexts/RoutingContext';
import { AffirmationContext } from 'contexts/AffirmationContext';

interface styleProps {
  isLandingPage: boolean;
}

const useStyles = makeStyles<Theme, styleProps>(() =>
  createStyles({
    root: {
      background: (props) => (props.isLandingPage ? '#9903ff' : 'white'),
      color: (props) => (props.isLandingPage ? 'white' : '#131313'),
      padding: '18px',
      display: 'flex',
      flex: '1 0 auto',
      flexDirection: 'column',
    },
  })
);

interface PageProps {
  match: {
    params: {
      page: string;
    };
    path: string;
  };
}

const PageContainer = ({ match }: PageProps) => {
  const useRoutingContext = () => React.useContext(RoutingContext);
  const useAffirmationContext = () => React.useContext(AffirmationContext);

  const { pageNumber, goNextPage, goBackPage } = useRoutingContext();
  const { affirmationData, updateAffirmationData } = useAffirmationContext();
  const isLandingPage = pageNumber === 0;

  const styleProps = { isLandingPage };
  const classes = useStyles(styleProps);

  console.log(affirmationData.isActive);

  useEffect(() => {
    // handle closing the affirmation on home page
    if (match.path === '/') updateAffirmationData({ isActive: false });
  }, [match]);

  return (
    <div className={`${classes.root} page-container`}>
      <Header pageNumber={pageNumber} />

      <AffirmationComponent
        buttonText={affirmationData.buttonText}
        titleText={affirmationData.titleText}
        description={affirmationData.description}
        isActive={affirmationData.isActive}
        onChangeAffirmation={updateAffirmationData}
      />

      {isLandingPage && <Landing goNextPage={goNextPage} />}

      {!affirmationData.isActive && !isLandingPage && (
        <>
          <FormHeader pageNumber={pageNumber} />
          <Form
            pageNumber={pageNumber}
            goNextPage={goNextPage}
            goBackPage={goBackPage}
            onChangeAffirmation={updateAffirmationData}
          />
        </>
      )}
    </div>
  );
};

export default PageContainer;
