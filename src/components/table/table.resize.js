import {$} from '@core/DOM';

export const resizeHandler = (e, $el) => {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'height' : 'width';
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: type === 'col' ? '100vh' : '100vw',
  });

  document.onmousemove = (event) => {
    event.preventDefault();
    let delta;
    
    switch (type) {
      case 'col':
        delta = event.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
        break;
      case 'row':
        delta = event.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
        break;
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    switch (type) {
      case 'col':
        $el.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
        break;
      case 'row':
        $parent.css({height: value + 'px'});
        break;
    }

    $resizer.css({
      opacity: 0,
      [type === 'col' ? 'right' : 'bottom']: 0,
      [type === 'col' ? 'height' : 'width']: '',
    });
  };
};
