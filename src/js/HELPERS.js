export const qq = {
  random(min, max) {
    const result = Math.ceil(Math.random() * (max - min) + min);
    return result;
  },

  rgb() {
    return `rgb(${this.random(0, 255)},${this.random(0, 255)},${this.random(0, 255)})`;
  },
  palitra(length) {
    const result = [];
    for (let i = 0; i <= length; i += 1) {
      result.push({ rgb: [this.random(0, 255), this.random(0, 255), this.random(0, 255)] });
    }
    return result;
  },

  setLS(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  },

  getLS(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  },
  clearLS() {
    localStorage.clear();
  },
};
