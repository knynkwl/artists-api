import schedule from 'node-schedule';

schedule.scheduleJob({hour: 2, minute: 0o0, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});