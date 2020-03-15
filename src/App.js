import React from 'react';
import './App.css';
import withSizes from 'react-sizes'
import classNames from 'classnames'

import ViewControls from './components/ViewControls'
import MarkerLegend from './components/MarkerLegend'
import TableView from './components/TableView'

function App({ isMobile, isTablet, isDesktop }) {
  const dataSources = (
    <div className='dataSources'>
      Data from <a target='_blank' rel="noopener noreferrer" href='https://github.com/CSSEGISandData/COVID-19'>John Hopkins University</a>
      {', '}
      { isMobile && <br /> }
      <a target='_blank' rel="noopener noreferrer" href='https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/'>BNO News</a> and other sources.
    </div>
  )

  return (
    <div className="App">
      <header className={classNames('App-header', { mobile: isMobile, tablet: isTablet, desktop: isDesktop })}>
        <h1>
          <img src='covid-128.png' alt='*' className='logo' />
          COVID-19 Outbreaks
        </h1>
        <MarkerLegend />
      </header>

      <div className="App-content">
        {isMobile && dataSources}

        <ViewControls isMobile={isMobile} />

        <TableView isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
      </div>

      <footer className="App-footer">
        {!isMobile && dataSources}
        <div className='credits'>
          Visualization by Sebastián Delmont
          {' • '}
          <a href='https://twitter.com/sd'>@sd</a>
          {' • '}
          <a href='https://github.com/sd/covid-outbreaks'>github</a>
        </div>
      </footer>
    </div>
  );
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 480,
  isTablet: width > 480 && width <= 1024,
  isDesktop: width > 1024
})

export default withSizes(mapSizesToProps)(App);
