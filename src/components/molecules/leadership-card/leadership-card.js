import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  // @media only screen and (max-width: 768px) {
  //   width: 50%;
  // }

  box-shadow: none;
  flex: 1;
  margin-bottom: 2rem;
  // position: relative;
`

const CardLink = styled.a`
  position: absolute;
  // @media only screen and (max-width: 768px) {
  //   right: -50%;
  // }

  // @media only screen and (min-width: 1300px) {
  //   right: -70%;
  // }

  left: 10%;
  bottom: 2%;
`

const PaddedContent = styled.div`
  // height: 250px;
  padding-bottom: 1rem;
  position: relative;
  overflow: hidden;
  text-decoration: none !important;
`;

const ImageContainer = styled.div`
  overflow: hidden;
`

const PersonImage = styled.img`
  border-radius: 4px;
  display: block;
  filter: saturate(60%);
  margin: 0 auto;
  width: 100%;
  // transition: filter .3s ease-in-out;
  transition: all .3s ease-in-out;

  &:hover {
    filter: saturate(100%);
    transition: all .3s ease-in-out;
    transform: scale(1.1);
  }
`

// const ButtonDiv = styled.div`
//   position: relative;
// `

// const CourseCard = ({ id, type, courseTitle, courseDescription, courseImage, imageAltText, courseTeacher, slug }) => (
const LeadershipCard = ({ id, type, node }) => (
  <Card id={ id } name={ type } className="card match">
    <ImageContainer className="card-image">
      {/* <figure className="image is-4by3"> */}
      <figure>
        <PersonImage src={ node.image } alt={ node.alt } />
      </figure>
    </ImageContainer>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{node.fullName}</p>
        </div>
      </div>

      <PaddedContent className="content">
        <p>{node.shortDescription}</p>
      </PaddedContent>
    </div>
    {/* <ButtonDiv> */}
      <CardLink className="button is-primary" href={`/${node.page}/${node.slug}`}>Read More</CardLink>
    {/* </ButtonDiv> */}
  </Card>
)

export default LeadershipCard
