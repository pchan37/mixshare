import { checkPropTypes } from 'prop-types';
import React from 'react';

import { PlaylistEditorBody } from '../components';
import { Layout } from '../layout';

const PlaylistEditorPage = (props) => {
  return (
    <Layout>
      <PlaylistEditorBody id={props.location.playlistEditorProps} />
    </Layout>
  );
};

export default PlaylistEditorPage;
