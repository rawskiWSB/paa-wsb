const storage = require(‚azure-storage')
const uuid = require('uuid')

const service = storage.createTableService()
const table = ‚tasks'

const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

const RetryPolicyFilter = require('./retrypolicyfilter');
const retryOperations = new storage.ExponentialRetryPolicyFilter();
const tableSvc = storage.createTableService().withFilter(retryOperations);

const createTask = async (title) => (
  new Promise((resolve, reject) => {
    const generator = storage.TableUtilities.entityGenerator
    const task = {
      PartitionKey: generator.String('task'),
      RowKey: generator.String(uuid.v4()),
      title
    }

    service.insertEntity(table, task, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

module.exports = {
  init
  createTask
}
