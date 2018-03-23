const Animator = () => {
  const t = (t, e) => {
    if (!(t instanceof e))
      throw new TypeError('Animator – Cannot call a class as a function')
  }

  const e = (() => {
    function t(t, e) {
      for (const i of e) {
        ;(i.enumerable = i.enumerable || false),
          (i.configurable = true),
          'value' in i && (i.writable = true),
          Object.defineProperty(t, i.key, i)
      }
    }
    return (e, n, i) => (n && t(e.prototype, n), i && t(e, i), e)
  })()

  const n = t => {
    if (Array.isArray(t)) {
      for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e]
      return n
    }
    return Array.from(t)
  }

  const i = [
    { name: 'Float', str: false },
    { name: 'Percent', str: '%' },
    { name: 'Pixel', str: 'px' },
    { name: 'Deg', str: 'deg' },
    { name: 'ViewportWidth', str: 'vw' },
    { name: 'ViewportHeight', str: 'vh' }
  ]

  const r = (() => {
    function n(e, i) {
      t(this, n)
      this.originalValue = e
      this.wrapper = i || false
      this.type = this.parseType(this.originalValue)
      this.value = this.type.str
        ? parseFloat(this.originalValue.replace(this.type.str, ''), 10)
        : this.originalValue
    }
    return (
      e(n, [
        {
          key: 'parseType',
          value(t) {
            if ('number' == typeof t)
              return i.filter(t => 'Float' === t.name)[0]
            if ('string' == typeof t) return i.filter(e => t.includes(e.str))[0]
            throw 'Animator – Cannot parse Value of unsupported type.'
          }
        },
        {
          key: 'toString',
          value() {
            const v = this.value + (this.type.str || '')
            return this.wrapper ? `${this.wrapper}(${v})` : v
          }
        },
        {
          key: 'clone',
          value() {
            return new n(this.originalValue, this.wrapper)
          }
        }
      ]),
      n
    )
  })()

  const a = (t, e, n) => t + (e - t) * n
  const s = (t, e, n) => (t - e) / (n - e)
  const o = (t, e, n, i, r) => a(i, r, s(t, e, n))
  const u = (t, e, n) => Math.max(e, Math.min(n, t))

  const c = (() => {
    function n(e, i) {
      if (
        (t(this, n),
        (this.property = e),
        (this.values = {
          from: this.parseValues(i[0]),
          to: this.parseValues(i[1]),
          interpolated: []
        }),
        this.values.from.length != this.values.to.length)
      )
        throw 'Animator – You need as many `from` values as `to` values.'
      for (let r = 0; r < this.values.from.length; r++)
        this.values.interpolated[r] = this.values.from[r].clone()
    }
    return (
      e(n, [
        {
          key: 'parseValues',
          value(t) {
            return (t =
              t instanceof Object
                ? Object.entries(t).map(t => new r(t[1], t[0]))
                : [new r(t)])
          }
        },
        {
          key: 'interpolate',
          value(t) {
            const e = this
            this.values.interpolated.map((n, i) => {
              n.value = a(
                e.values.from[i].value,
                e.values.to[i].value,
                t
              ).toFixed(4)
            })
          }
        },
        {
          key: 'toString',
          value() {
            return this.values.interpolated.join(' ')
          }
        }
      ]),
      n
    )
  })()

  const h = ['opacity', 'filter', 'transform']
  const reduceMotion = window.matchMedia(
    'screen and (prefers-reduced-motion: reduce)'
  ).matches

  const l = (() => {
    function n(e) {
      const i = this
      t(this, n)
      this.data = JSON.parse(e.dataset.animator)
      this.el = e
      this.rectEl = document.querySelector(this.data.relative) || e
      this.updateDimensions(true)
      setTimeout(() => {
        i.updateDimensions(true)
      }, 128)
      const props = Object.keys(this.data)
      e.style.willChange = h.filter(hp => props.indexOf(hp) !== -1).join(', ')
      this.checkInView()
      this.data.range = this.data.range || [0, 1]
      this.data.recalcOnResize =
        void 0 === this.data.recalcOnResize || this.data.recalcOnResize
      this.data.styles = Object.entries(this.data)
        .filter(t => h.includes(t[0]))
        .map(t => new c(t[0], t[1]))
      this.progress = this.current = 0
      this.lastCurrent
    }
    return (
      e(n, [
        {
          key: 'updateDimensions',
          value(t) {
            if (this.data.recalcOnResize || t) {
              this.rect = this.rectEl.getBoundingClientRect()
            }
            this.top = this.rect.top + window.scrollY
            this.rtop = this.top - window.innerHeight
            this.bottom = this.rect.bottom + window.scrollY
            this.data.scrollOffset &&
              ((this.rtop -= window.scrollY - window.innerHeight),
              (this.bottom -= window.scrollY - window.innerHeight))
          }
        },
        {
          key: 'checkInView',
          value() {
            this.isInView =
              this.top < window.innerHeight + window.scrollY &&
              this.bottom > window.scrollY
            return this.isInView
          }
        },
        {
          key: 'update',
          value(t) {
            let e, n, i, r
            const a = this
            const y = this.el.previousElementSibling === null ? 2 : 16
            this.isInView,
              (this.progress = ((e = 0),
              (n = 1),
              (i = o(t, this.rtop, this.bottom, 0, 1)),
              (r = u(s(i, e, n), 0, 1)) * r * (y - r)))
            this.progress = o(
              this.progress,
              this.data.range[0],
              this.data.range[1],
              0,
              1
            )
            this.progress = u(this.progress, 0, 1)
            this.current += this.progress - this.current
            this.data.styles.forEach(t => t.interpolate(a.current.toFixed(3)))
          }
        },
        {
          key: 'draw',
          value() {
            if (this.current !== this.lastCurrent) {
              this.lastCurrent = this.current
            }
            this.data.styles.forEach(e => {
              this.el.style[e.property] = e.toString()
            })
          }
        }
      ]),
      n
    )
  })()

  const d = (() => {
    function i(e, r) {
      t(this, i)
      this.animated = [].concat(n(e)).map(t => new l(t))
      this.target = r
      this.startTime = performance.now() + performance.timing.navigationStart
      this.shouldUpdate = true
      requestAnimationFrame(this.update.bind(this))
    }
    return (
      e(i, [
        {
          key: 'updateDimensions',
          value() {
            for (let t = 0; t < this.animated.length; t++)
              this.animated[t].updateDimensions()
          }
        },
        {
          key: 'update',
          value() {
            if (this.shouldUpdate) {
              for (let t = 0; t < this.animated.length; t++)
                this.animated[t].update(this.target)
              for (let e = 0; e < this.animated.length; e++)
                this.animated[e].draw(this.target)
              requestAnimationFrame(this.update.bind(this))
            }
          }
        }
      ]),
      i
    )
  })()

  if (reduceMotion) return
  Object.entries ||
    (Object.entries = t => {
      for (var e = Object.keys(t), n = e.length, i = new Array(n); n--; )
        i[n] = [e[n], t[e[n]]]
      return i
    })
  const chrome = navigator.userAgent.includes('Chrome')
  const m = new d(document.querySelectorAll('[data-animator]'), scrollY)
  if (chrome) {
    document.documentElement.classList.add('chrome')
    m.animated.forEach(t => {
      t.data.styles = t.data.styles.filter(t => 'filter' !== t.property)
    })
  }
  let w = false
  const v = () => {
    document.documentElement.classList.add('trigger')
    w = true
  }
  setTimeout(v, 256)
  addEventListener('scroll', t => {
    m.target = scrollY
    scrollY > 8 && !w && v()
  })
  addEventListener('resize', t => {
    m.updateDimensions()
  })
}

export default Animator
