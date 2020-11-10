const fixDevice = () => {
  const ua = navigator.userAgent;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  if (!android && !iphone && !ipad) {
    return;
  }
  const head = document.getElementsByTagName('head')[0];
  const meta = document.createElement('meta');
  const container = document.body.firstElementChild;
  const myContainer = document.querySelector('.my-container');
  const customStyle = document.querySelector('.preview style');
  meta.content = 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,shrink-to-fit=no,user-scalable=no';
  meta.name = 'viewport';
  head.appendChild(meta);
  if (customStyle) {
    head.appendChild(customStyle);
  }
  document.body.appendChild(myContainer);
  document.body.removeChild(container);
};

const handleResize = (instance) => {
  const width = document.documentElement.offsetWidth;
  const { device } = instance.state;
  let realDevice = 'desktop';
  if (width < 480) {
    realDevice = 'phone';
  }
  if (width >= 480 && width < 1024) {
    realDevice = 'tablet';
  }
  if (realDevice !== device) {
    instance.setState({
      device: realDevice,
    });
  }
};

export default {
  init:(instance) => {
    handleResize(instance);
    fixDevice();
    window.addEventListener('resize', () => {
      handleResize(instance)
    }, false);
  }
}
