import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/authprovider'

const Home = (props) => {

  const {handleSignout,} = useContext(firebaseAuth)
  return (
    <div>
      <p> Checking</p>
    </div>
  );
};

export default Home;