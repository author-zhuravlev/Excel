export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  selected($el) {
    this.clear();
    this.current = $el;
    $el
        .focus()
        .addClass(TableSelection.className);

    this.group.push($el);
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group.length = 0;
  }

  selectedGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }
}
