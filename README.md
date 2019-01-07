# Stock Photo Picker

A plain-javascript Giphy and Unsplash photo picker.

![Interface](/example/screenshot.png?raw=true "Interface of the stock photo picker.")

### How to use

```
var handler = new StockPhotoPicker({
  unsplash: {
    token: 'UNSPLASH_APPLICATION_ID'
  },
  giphy: {
    token: 'GIPHY_TOKEN'
  }
});

document.getElementById('unsplashButton').addEventListener('click', function (e) {
  handler.open({
    provider: 'unsplash'
  });
  e.preventDefault();
});
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Maxence HENNERON** - *Initial work* - (https://github.com/MaxenceHenneron)

See also the list of [contributors](https://github.com/maxencehenneron/StockPhotoPicker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details