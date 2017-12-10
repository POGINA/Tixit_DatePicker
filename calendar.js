var flatpickr = require('flatpickr/src/flatpickr.js')
var flatpickrStylesheet = require("raw-loader!flatpickr/dist/themes/dark.css");

var style = document.createElement('style')
style.innerHTML = flatpickrStylesheet
document.getElementsByTagName('head')[0].appendChild(style);


registerPlugin(proto(Gem, function() {
  this.name = "calendar"
  // Plugin Constructor - required
  this.build = function (ticket, config, api) {

      var input = this.input = TextField();
      var displayDatePicker = false;
      this.add(input);

        // Create instance of flatpickr
        var myInput = input.domNode;
        var fp = this.fp = new flatpickr(myInput,{
         //  field: input.domNode,
          use24hour: false,
          disable: [ { 'from' : "2015-09-06", 'to' : "2015-09-09" } ],
          minDate: new Date(),
          // enableTime: true,
          noCalendar: false,
          time_24hr: false, // AM/PM time picker is used by default
          dateFormat: 'l M j h:i K',
          // timeInterval: 1,
          user: true,
          // initial values for time. don't use these to preload a date
          defaultHour: 12,
          defaultMinute: 0
        });

      if(config.field == '' || config.field == null){
        config.field = 'date';
      }

      input.on("change",function() {
        ticket.set(config.field, input.val);
      });

      this.val = ticket.subject[config.field];
      ticket.get(config.field).on('change',function(){
        if(this.val !== ticket.subject[config.field]){
          this.val = ticket.subject[config.field];
        }
      }.bind(this))

  // Plugin Styling - optional
  input.style = Style ({
        width: 160,
        borderColor: '#3498DB',
        textAlign: 'center',
        borderRadius: 6,
        padding: 5,
        marginLeft: 10,
        marginTop: 3,
   });

  }; // this.build closing tag

  Object.defineProperty(this, 'val', {
      // returns the value of the Option
      get: function() {
          var value = this.input.domNode.value;
          return value;
      },
      // sets the value of the Option
      set: function(value) {
        this.input.domNode.value = value;
        this.input.emit('change');
      }
    })

}))
