class DOM {
  constructor(selector) {
    this.$nativeElement =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }

    return this.$nativeElement.outerHTML.trim();
  }

  text(text) {
    if (text !== undefined) {
      this.$nativeElement.textContent = text;
      return this;
    }

    if (this.$nativeElement.tagName === 'INPUT') {
      return this.$nativeElement.value.trim();
    }

    return this.$nativeElement.textContent.trim();
  }

  attr(name, value) {
    if (value) {
      this.$nativeElement.setAttribute(name, value);
      return this;
    }

    return this.$nativeElement.getAttribute(name);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$nativeElement;
    }

    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }

    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }

  getCoords() {
    return this.$nativeElement.getBoundingClientRect();
  }

  get data() {
    return this.$nativeElement.dataset;
  }

  id(parse) {
    // error MAX_TABLE_COLS or MAX_TABLE_ROS
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }

    return this.data.id;
  }

  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  css(styles = {}) {
    Object.keys(styles).forEach(
      (key) => (this.$nativeElement.style[key] = styles[key])
    );
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$nativeElement.style[s];
      return res;
    }, {});
  }

  focus() {
    this.$nativeElement.focus();
    return this;
  }

  addClass(className) {
    this.$nativeElement.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$nativeElement.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
