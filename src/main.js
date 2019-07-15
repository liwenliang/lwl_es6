import Event from './modules/Event'

window.Events = Event

function func1() {
  console.log('2')
}

Event.on('myEvent', function(obj) {
  console.log(obj)
})

Event.on('myEvent', func1)

setTimeout(function() {
  // Event.remove('myEvent', func1)
  Event.emit('myEvent', { name: 'liwenliang' })
}, 2000)

