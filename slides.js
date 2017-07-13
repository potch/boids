(function () {

  let currentSlide = 0;
  let slidesOn = false;

  window.addEventListener('keypress', function (e) {
    if (slidesOn) {
      if (e.key === 'ArrowRight') {
        currentSlide++;
        loadSlide();
      }
      if (e.key === 'ArrowLeft') {
        currentSlide--;
        loadSlide();
      }
    }
    if (e.key === 't') {
      currentSlide = 0;
      slidesOn = true;
      loadSlide();
    }
  });

  let slideEl = document.querySelector('.slides');
  function loadSlide() {
    let slide = slides[currentSlide];
    if (!slide) {
      slideEl.classList.remove('show');
      slidesOn = false;
      return;
    }
    if (slide.callback) {
      slide.callback();
    }
    if (slide.content) {
      slideEl.innerHTML = slide.content;
      slideEl.classList.add('show');
    } else {
      slideEl.classList.remove('show');
    }
  }

  let slides = [
    {
      content: '<h1>Boids!</h1>',
      callback: function () {
        config.count = 1;
        config.gravity.active = false;
        config.repulse.active = false;
        config.flock.active = false;
        config.rubber.active = false;
        boids = [new Boid({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          m: 10,
          s: 20
        })];
      }
    },
    {
      content: `What's a boid?`
    },
    {
      content: `This is a boid.<br>&darr;`
    },
    {},
    {
      content: `
        Boid is short for
        <h3>&ldquo;bird-oid object&rdquo;</h3>
      `
    },
    {
      content: `<img src='http://www.red3d.com/cwr/images/Craig_Facebook_300x300.jpg'><br>&uarr;<br>Craig Reynolds`
    },
    {
      content: `<small style="font-size:.5em">Reynolds, Craig (1987). &ldquo;Flocks, herds and schools: A distributed behavioral model.&rdquo;. <i>SIGGRAPH '87: Proceedings of the 14th annual conference on Computer graphics and interactive techniques</i>.</small>`
    },
    {
      content: `<small style="font-size:.5em">Returns, Batman (1992). &ldquo;A bunch of bats: simulating a swarm of them.&rdquo;. <i>Warner Brothers Studios, a definitely legitimate publication</i>`
    },
    {
      content: `<h2>Simple rules; complex behavior</h2>`
    },
    {},
    {
      callback: function () {
        config.count+=10;
      }
    },
    {
      callback: function () {
        config.gravity.active = true;
      },
      content: `Attraction`
    },
    {
      content: `<code>G&times;m<sub>1</sub>&times;m<sub>2</sub>/r<sup>2</sup></code>`
    },
    {
      callback: function () {
        config.gravity.active = false;
        config.repulse.active = true;
      },
      content: `Repulsion`
    },
    {
      content: `<code>k/d</code>`
    },
    {
      callback: function () {
        config.gravity.active = true;
        config.repulse.active = true;
      },
      content: 'Both!'
    },
    {
      content: 'Friction',
      callback: function () {
        config.gravity.threshold = 100;
        config.repulse.strength = 90;
      }
    },
    {
      content: `<code>v<sub>f</sub>=v&times;C<sub>f</sub></code>`
    },
    {
      content: 'Friction (low)',
      callback: function () {
        config.friction = 5;
      }
    },
    {
      content: 'Friction (high)',
      callback: function () {
        config.friction = 90;
      }
    },
    {
      callback: function () {
        config.flock.active = true;
        config.gravity.threshold = 200;
        config.repulse.strength = 80;
        config.friction = 70;
      },
      content: 'Flocking'
    },
    {
      callback: function () {
        config.count += 30;
      },
      content: 'Flocking'
    },
    {
      content: `<code>&theta;<sub><i>avg</i></sub></code>`
    },
    {
      callback: function () {
        menu.show();
        boids.shift();
        setTimeout(function () {
          currentSlide++;
          loadSlide();
          menu.hide();
        }, 4000);
      },
      content: `<h2>Play Time!</h2><small>&larr; open the menu with 'm'</small>`
    }
  ];

})();
