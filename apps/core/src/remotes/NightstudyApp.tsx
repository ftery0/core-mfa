import React from 'react';

// @ts-expect-error Module Federation remote
const RemoteApp = React.lazy(() => import('nightstudy/App'));

const NightstudyApp = () => <RemoteApp />;

export default NightstudyApp;
