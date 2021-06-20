import {$} from '@core/DOM';

export const resizeHandler = (e, $table) => {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const isTypeCol = type === 'col';
  const sidePropSize = isTypeCol ? 'height' : 'width';
  const sidePropPosition = isTypeCol ? 'right' : 'bottom';
  let value; // новое значение ширины или высоты

  const mouseMove = isTypeCol // определяем функцию, которая будет рассчитывать value 
    ? (event) => {
      const delta = event.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'});
    } 
    : (event) => {
      const delta = event.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    };

  $resizer.css({
    opacity: 1,
    [sidePropSize]: isTypeCol ? '100vh' : '100vw',
  });

  document.onmousemove = (event) => {
    event.preventDefault();

    mouseMove(event);
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    switch (type) {
      case 'col':
        $table.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
        break;
      case 'row':
        $parent.css({height: value + 'px'});
        break;
    }

    $resizer.css({
      opacity: 0,
      [sidePropSize]: '',
      [sidePropPosition]: 0,
    });
  };
};
