import React from 'react';
import Axios from 'axios';
import { Button, Form, Popover } from 'react-bootstrap';

const SearchUsersPopup = (props, { getQuery }) => {
  const searchUsers = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    console.log('search Users');
    getQuery(query);
    const gettingResults = await Axios.post('/api/user/searchUsers', {
      query: query,
    });
    //console.log(gettingResults.data);
  };

  return (
    <Popover {...props}>
      <Popover.Content>
        <Form onSubmit={searchUsers}>
          <div className="d-flex flex-row">
            <Form.Control
              name="query"
              className="w-75"
              type="text"
              placeholder="Search Users"
            />
            <Button className="ml-2" variant="flat" type="submit">
              Go
            </Button>
          </div>
        </Form>
      </Popover.Content>
    </Popover>
  );
};

export default SearchUsersPopup;
