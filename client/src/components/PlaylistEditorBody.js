import React, { useState } from 'react';

import {
  Button,
  Col,
  Container,
  Form,
  Image,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';
import {
  Add,
  ArrowBackIos,
  Check,
  Search,
  Edit,
  HelpOutline,
  Settings,
} from '@material-ui/icons';
import { PlaylistEditItem } from './';

import data from '../placeholders/data';

const SearchPopup = (
  <Popover>
    <Popover.Content className="mr-2">
      <div className="d-flex flex-row mb-3" style={{ alignItems: 'center' }}>
        <Form.Control
          type="text"
          placeholder="Song"
          size="sm"
          className="align-self-top"
        />
        <Button variant="flat" style={{ color: '#979696' }}>
          Go
        </Button>
      </div>
      {data.songs.map((s) => {
        return (
          <div
            key={s.id}
            className="d-flex flex-row"
            style={{ justifyContent: 'space-between' }}>
            <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
              <div id={s.id} className="mb-3" style={{ maxWidth: '3vw' }}>
                <Image
                  fluid
                  src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
                />
              </div>
              <div className="ml-2 align-self-top">
                <p style={{ fontSize: 10 }}>
                  {s.name} <br />
                  by {s.artist}
                </p>
              </div>
            </div>
            <Add style={{ color: '#979696' }} />
          </div>
        );
      })}
    </Popover.Content>
  </Popover>
);

const SettingsPopup = () => {
  const [mixtapeChecked, setMixtapeChecked] = useState(false);
  const [publicChecked, setPublicChecked] = useState(true);

  return (
    <Popover>
      <Popover.Content>
        <Row
          className="d-flex flex-row"
          style={{
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => setMixtapeChecked(!mixtapeChecked)}>
          <Col xs="2" className="mr-2">
            {mixtapeChecked && (
              <Check style={{ color: '#979696', fontSize: 20 }} />
            )}
          </Col>
          <Col>Mixtape Mode</Col>
        </Row>
        <Row
          className="d-flex flex-row"
          style={{ justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setPublicChecked(!publicChecked)}>
          <Col xs="2" className="mr-2">
            {publicChecked && (
              <Check style={{ color: '#979696', fontSize: 20 }} />
            )}
          </Col>
          <Col>Public</Col>
        </Row>
      </Popover.Content>
    </Popover>
  );
};

const PlaylistEditorBody = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <Button variant="flat" href="/playlist">
            <ArrowBackIos
              className="align-self-center"
              style={{ color: '#979696' }}
            />
          </Button>

          <h2>Playlist Editor</h2>
        </div>

        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={SearchPopup}
          trigger="click">
          <Button variant="flat">
            <Search
              className="align-self-center"
              style={{ color: '#979696' }}
            />
          </Button>
        </OverlayTrigger>
      </div>

      <div className="d-flex flex-row mt-3">
        <div className="d-flex flex-row flex-grow-1 ml-4">
          <h5 className="align-self-center">[Playlist Name]</h5>
          <Button variant="flat">
            <Edit className="ml-3" style={{ color: '#979696' }} />
          </Button>
        </div>

        <Button variant="flat">
          <HelpOutline style={{ color: '#979696' }} />
        </Button>
        <OverlayTrigger
          placement="bottom-end"
          delay={{ show: 250, hide: 400 }}
          overlay={SettingsPopup()}
          trigger="click">
          <Button variant="flat">
            <Settings style={{ color: '#979696' }} />
          </Button>
        </OverlayTrigger>
      </div>

      {data.songs.map((s) => {
        return <PlaylistEditItem key={s.id} name={s.name} artist={s.artist} />;
      })}
    </Container>
  );
};

export default PlaylistEditorBody;
