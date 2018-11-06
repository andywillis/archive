const bodyParts = {

  width: 6,

  frame(ctx) {
    ctx.beginPath();
    ctx.moveTo(75, 20);
    ctx.lineTo(75, 130);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(55, 130);
    ctx.lineTo(95, 130);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(75, 20);
    ctx.lineTo(175, 20);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  },

  noose(ctx) {

    ctx.beginPath();
    ctx.moveTo(175, 20);
    ctx.lineTo(175, 40);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

  },

  head(ctx) {
    ctx.beginPath();
    ctx.arc(175, 50, 10, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  },

  body(ctx) {
    ctx.beginPath();
    ctx.moveTo(175, 60);
    ctx.lineTo(175, 85);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  },

  arm(ctx, side = 'left') {
    ctx.beginPath();
    ctx.moveTo(175, 60);
    ctx.lineTo(side === 'left' ? 155 : 195, 75);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  },

  leg(ctx, side = 'left') {
    ctx.beginPath();
    ctx.moveTo(175, 85);
    ctx.lineTo(side === 'left' ? 155 : 195, 115);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  },

  leftarm(ctx) {
    this.arm(ctx, 'left');
  },

  rightarm(ctx) {
    this.arm(ctx, 'right');
  },

  leftleg(ctx) {
    this.leg(ctx, 'left');
  },

  rightleg(ctx) {
    this.leg(ctx, 'right');
  }

};

export default bodyParts;
