'use client';

import React, { useMemo } from 'react';
import { Event, Club } from '@/types';
import { formatEventTime } from '@/utils/dateUtils';

interface EventCardProps {
  event: Event;
  club: Club;
  onClick?: () => void;
  theme?: 'light' | 'dark';
}

const EventCard: React.FC<EventCardProps> = React.memo(({ event, club, onClick, theme = 'light' }) => {
  // Attempt to derive ordering weight from time for future sorting (not used yet here directly)
  const timeDisplay = useMemo(() => formatEventTime(event.time), [event.time]);

  const isLight = theme === 'light';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full flex items-center text-[11px] leading-tight cursor-pointer select-none rounded-sm min-h-[16px] hover:brightness-105 transition ${isLight ? 'text-gray-800' : 'text-gray-200'} ${event.isSacPriority ? 'ring-1 ring-yellow-400 ring-opacity-50' : ''}`}
  title={`${event.title}${event.time ? ` - ${event.time}` : ''}${event.location ? ` @ ${event.location}` : ''}${event.description ? `\n${event.description}` : ''}${event.isSacPriority ? '\n⭐ SAC Priority Event' : ''}`}
      style={{ 
        backgroundColor: event.isSacPriority ? `${club.color}55` : `${club.color}33`, // Higher opacity for SAC priority
        paddingLeft: '0px',
        paddingRight: '4px',
        paddingTop: '2px',
        paddingBottom: '2px'
      }}
    >
      {event.isSacPriority && (
        <span className="text-[10px] mr-1">⭐</span>
      )}
      <span className={`truncate flex-1 font-medium ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>{event.title}</span>
      {timeDisplay && (
        <span className={`ml-2 text-[10px] tabular-nums ${isLight ? 'text-gray-500' : 'text-gray-300'}`}>
          {timeDisplay}
        </span>
      )}
    </button>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;