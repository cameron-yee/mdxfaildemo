import React from 'react';

// import Subtitle from '../../ui/typography/subtitle/subtitle';
// import styled from 'styled-components';

// const Card = styled.div`
//   // box-shadow: none;
//   border-radius: 4px;
//   flex: 1;
//   // margin-bottom: 2rem;
//   // position: relative;
// `

// const PaddedContent = styled.div`
//   padding-bottom: 10px;
//   text-decoration: none !important;
// `;

// const CardLink = styled.a`
//   color: #4c4c4c;

//   &:hover {
//     color: #4c4c4c;
//     text-decoration: none !important;
//   }
// `
// const CardLink = styled.a`
//   position: absolute;
//   @media only screen and (max-width: 768px) {
//     right: -70%;
//   }

//   @media only screen and (min-width: 1300px) {
//     right: -70%;
//   }

//   right: -50%;
//   bottom: 2%;
// `

// const ResourceImage = styled.img`
//   border-top-left-radius: 4px;
//   border-top-right-radius: 4px;
// `

// const CourseCard = ({ id, type, courseTitle, courseDescription, courseImage, imageAltText, courseTeacher, slug }) => (
const ResourceCard = ({ id, node }) => (
  <Card id={ id } className="card match" data-filter={JSON.stringify(node)} data-type={ node.type }>
    {/* <CardLink href={`/${node.page}/${node.slug}`}> */}
      <div className="card-image">
        <figure className="image is-4by3">
          <ResourceImage src={ node.image } alt={ node.alt } />
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
        <CardLink className="button is-primary" href={`/educator-resource-center/${node.slug}`}>Read More</CardLink>
      </div>
    {/* </CardLink> */}
  </Card>
)

export default ResourceCard
