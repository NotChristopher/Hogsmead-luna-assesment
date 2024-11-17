export const getImageByString = (imageKey) => {
    const images = {
      gryffindor : require('../../assets/images/gryffindor.png'),
      ravenclaw: require('../../assets/images/ravenclaw.png'),
      hufflepuff: require('../../assets/images/hufflepuff.png'),
      slytherin: require('../../assets/images/slytherin.png'),
    };
    return images[imageKey] || images.gryffindor;
  };
