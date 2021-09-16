const reactCfWsApi = jest.requireActual("@fkul/react-cf-ws-api")

module.exports = {
  ...reactCfWsApi,
  useCfWs: jest.fn().mockImplementation(() => {
    return {
      subscribePub: jest.fn(),
      unsubscribePub: jest.fn(),
    }
  }),
}

export {}
