//Required Dependencies
const JobScheduler = require('bree');
const isSANB = require('is-string-and-not-blank');
const isValidPath = require('is-valid-path');

//Feature Dependencies
const Graceful = require('@ladjs/graceful');
const dayjs = require('dayjs');
const path = require('path');
const cron = require('cron-validate');

class sla_engine{

    constructor(){
        //Intialize Job Handler Instance
        this.eng = new JobScheduler({
            root:false,
            closeWorkerAfterMs:259200000, //Worker to terminate after 72 Hours if not destroyed
            workerMessageHandler: (message) => {
                console.log(message);
            }
        });
        this.addNewOneTimeJob = this.addNewOneTimeJob.bind(this);
        this.addNewCronJob = this.addNewCronJob.bind(this);
        const grHandler = new Graceful({brees:[this.eng]});
        grHandler.listen();

        //Start all SLA Jobs
        this.eng.start();

        this.eng.on('worker created', (name) => {
            console.log('worker created', name);
            // console.log(this.eng.workers[name]);
          });
          
        this.eng.on('worker deleted', (name) => {
           console.log('worker deleted', name);
        //    console.log(typeof this.eng.workers[name] === 'undefined');
        });
    }

    //Start a specific job
    startThisJob(jobName)
    {
        if(isSANB(jobName))
            this.eng.start(jobName);
        else
            throw new Error("Job name cannot be empty");
    }

    //Stop all jobs
    stopAllJobs()
    {
        this.eng.stop();
    }

    //Stop only a specific job
    stopThisJob(jobName)
    {
        if(isSANB(jobName) && isValidPath(templatePath))
            this.eng.stop(jobName);
        else
            throw new Error("Job name cannot be empty");
    }
    
    //Run a specific job
    runThisJobImmediately(jobName)
    {
        if(isSANB(jobName))
            this.eng.run(jobName);
        else
            throw new Error("Job name cannot be empty");
    }

    //Add new job for one-time execution
    addNewOneTimeJob(jobData)
    {
        var templatePath = path.join(__dirname,'jobs',jobData.JobTemplate+'.js');

        if(isSANB(jobData.Name) && isValidPath(templatePath) && dayjs(jobData.TriggerTime).isValid())
        {
            const addedJobs = this.eng.add(
                {
                    name:jobData.Name,
                    path: templatePath,
                    date:jobData.TriggerTime,
                    worker:{
                        workerData: jobData.Data
                    }
                });
        }
        else
            throw new Error("Invalid input parameters. Please check.");
    }

    //Add new job for one-time execution
    addNewCronJob(jobData)
    {
        var templatePath = path.join(__dirname,'jobs',jobData.JobTemplate+'.js');
        var cronResult = cron(jobData.CronSyntax).isValid();

        
        if(isSANB(jobData.Name) && isValidPath(templatePath) && cronResult)
        {
            const addedJobs = this.eng.add(
                {
                    name:jobData.Name,
                    path: templatePath,
                    cron: jobData.CronSyntax,
                    worker:{
                        workerData: jobData.Data
                    }
                });
        }
        else
            throw new Error("Invalid input parameters. Please check.");
    }

}

module.exports = sla_engine;


