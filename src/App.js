import React from 'react';

import Header from './container/Header/Header';

function App(props) {
  return (
    <div className="wrapper">
      <Header />
      {props.children}
    </div>
  );
}

export default App;
