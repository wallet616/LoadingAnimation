# LoadingAnimation

A JavaScript library that allows you to add fancy looking loading animation to any html element.

### Prerequisites

The library does require `jQuery`.

### Installing

`Add` downloaded version of `LoadingAnimation` library.

```
<script src="LoadingAnimation.js"></script>
```

Everything is ready.

### Usage

The `constructor` doesnt not accept any elements, all options are provided in `.init()` method.

Basic call can be achieved by typing in a `<script>` section or `.js` file:

```
var example_1 = new LoadingAnimation();
example_1.init({
    // Elements ID or class.
    element: "#example_1"
});
example_1.start();
```

However, it is strongly recommended to customise all the available options.

This example shows all avaliable options:

```
var example_2 = new LoadingAnimation();
example_2.init({
    // Elements ID.
    element: "#example_2",

    // Where in the element animation part should be added.
    mode: "prepend",

    // Size of the loadnig animation [px].
    size: 100
});
example_2.start();
```

Examples of method usage:

```
// Stops playing the animation.
example_2.stop();

// Starts playing the animation.
example_2.start();

// Stop playing animation and remove the element from DOM.
example_2.remove();
```

Since the content of element fixed sized there is no need to assign `reload` method on viewport size change.

**For more examples of custiomisation options and usage of methods see the [example.html](example.html) file.**

### Known issues

* Size is always set to 50px.

#### Versioning and changelog

* v. 1.0
  * Creation of project and developing basic functions.
  * Added basic options and methods support.

#### Authors

* **Piotr Bartela** - _Creator_ - [wallet616](https://github.com/wallet616)

#### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
