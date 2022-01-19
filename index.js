//Required Dependencies
const JobScheduler = require('bree');
const isSANB = require('is-string-and-not-blank');
const isValidPath = require('is-valid-path');

//Feature Dependencies
const Graceful = require('@ladjs/graceful');
const dayjs = require('dayjs');
const path = require('path');

class sla_engine{

    constructor(){
        console.log("Initialized Class");
        //Intialize Job Handler Instance
        this.eng = new JobScheduler({
            root:false,
            closeWorkerAfterMs:259200000, //Worker to terminate after 72 Hours if not destroyed
            workerMessageHandler: (message) => {
                console.log(message);
            }
        });
        this.addNewJob = this.addNewJob.bind(this);
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

    //Add new job
    addNewJob(jobName, triggerTime, jobTemplate, jobData)
    {
        var templatePath = path.join(__dirname,'jobs',jobTemplate+'.js');

        if(isSANB(jobName) && isValidPath(templatePath) && dayjs(triggerTime).isValid())
        {
            const addedJobs = this.eng.add(
                {
                    name:jobName,
                    path: templatePath,
                    date:triggerTime,
                    worker:{
                        workerData: jobData
                    }
                });
        }
        else
            throw new Error("Invalid input parameters. Please check.");
    }
}

module.exports = sla_engine;


