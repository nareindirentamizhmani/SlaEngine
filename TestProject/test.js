const dayjs = require('dayjs');
const engine = require('sla_engine')

const slaEngine = new engine();

slaEngine.addNewJob("CS002",dayjs().add(10, 'seconds').toDate(),"SLACountdown", {value:"Success"});
slaEngine.startThisJob("CS002");

// const Bree = require('bree');
// const path = require('path');
// const dayjs = require('dayjs');

// const bree = new Bree(  
//     {
//      jobs: 
//         [{
//             name: 'CS001',
//             date: dayjs().add(30,'second').toDate(),
//             path: path.join(__dirname,'jobs','SLACountdown.js'),
//             worker:{
//                 workerData:{
//                     value: "The fuction was successfully executed"
//                 }
//              }
//         }],
//         workerMessageHandler: (message) => {
//             console.log(message);
//         }
//    }
// );

// bree.start();