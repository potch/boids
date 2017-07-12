const menu = (function () {
  class Menu {

    constructor() {
      this.modal = document.querySelector('.modal');
      this.settings = document.querySelector('.settings');

      function handle(e) {
        let target = e.target;
        let bound = target.getAttribute('data-bound');
        if (bound) {
          let value;
          switch (target.type) {
            case 'checkbox':
              value = !!target.checked;
              break;
            case 'range':
              value = parseFloat(target.value);
              break;
            default:
              value = target.value;
          }
          let prop = bound.split('.');
          let cursor = config;
          for (let i = 0; i < prop.length-1; i++) {
            if (prop[i] in cursor) {
              cursor = cursor[prop[i]]
            } else {
              throw `No property found: ${bound}`;
            }
          }
          cursor[prop[prop.length-1]] = value;
        }
      }

      this.settings.addEventListener('change', handle);
      this.settings.addEventListener('input', handle);
    }

    show () {
      this.render();
      this.modal.classList.add('show');
    }

    hide () {
      this.modal.classList.remove('show');
    }

    render () {
      let menu = d([
        d('label', 'Count',
          d('input', {
            type: 'range',
            min: 1,
            max: 200,
            value: config.count,
            'data-bound': 'count'
          })
        ),
        d('label', 'Friction',
          d('input', {
            type: 'range',
            min: 50,
            max: 100,
            value: config.friction,
            'data-bound': 'friction'
          })
        ),
        d('h2', 'Gravity (g)'),
        d('label', 'Active',
          d('input', {
            type: 'checkbox',
            'data-bound': 'gravity.active'
          }, config.gravity.active && {checked:true})
        ),
        d('label', 'Threshold',
          d('input', {
            type: 'range',
            min: 0,
            max: 1000,
            value: config.gravity.threshold,
            'data-bound': 'gravity.threshold'
          })
        ),
        d('h2', 'Flocking (f)'),
        d('label', 'Active',
          d('input', {
            type: 'checkbox',
            'data-bound': 'flock.active'
          }, config.flock.active && {checked:true})
        ),
        d('label', 'Strength',
          d('input', {
            type: 'range',
            min: 0,
            max: 100,
            value: config.flock.strength,
            'data-bound': 'flock.strength'
          })
        ),
        d('label', 'Threshold',
          d('input', {
            type: 'range',
            min: 0,
            max: 400,
            value: config.flock.threshold,
            'data-bound': 'flock.threshold'
          })
        ),
        d('h2', 'Repulsion (r)'),
        d('label', 'Active',
          d('input', {
            type: 'checkbox',
            'data-bound': 'repulse.active'
          }, config.repulse.active && {checked:true})
        ),
        d('label', 'Strength',
          d('input', {
            type: 'range',
            min: 0,
            max: 100,
            value: config.repulse.strength,
            'data-bound': 'repulse.strength'
          })
        ),
        d('label', 'Threshold',
          d('input', {
            type: 'range',
            min: 0,
            max: 400,
            value: config.repulse.threshold,
            'data-bound': 'repulse.threshold'
          })
        ),
        d('h2', 'Rubberband (b)'),
        d('label', 'Active',
          d('input', {
            type: 'checkbox',
            'data-bound': 'rubber.active'
          }, config.rubber.active && {checked: true})
        ),
        d('label', 'Strength',
          d('input', {
            type: 'range',
            min: 0,
            max: 100,
            value: config.rubber.strength,
            'data-bound': 'rubber.strength'
          })
        ),
        d('label', 'Threshold',
          d('input', {
            type: 'range',
            min: 0,
            max: 400,
            value: config.rubber.threshold,
            'data-bound': 'rubber.threshold'
          })
        )
      ]);
      this.settings.innerHTML = '';
      this.settings.appendChild(menu.toDom());
    }
  }

  return new Menu();
})();
