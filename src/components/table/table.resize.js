import {$} from '@core/DOM';

// определяем функцию, которая будет рассчитывать value и delta
// в зависимости от типа ячейки
const move = (isTypeCol) => isTypeCol
  ? (event, coords) => {
    const delta = event.pageX - coords.right;

    return {
      val: coords.width + delta,
      css: {right: -delta + 'px'},
    };
  } 
  : (event, coords) => {
    const delta = event.pageY - coords.bottom;

    return {
      val: coords.height + delta,
      css: {bottom: -delta + 'px'},
    };
  };

export const resizeHandler = (e, $table) => {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const isTypeCol = type === 'col';
  const sidePropSize = isTypeCol ? 'height' : 'width';
  const sidePropPosition = isTypeCol ? 'right' : 'bottom';
  const mouseMove = move(isTypeCol);
  let value; // новое значение ширины или высоты

  $resizer.css({
    opacity: 1,
    [sidePropSize]: isTypeCol ? '100vh' : '100vw',
  });

  document.onmousemove = (event) => {
    event.preventDefault();

    const {val, css} = mouseMove(event, coords);

    value = val;

    $resizer.css(css);
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
