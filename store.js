const storage = require(‚azure-storage')

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

module.exports = {
  init
}
