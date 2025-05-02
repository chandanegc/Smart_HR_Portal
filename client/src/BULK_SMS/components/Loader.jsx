import React, { useState } from 'react';
import { Loader, Button } from 'rsuite';

const LoaderComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoader = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div>
      <Button onClick={toggleLoader}>{isLoading ? 'Hide Loader' : 'Show Loader'}</Button>

      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <Loader size="lg" content="Loading..." />
            <Button
              onClick={toggleLoader}
              style={{
                marginTop: 20,
                backgroundColor: '#ff4d4f',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderComponent;
