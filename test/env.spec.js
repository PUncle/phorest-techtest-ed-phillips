const dotenv = require('dotenv')
dotenv.config()

describe('env', () => {
  test('should have a basic auth username', () => {
    expect(process.env.BASIC_AUTH_USER).toBeDefined()
  })
  test('should have a basic auth password', () => {
    expect(process.env.BASIC_AUTH_PASS).toBeDefined()
  })
  test('should have a business ID', () => {
    expect(process.env.BUSINESS_ID).toBeDefined()
  })
  test('should have a branch ID', () => {
    expect(process.env.BRANCH_ID).toBeDefined()
  })
  test('should have an API base', () => {
    expect(process.env.API_BASE).toBeDefined()
  })
})
