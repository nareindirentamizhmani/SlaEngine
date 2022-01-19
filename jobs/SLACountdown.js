const {parentPort, workerData, isMainThread} = require('worker_threads');
const dayjs = require('dayjs');

try{
    /*Add any custom logic HERE*/

    /*Test Method Call*/
    printMessage();

}
catch(error){
    console.error(error);
}
finally{
    if (parentPort) {
        parentPort.postMessage('done');
    } else {
        process.exit(0);
    }
}   


/*Test Method*/
function printMessage()
{
    if(parentPort)
    {
        parentPort.postMessage(workerData.JobMessage + " at "+ dayjs().toDate());
    }
}