export function renderNavBird(

  bird,
  sample

) {

  if (
    !bird ||
    !sample
  ) {
    return;
  }

  bird.dataItem.setAll({

    longitude: sample.longitude,

    latitude: sample.latitude

  });

}