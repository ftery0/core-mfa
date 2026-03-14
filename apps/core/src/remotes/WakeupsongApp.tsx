import React from 'react';

// @ts-expect-error Module Federation remote
const RemoteApp = React.lazy(() => import('wakeupsong/App'));

const WakeupsongApp = () => <RemoteApp />;

export default WakeupsongApp;
