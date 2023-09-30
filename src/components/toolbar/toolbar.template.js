const getButtons = (state) => {
  const activeBold = state.fontWeight === 'bold';
  const activeItalic = state.fontStyle === 'italic';
  const activeUnderline = state.textDecoration === 'underline';

  return [
    { 
      icon: 'format_align_left',
      active: state.textAlign === 'left',
      value: { textAlign: 'left' },
    },
    { 
      icon: 'format_align_center',
      active: state.textAlign === 'center',
      value: {textAlign: 'center'},
    },
    { 
      icon: 'format_align_right',
      active: state.textAlign === 'right',
      value: {textAlign: 'right'},
    },
    { 
      icon: 'format_bold',
      active: activeBold,
      value: {
        fontWeight: activeBold ? 'normal' : 'bold',
      },
    },
    { 
      icon: 'format_italic',
      active: activeItalic,
      value: {
        fontStyle: activeItalic ? 'normal' : 'italic',
      },
    },
    { 
      icon: 'format_underlined',
      active: activeUnderline,
      value: {
        textDecoration: activeUnderline ? 'none' : 'underline',
      },
    },
  ];
};

const toButton = (button) => {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;

  return `
    <div
      class="button${button.active ? ' active' : ''}"
      ${meta}
    >
      <i
        class="material-icons"
        ${meta}
      >
        ${button.icon}
      </i>
    </div>
  `;
};

export const createToolbar = (state) => 
  getButtons(state).map(toButton).join('');
