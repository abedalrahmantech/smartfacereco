import React from 'react';

const Rank = ({ username }) => {
  return (
    <div>
      <div className='white f3'>
        {`Welcome ${username}!`}
      </div>
      <div className='white f1'>
        {/*'#5'*/}
      </div>
    </div>
  );
}

export default Rank;