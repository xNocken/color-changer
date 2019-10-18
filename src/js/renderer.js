import $ from 'jquery';

export const changeColor = (rgb) => {
  const { r, g, b } = rgb;

  $('body').css({
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  });
};

export default () => {

};
