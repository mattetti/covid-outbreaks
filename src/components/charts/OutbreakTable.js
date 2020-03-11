import React from 'react'

import formatNumber from '../../utils/formatNumber'

import './OutbreakTable.css'

const OutbreakTable = ({entry, allDates}) => {
  let reversedDates = [...allDates]
  reversedDates.reverse()

  if (entry.counts.deaths) {
    return (
      <div className='OutbreakTable'>
        <div className='OutbreakTable-values' >
          {reversedDates.map((date, index)=> (
            <div key={date} className='row'>
              <div className='date'>{date}</div>
              <div className='cases'>{formatNumber(entry.counts.cases[date])}</div>
              <div className='deaths'>{formatNumber(entry.counts.deaths[date])}</div>
            </div>
          ))}
        </div>
        <div className='OutbreakTable-headers'>
          <div className='row'>
            <div className='date'>Date</div>
            <div className='cases'>Cases</div>
            <div className='deaths'>Deaths</div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default OutbreakTable
