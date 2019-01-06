export default class StockPhotoPicker {
  static helloWorld(sender) {
    const el = document.createElement('div');
    el.classList.add('hello-world');
    el.innerHTML = 'From the widget!';
    sender.appendChild(el);
  }
}
