import React from "react";
import { Card, Header, Segment, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const AdvertCard = ({ title, price, images, id, category }) => {
  const history = useHistory();

  return (
    <Card fluid onClick={() => history.push(`/adverts/${id}/`)}>
      <Header as="h1" textAlign="left">
        {title}
      </Header>
      <Header as="h5" textAlign="left">
        Category: {category}
      </Header>
      <Segment vertical>
        <Header as="h3" textAlign="right">
          Price: {price} £
        </Header>
      </Segment>
      <Image src={images} />
    </Card>
  );
};

export default AdvertCard;
