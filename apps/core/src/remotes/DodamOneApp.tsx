import React from 'react';

// @ts-expect-error Module Federation remote
const RemoteApp = React.lazy(() => import('dodamOne/App'));

const DodamOneApp = () => <RemoteApp />;

export default DodamOneApp;
