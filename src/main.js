import paperFull from 'paper'
var { paper, Path, Point, Raster, Shape } = paperFull
var scope = paper.setup('myCanvas')
var { project } = scope
var { view } = project
project.currentStyle = {
  fillColor: 'rgba(255, 0, 0, 0.2)',
  strokeColor: 'black',
  strokeWidth: 2,
  selectedColor: 'green'
}

new Path.Rectangle({
  center: [100, 100],
  size: [50, 50],
  name: 'example123',
  style: {
    fillColor: 'blue',
    strokeColor: 'red',
    strokeWidth: 5
  },
  onMouseDrag(event) {
    console.log(event.delta)
    this.position = this.position.add(event.delta)
  },
  onClick() {
    this.bringToFront()
    this.selected = true
  }
})

var circle2 = new Path.Circle({
  center: [160, 160],
  radius: 50,
  onClick() {
    this.bringToFront()
  }
})

var circle3 = circle2.clone()
circle3.position.x += 40
circle3.position.y += 40

new Shape.Circle({
  center: new Point(80, 50),
  radius: 30,
  onMouseDrag(event) {
    this.position.x += event.delta.x
    this.position.y += event.delta.y
  }
})

var url = 'http://assets.paperjs.org/images/marilyn.jpg'
var raster = new Raster({
  source: url,
  position: view.center,
  smoothing: true,
  width: 100,
  height: 100,
  onMouseDrag(event) {
    this.position.x += event.delta.x
    this.position.y += event.delta.y
  }
})
raster.sendToBack()

var point1 = new Point(50, 50)
var point2 = new Point(110, 200)

var vector = point2.subtract(point1)
console.log(vector)

var myPath = null
view.onMouseDown = (e) => {
  if (myPath) {
    myPath.add(e.point)
    return
  } else {
    myPath = new Path({
      dashArray: [5, 5],
      strokeColor: 'black',
      strokeCap: 'square',
      onMouseDrag(e) {
        this.position = this.position.add(e.delta)
      }
    })

    if (myPath.segments.length === 0) {
      myPath.add(e.point)
    }
    myPath.add(e.point)

    view.on({
      mousemove(e) {
        myPath.lastSegment.point = e.point
      },

      doubleclick() {
        myPath.closed = true
        view.off('mousemove')
        view.off('mousedrag')
        view.off('doubleclick')
        myPath = null
      }
    })
  }
}
