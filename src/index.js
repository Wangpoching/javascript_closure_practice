// 題目說明請參考：
// https://github.com/Lidemy/mentor-program-4th/issues/16
export class Robot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getCurrentPosition() {
    return { x: this.x, y: this.y };
  }
  go(dir) {
    switch (dir) {
      case "N":
        this.y += 1;
        break;
      case "S":
        this.y -= 1;
        break;
      case "E":
        this.x += 1;
        break;
      case "W":
        this.x -= 1;
        break;
      default:
        this.x = this.x;
        this.y = this.y;
    }
  }
}

export function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export function memoize(fn) {
  let result = {};
  return function (num) {
    if (num in result) {
      return result[num];
    }
    result[num] = fn(num);
    return result[num];
  };
}
