import React from 'react';
import General from './General';

const Notification: React.FC = () => {
  return (
    <>
      <div className="by">
        <div className="messenger l1">
          <div className="conversation-list l2">
            <div className="conversation">
              <span className="participant">John Doe</span>    
            </div>
            <div className="conversation">
              <span className=" last-message">Hello!</span>

            </div>
            {/*  d'autres conversations  */}
          </div>
        </div>
      </div>
      <General />
    </>
  );
}

export default Notification;
