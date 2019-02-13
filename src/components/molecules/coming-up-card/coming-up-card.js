import React from 'react';

import Subtitle from '../../ui/typography/subtitle/subtitle';
import styled from 'styled-components';

const PaddedContent = styled.div`
  padding-bottom: 10px;
  text-decoration: none !important;
`;

const CardLink = styled.a`
  position: absolute;
  @media only screen and (max-width: 768px) {
    right: -70%;
  }

  @media only screen and (min-width: 1300px) {
    right: -70%;
  }

  right: -50%;
  bottom: 2%;
`

const Card = styled.div`
  border-radius: 4px;
`

const CardImage = styled.img`
  border-radius: 4px;
`

// const CourseCard = ({ id, type, courseTitle, courseDescription, courseImage, imageAltText, courseTeacher, slug }) => (
const ComingUpCard = ({ id, node }) => (
  <Card id={ id } className="card match" data-filter={JSON.stringify(node)} data-type={ node.type }>
      <div className="card-image">
        <figure className="image is-4by3">
          <CardImage src={ node.image } alt={ node.alt } />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          {/* <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder " />
            </figure>
          </div> */}
          <div className="media-content">
            <p className="title is-4">{node.title}</p>
            {node.facilitator !== null && (<Subtitle>Facilitator: {node.facilitator}</Subtitle>)}
          </div>
        </div>

        <PaddedContent className="content">
          <p>{node.shortDescription}</p>
        </PaddedContent>
          {/* {
            check(tags)
          } */}
        <CardLink className="button is-primary" href={`/${node.page.replace('coming-up-', 'coming-up/')}/${node.slug}`}>Read More</CardLink>
      </div>
  </Card>
)

export default ComingUpCard
