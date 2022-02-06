import styled from 'styled-components';

export const Styles = styled.div`
  .carousel-container {
    margin: 20px;
  }

  .selected-image {
    width: 100%;
    height: 300px;
    margin-bottom: 8px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .carousel {
    position: relative;
  }

  .carousel__images {
    display: flex;
    max-width: 100%;
    overflow-x: hidden;
  }

  .carousel__image-selected {
    border: 1px solid #ffa700 !important;
    border-radius: 2px;
  }

  .carousel__image {
    margin-right: 10px;
    height: 50px;
    min-width: 50px;
    border: 3px solid #ffa70000;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  /* .carousel__button {
    position: absolute;
    top: 40%;
  }

  .carousel__button-left {
    left: 10px;
  }

  .carousel__button-right {
    right: 10px;
  } */
`;
