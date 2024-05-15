import React from 'react';

function Thead({ text ,className}) {
  return (
    <thead className='border border-blue-20 bg-blue-400  table-fixed'>
      <tr>
        {text.map((text, index) => {
          return <th className={className} key={index}>{text}</th>;
        })}
      </tr>
    </thead>
  );
}

export default Thead;
