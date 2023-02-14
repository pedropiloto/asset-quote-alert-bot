require('dotenv').config()
const WorkerNodes = require('worker-nodes')
const { resolve } = require('path')

const pairs = process.env.PAIRS.split(',')

const path = resolve(__dirname, './monitor-worker.js')
const monitorWorkerNode = new WorkerNodes(path)

for (const pair of pairs) {
    monitorWorkerNode.call(pair)
}
