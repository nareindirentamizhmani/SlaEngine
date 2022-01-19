const dayjs = require('dayjs');
const engine = require('sla_engine')

const slaEngine = new engine();

/*One-Time Job - for SLA related usecases*/
slaEngine.addNewOneTimeJob(
    {
        Name:"CS001",
        TriggerTime: dayjs().add(10, 'seconds').toDate(),
        JobTemplate: "SLACountdown",
        Data: {
            JobMessage:"SLA for CS001 got breached"
        }
    });

slaEngine.startThisJob("CS001");
slaEngine.stopThisJob("CS001");

/*Reccurrent Job - for IOT/WO related usecases*/
slaEngine.addNewCronJob({
    Name:"CS002",
    CronSyntax: '* * * * *',
    JobTemplate: "SLACountdown",
    Data: {
        JobMessage:"SLA for CS002 got breached"
    }
});
slaEngine.startThisJob("CS002");

