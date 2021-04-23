import { Row } from '@freecodecamp/react-bootstrap';
import CalendarHeatMap from '@freecodecamp/react-calendar-heatmap';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import isEqual from 'date-fns/isEqual';
import startOfDay from 'date-fns/startOfDay';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

import envData from '../../../../../config/env.json';
import { langCodes } from '../../../../../config/i18n/all-langs';
import FullWidthRow from '../../helpers/FullWidthRow';
import Spacer from '../../helpers/Spacer';

import '@freecodecamp/react-calendar-heatmap/dist/styles.css';
import './heatmap.css';

const { clientLocale } = envData;

const localeCode = langCodes[clientLocale];

const propTypes = {
  calendar: PropTypes.object
};

const innerPropTypes = {
  calendarData: PropTypes.array,
  currentStreak: PropTypes.number,
  longestStreak: PropTypes.number,
  pages: PropTypes.array,
  points: PropTypes.number,
  t: PropTypes.func.isRequired
};

class HeatMapInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: this.props.pages.length - 1
    };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  prevPage() {
    this.setState(
      {
        pageIndex: this.state.pageIndex - 1
      },
      () => ReactTooltip.rebuild()
    );
  }

  nextPage() {
    this.setState(
      {
        pageIndex: this.state.pageIndex + 1
      },
      () => ReactTooltip.rebuild()
    );
  }

  render() {
    const { calendarData, currentStreak, longestStreak, pages, t } = this.props;
    const { startOfCalendar, endOfCalendar } = pages[this.state.pageIndex];
    const title = `${startOfCalendar.toLocaleDateString([localeCode, 'en-US'], {
      year: 'numeric',
      month: 'short'
    })} - ${endOfCalendar.toLocaleDateString([localeCode, 'en-US'], {
      year: 'numeric',
      month: 'short'
    })}`;
    const dataToDisplay = calendarData.filter(
      data => data.date >= startOfCalendar && data.date <= endOfCalendar
    );

    return (
      <FullWidthRow>
        <Row className='heatmap-nav'>
          <button
            className='heatmap-nav-btn'
            disabled={!pages[this.state.pageIndex - 1]}
            onClick={this.prevPage}
            style={{
              visibility: pages[this.state.pageIndex - 1] ? 'unset' : 'hidden'
            }}
          >
            &lt;
          </button>
          <span>{title}</span>
          <button
            className='heatmap-nav-btn'
            disabled={!pages[this.state.pageIndex + 1]}
            onClick={this.nextPage}
            style={{
              visibility: pages[this.state.pageIndex + 1] ? 'unset' : 'hidden'
            }}
          >
            &gt;
          </button>
        </Row>
        <Spacer />

        <CalendarHeatMap
          classForValue={value => {
            if (!value || value.count < 1) return 'color-empty';
            if (value.count < 4) return 'color-scale-1';
            if (value.count < 8) return 'color-scale-2';
            if (value.count >= 8) return 'color-scale-a-lot';
            return 'color-empty';
          }}
          endDate={endOfCalendar}
          startDate={startOfCalendar}
          tooltipDataAttrs={value => {
            const dateFormatted =
              value && value.date
                ? value.date.toLocaleDateString([localeCode, 'en-US'], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : '';
            return {
              'data-tip':
                value && value.count > -1
                  ? t('profile.points', {
                      count: value.count,
                      date: dateFormatted
                    })
                  : ''
            };
          }}
          values={dataToDisplay}
        />
        <ReactTooltip className='react-tooltip' effect='solid' html={true} />

        <Spacer />
        <Row>
          <div className='streak-container'>
            <span className='streak' data-testid='longest-streak'>
              <b>{t('profile.longest-streak')}</b> {longestStreak || 0}
            </span>
            <span className='streak' data-testid='current-streak'>
              <b>{t('profile.current-streak')}</b> {currentStreak || 0}
            </span>
          </div>
        </Row>
        <hr />
      </FullWidthRow>
    );
  }
}

HeatMapInner.propTypes = innerPropTypes;

const HeatMap = props => {
  const { t } = useTranslation();
  const { calendar } = props;

  /**
   *  the following logic creates the data for the heatmap
   *  from the users calendar and calculates their streaks
   */

  // create array of timestamps and turn into milliseconds
  const timestamps = Object.keys(calendar).map(stamp => stamp * 1000);
  const startOfTimestamps = startOfDay(new Date(timestamps[0]));
  let endOfCalendar = startOfDay(Date.now());
  let startOfCalendar;

  // creates pages for heatmap
  let pages = [];

  do {
    startOfCalendar = addDays(addMonths(endOfCalendar, -6), 1);

    const newPage = {
      startOfCalendar: startOfCalendar,
      endOfCalendar: endOfCalendar
    };

    pages.push(newPage);

    endOfCalendar = addDays(startOfCalendar, -1);
  } while (startOfTimestamps < startOfCalendar);

  pages.reverse();

  let calendarData = [];
  let dayCounter = pages[0].startOfCalendar;

  // create an object for each day of the calendar period
  while (dayCounter <= pages[pages.length - 1].endOfCalendar) {
    // this is the format needed for react-calendar-heatmap
    const newDay = {
      date: startOfDay(dayCounter),
      count: 0
    };

    calendarData.push(newDay);
    dayCounter = addDays(dayCounter, 1);
  }

  let longestStreak = 0;
  let currentStreak = 0;
  let lastIndex = -1;

  // add a point to each day with a completed timestamp and calculate streaks
  timestamps.forEach(stamp => {
    const index = calendarData.findIndex(day =>
      isEqual(day.date, startOfDay(stamp))
    );

    if (index >= 0) {
      // add one point for today
      calendarData[index].count++;

      // if timestamp is on a new day, deal with streaks
      if (index !== lastIndex) {
        // if yesterday has points
        if (calendarData[index - 1] && calendarData[index - 1].count > 0) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }

      lastIndex = index;
    }
  });

  // if today has no points
  if (
    calendarData[calendarData.length - 1] &&
    calendarData[calendarData.length - 1].count === 0
  ) {
    currentStreak = 0;
  }

  return (
    <HeatMapInner
      calendarData={calendarData}
      currentStreak={currentStreak}
      longestStreak={longestStreak}
      pages={pages}
      t={t}
    />
  );
};

HeatMap.displayName = 'HeatMap';
HeatMap.propTypes = propTypes;

export default HeatMap;
