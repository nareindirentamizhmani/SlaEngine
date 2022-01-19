const dayjs = require('dayjs');
const engine = require('sla_engine')

const slaEngine = new engine();

slaEngine.addNewJob("CS002",dayjs().add(10, 'seconds').toDate(),"SLACountdown", {value:"SLA for CS0001 got breached"});
slaEngine.startThisJob("CS002");