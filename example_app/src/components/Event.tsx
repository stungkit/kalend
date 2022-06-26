import React from 'react';

export const Event = (props: any) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <p style={{ fontSize: 11 }}>Normal: {props.summary}</p>
      <p>Nice event</p>
      <h4 style={{ fontSize: 10 }}>This event</h4>
      <button
        onClick={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
          console.log('custom click');
        }}
        style={{
          height: 30,
          width: '100%',
          zIndex: 999999,
        }}
      >
        Button
      </button>
    </div>
  );
};

export const AgendaEvent = (props: any) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        zIndex: 999,
        border: 'solid 1px gray',
        borderRadius: 8,
        padding: 8,
        margin: 4,
      }}
    >
      <h1>Agenda title</h1>
      <p style={{ fontSize: 11 }}>Agenda: {props.summary}</p>
      <p>Nice event</p>
      <div
        style={{ backgroundColor: 'dodgerblue', width: '100%', height: 50 }}
      />
      <button
        onClick={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
          console.log('custom click');
        }}
        style={{ height: 20, width: '100%' }}
      >
        Button
      </button>
    </div>
  );
};

export const MonthEvent = (props: any) => {
  return (
    <div style={{ width: '100%', height: '100%', zIndex: 999 }}>
      <p style={{ fontSize: 11 }}>Month: {props.summary}</p>
    </div>
  );
};
