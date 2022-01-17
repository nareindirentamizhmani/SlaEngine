const {parentPort, workerData, isMainThread} = require('worker_threads');
const dayjs = require('dayjs');

try{
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

function printMessage()
{
    if(parentPort)
    {
        parentPort.postMessage(workerData.value + " at "+ dayjs().toDate());
    }
}